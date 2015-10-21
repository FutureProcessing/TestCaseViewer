using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tfs.Model
{
    public class QueryGroup
    {
        public IList<IDictionary<string, object>> WorkItems { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
