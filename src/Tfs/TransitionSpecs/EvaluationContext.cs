using Autofac;
using Microsoft.TeamFoundation.WorkItemTracking.Client;
using Tfs.Model;

namespace Tfs.TransitionSpecs
{
    public class EvaluationContext
    {
        private readonly ILifetimeScope lifetimeScope;

        public WorkItem WorkItem { get; private set; }
        public IWorkItemRevision Revision { get; private set; }

        public EvaluationContext(ILifetimeScope lifetimeScope, WorkItem workItem, IWorkItemRevision revision)
        {
            this.lifetimeScope = lifetimeScope;
            WorkItem = workItem;
            Revision = revision;
        }

        public T Resolve<T>()
        {
            return this.lifetimeScope.Resolve<T>();
        }

        public EvaluationContext AsOfRevision(IWorkItemRevision revision)
        {
            return new EvaluationContext(this.lifetimeScope, this.WorkItem, revision);
        }
    }
}