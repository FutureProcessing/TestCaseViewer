using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tfs.Model
{
    public class QueryOptions
    {
        public string[] LimitToTypes { get; set; }
        public Dictionary<string, Func<IWorkItemRevision, object>> AdditionalFields { get; set; }
    }
}
