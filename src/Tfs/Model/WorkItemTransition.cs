using System.Collections.Generic;
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
                workItem.Fields[fieldChange.Key].Value = fieldChange.Value;
            }
        }
    }
}