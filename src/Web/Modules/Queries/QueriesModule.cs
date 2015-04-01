using Tfs;

namespace Web.Modules.Queries
{
    public class QueriesModule : BaseModule
    {
        public QueriesModule(QueriesService queries)
        {
            Get["queries"] = _ => queries.GetQueriesTree();
            Get["query/list/{path*}"] = _ => queries.ExecuteListQuery(_.path);
        }
    }
}