using System.Collections.Generic;

namespace Tfs.Model
{
    public abstract class QueryItem
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
    }

    public class QueryFolder : QueryItem
    {
        public List<QueryItem> Children { get; set; }
    }

    public class QueryDefinition : QueryItem
    {       
        public string QueryType { get; set; }
    }
}