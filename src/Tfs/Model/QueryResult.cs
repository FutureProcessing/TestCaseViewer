using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.TeamFoundation.WorkItemTracking.Client;

namespace Tfs.Model
{
    public class QueryResult
    {
        public string Name { get; set; }
        public QueryType QueryType { get; set; }
        public IEnumerable<object> TestCases { get; set; }
    }
}
