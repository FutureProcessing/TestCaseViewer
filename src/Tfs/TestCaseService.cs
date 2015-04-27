using System;
using System.Collections.Generic;
using System.Linq;
using Common;
using Microsoft.TeamFoundation.TestManagement.Client;
using Microsoft.TeamFoundation.TestManagement.Common;
using Microsoft.TeamFoundation.WorkItemTracking.Client;
using Sprache;
using Tfs.Model;
using Tfs.TransitionSpecs;

namespace Tfs
{
    public class TestCaseService
    {
        private readonly Func<IDictionary<string, string>, WorkItemTransition> transitionFactory;
        private readonly Func<ITestManagementService2> testManagementFactory;
        private readonly IConfiguration config;

        public TestCaseService(Func<IDictionary<string, string>,  WorkItemTransition> transitionFactory, Func<ITestManagementService2> testManagementFactory, IConfiguration config)
        {
            this.transitionFactory = transitionFactory;
            this.testManagementFactory = testManagementFactory;
            this.config = config;
        }

        public void Accept(int id)
        {
            var service = this.testManagementFactory();
            var teamProject = service.GetTeamProject(this.config.ProjectName);

            var testCase = teamProject.TestCases.Find(id);

            var transition = this.transitionFactory(this.config.AcceptTransition);

            transition.Transit(testCase.WorkItem);

            testCase.Save();
        }

        public void Reject(int id)
        {
            var service = this.testManagementFactory();
            var teamProject = service.GetTeamProject(this.config.ProjectName);

            var testCase = teamProject.TestCases.Find(id);

            var transition = this.transitionFactory(this.config.RejectTransition);

            transition.Transit(testCase.WorkItem);

            testCase.Save();
        }

        public TestCase GetById(int id)
        {
            try
            {
                var service = this.testManagementFactory();

                var teamProject = service.GetTeamProject(this.config.ProjectName);

                var tc = teamProject.TestCases.Find(id);

                if (tc == null)
                {
                    return null;
                }

                var steps = from step in tc.Actions
                            select InfoForStep(step);

                return new TestCase()
                {
                    Id = tc.Id,
                    Title = tc.Title,
                    State = tc.State,
                    AssignedTo = (string)tc.WorkItem.Fields[CoreField.AssignedTo].Value,
                    CreatedBy = tc.WorkItem.CreatedBy,
                    LastChangedDate = tc.WorkItem.ChangedDate,
                    Steps = steps.ToList(),
                    Status = this.DetermineStatus(tc.WorkItem.LastRevision())
                };
            }
            catch (DeniedOrNotExistException)
            {
                return null;
            }
        }

        private TestStepInfo InfoForStep(ITestAction step)
        {
            var simpleStep = step as ITestStep;

            if (simpleStep != null)
            {
                return new SimpleTestStep
                {
                    Action = simpleStep.Title.ToString(),
                    ExpectedResult = simpleStep.ExpectedResult.ToString()
                };
            }

            var sharedStepRef = step as ISharedStepReference;
            if (sharedStepRef != null)
            {
                var sharedStep = sharedStepRef.FindSharedStep();

                var steps = sharedStep.Actions.Select(this.InfoForStep).ToList();

                return new SharedStep
                {
                    SharedStepId = sharedStep.Id,
                    Title = sharedStep.Title,
                    Steps = steps
                };
            }

            return null;
        }

        public string[] TestCaseTypeNames()
        {
            var service = this.testManagementFactory();

            var teamProject = service.GetTeamProject(this.config.ProjectName);
            var t = teamProject.WitProject.Categories[WitCategoryRefName.TestCase].WorkItemTypes.Select(x => x.Name);

            return t.ToArray();
        }

        public string DetermineStatus(Revision workItem)
        {
            var statuses = new[]
            {
                new {Name = "Design", Spec = this.config.DesignStatus},
                new {Name = "WaitingForApproval", Spec = this.config.WaitingForApprovalStatus},
                new {Name = "Ready", Spec = this.config.ReadyStatus},
            };

            var matchingStatus = statuses.FirstOrDefault(x => x.Spec.IsMatching(workItem));
            if (matchingStatus == null)
            {
                return null;
            }

            return matchingStatus.Name;
        }

        public object Dupa(int id)
        {
            var service = this.testManagementFactory();

            var teamProject = service.GetTeamProject(this.config.ProjectName);

            var tc = teamProject.TestCases.Find(id);

            var transition = this.transitionFactory(this.config.RejectTransition);

            return transition.Preview(tc.WorkItem);
        }
    }
}