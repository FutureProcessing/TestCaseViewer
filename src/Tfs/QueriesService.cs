using System;
using System.Linq;
using Common;
using Microsoft.TeamFoundation.WorkItemTracking.Client;

namespace Tfs
{
    public class QueriesService
    {
        private readonly Func<WorkItemStore> storeFactory;
        private readonly IConfiguration config;

        public QueriesService(Func<WorkItemStore> storeFactory, IConfiguration config)
        {
            this.storeFactory = storeFactory;
            this.config = config;
        }

        public object GetQueriesTree()
        {
            var store = this.storeFactory();

            var hierachy = store.Projects[this.config.ProjectName].QueryHierarchy;

            var root = Transform(hierachy);

            return root;
        }

        private static Model.QueryItem Transform(QueryItem item)
        {
            var folder = item as QueryFolder;
            if (folder != null)
            {
                return new Model.QueryFolder
                {
                    Type = "folder",
                    Name = folder.Name,
                    Path = folder.Path,
                    Children = (from child in folder
                                select Transform(child)).ToList()
                };
            }

            var query = item as QueryDefinition;
            if (query != null)
            {
                return new Model.QueryDefinition
                {
                    Type = "query",
                    Name = query.Name,
                    Path = query.Path,
                    QueryType = query.QueryType.ToString()
                };
            }

            return null;
        }
    }
}