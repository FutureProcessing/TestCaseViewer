using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.TeamFoundation.WorkItemTracking.Client;

namespace Tfs.Matching
{
    public class MatchingSpec
    {
        public IDictionary<string, FieldSpec> Fields { get; set; }

        public bool IsMatching(Revision workItem)
        {
            foreach (var fieldSpec in this.Fields)
            {
                var field = workItem.Fields[fieldSpec.Key];

                if (!fieldSpec.Value.IsMatching(field))
                {
                    return false;                    
                }
            }

            return true;
        }
    }

    public abstract class FieldSpec
    {
        public abstract bool IsMatching(Field field);
    }
}
