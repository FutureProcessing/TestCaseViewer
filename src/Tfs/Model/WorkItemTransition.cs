using System.Collections.Generic;
using System.Linq;
using Microsoft.TeamFoundation.WorkItemTracking.Client;

namespace Tfs.Model
{
    public class WorkItemTransition
    {
        private readonly IDictionary<string, object> description;

        public WorkItemTransition(IDictionary<string, object> description)
        {
            this.description = description;
        }


        public void Transit(WorkItem workItem)
        {
            foreach (var fieldChange in this.description)
            {
                var newValue = ResolveValue(workItem, fieldChange.Key, fieldChange.Value);

                workItem.Fields[fieldChange.Key].Value = newValue;
            }
        }

        private static object ResolveValue(WorkItem workItem, string fieldName, object newValue)
        {
            if (newValue is string && newValue.Equals("@Previous"))
            {
                return ResolvePreviousValue(workItem, fieldName);
            }

            return newValue;
        }

        private static object ResolvePreviousValue(WorkItem workItem, string fieldName)
        {
            var currentValue = workItem.Fields[fieldName].Value;

            var previousValue = workItem.Revisions.OfType<Revision>()
                .OrderByDescending(x => x.Index)
                .Select(x => x.Fields[fieldName].Value)
                .FirstOrDefault(x => x != currentValue);

            return previousValue;
        }
    }
}