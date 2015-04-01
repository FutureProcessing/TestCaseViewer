using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
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

        public IEnumerable<IDictionary<string, object>> ExecuteListQuery(string queryPath)
        {
            var store = this.storeFactory();

            var queryDef = (QueryDefinition)store.Projects[this.config.ProjectName].QueryHierarchy.ByPath(queryPath);

            var context = new Dictionary<string, object>()
            {
                {"project", this.config.ProjectName}
            };
            var query = new Query(store, queryDef.QueryText, context);


            var workItems = query.RunQuery();

            var q = from WorkItem workItem in workItems
                    select BuildResultItem(workItem, query.DisplayFieldList);

            return q.ToList();
        }

        private IDictionary<string, object> BuildResultItem(WorkItem workItem, DisplayFieldList displayFieldList)
        {
            var dict = new Dictionary<string, object>();

            dict["Id"] = workItem.Id;
            dict["Type"] = workItem.Type.Name;

            foreach (FieldDefinition field in displayFieldList)
            {
                dict["field_" + field.Name] = workItem[field.Name];
            }

            return dict;
        }
    }
}