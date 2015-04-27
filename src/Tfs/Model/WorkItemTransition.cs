using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.TeamFoundation.WorkItemTracking.Client;
using Sprache;
using Tfs.TransitionSpecs;

namespace Tfs.Model
{
    public class WorkItemTransition
    {
        private readonly Func<WorkItem, Revision, EvaluationContext> contextFactory;
        private readonly IDictionary<string, string> description;

        public WorkItemTransition(Func<WorkItem, Revision, EvaluationContext> contextFactory, IDictionary<string, string> description)
        {
            this.contextFactory = contextFactory;
            this.description = description;
        }

        public IDictionary<string, object> Preview(WorkItem workItem)
        {
            var changes = new Dictionary<string, object>();

            foreach (var change in this.description)
            {
                var newValue = ResolveValue(workItem, change.Value);

                changes[change.Key] = newValue;
            }

            return changes;
        }

        public void Transit(WorkItem workItem)
        {
            var preview = this.Preview(workItem);

            foreach (var fieldChange in preview)
            {             
                workItem.Fields[fieldChange.Key].Value = fieldChange.Value;
            }
        }

        private object ResolveValue(WorkItem workItem, string newValue)
        {
            var expression = ExpressionParsers.ParseInput(new Input(newValue));

            return expression.Value.Evalute(this.contextFactory(workItem, workItem.LastRevision()));
        }
    }
}