namespace Tfs
{
    using System;
    using System.Linq;
    using Microsoft.TeamFoundation.TestManagement.Client;
    using Microsoft.TeamFoundation.WorkItemTracking.Client;
    using Model;

    public class TestCaseService
    {
        private readonly Func<ITestManagementService2> _testManagementFactory;

        public TestCaseService(Func<ITestManagementService2> testManagementFactory)
        {
            this._testManagementFactory = testManagementFactory;
        }

        public TestCase GetById(int id)
        {           
            try
            {
                var service = this._testManagementFactory();

                var teamProject = service.GetTeamProject("AllocateHealthSuite");

                var tc = teamProject.TestCases.Find(id);

                var steps = from step in tc.Actions
                            select InfoForStep(step);

                return new TestCase()
                {
                    Id = tc.Id,
                    Title = tc.Title,
                    State = tc.State,
                    CreatedBy = tc.WorkItem.CreatedBy,
                    Steps = steps.ToList()
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
    }
}