using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.TeamFoundation.WorkItemTracking.Client;
using Tfs.Model;
using QueryDefinition = Microsoft.TeamFoundation.WorkItemTracking.Client.QueryDefinition;
using QueryFolder = Microsoft.TeamFoundation.WorkItemTracking.Client.QueryFolder;
using QueryItem = Microsoft.TeamFoundation.WorkItemTracking.Client.QueryItem;

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

        public QueryResult ExecuteGetQueryResult(string queryPath, QueryOptions options)
        {
            var store = this.storeFactory();

            var queryDef = (QueryDefinition)store.Projects[this.config.ProjectName].QueryHierarchy.ByPath(queryPath);

            var context = new Dictionary<string, object>()
            {
                {"project", this.config.ProjectName}
            };

            var query = new Query(store, queryDef.QueryText, context);

            QueryResult queryResult = new QueryResult() { Name = queryDef.Name, QueryType = queryDef.QueryType };
            switch (queryDef.QueryType)
            {
                case QueryType.List:
                    queryResult.TestCases = this.ExecuteListQuery(options, query);
                    break;
                case QueryType.OneHop:
                    queryResult.TestCases = this.ExecuteOneHopQuery(options, store, query);
                    break;
            }

            return queryResult;
        }

        private List<QueryGroup> ExecuteOneHopQuery(QueryOptions options, WorkItemStore store, Query query)
        {
            var workItems = query.RunLinkQuery();

            var items = from item in workItems
                        where item.SourceId != 0
                        let parent = store.GetWorkItem(item.TargetId)
                        group BuildResultItem(parent, query.DisplayFieldList, options.AdditionalFields)
                        by item.SourceId
                    into g
                        let groupName = store.GetWorkItem(g.Key).Title
                        select new QueryGroup()
                        {
                            Id = g.Key,
                            Name = groupName,
                            WorkItems = g.ToList()
                        };

            return items.ToList();
        }

        private List<IDictionary<string, object>> ExecuteListQuery(QueryOptions options, Query query)
        {
            var workItems = query.RunQuery();
            var items = from WorkItem workItem in workItems
                        where options.LimitToTypes.Contains(workItem.Type.Name)
                        select BuildResultItem(workItem, query.DisplayFieldList, options.AdditionalFields);

            return items.ToList();
        }

        private IDictionary<string, object> BuildResultItem(WorkItem workItem, DisplayFieldList displayFieldList, Dictionary<string, Func<IWorkItemRevision, object>> additionalFields)
        {
            var dict = new Dictionary<string, object>();

            dict["Id"] = workItem.Id;
            dict["Type"] = workItem.Type.Name;

            foreach (FieldDefinition field in displayFieldList)
            {
                if (workItem.Fields.Contains(field.Name))
                {
                    dict["field_" + field.Name] = workItem[field.Name];
                }
            }

            foreach (var additionalField in additionalFields)
            {
                dict[additionalField.Key] = additionalField.Value(workItem.LastRevision());
            }

            return dict;
        }

    }     
}
