using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Sockets;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using Common;
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

            QueryResult queryResult = new QueryResult() {Name = queryDef.Name, QueryType = queryDef.QueryType};
            if (queryDef.QueryType == QueryType.List)
            {
                var workItems = query.RunQuery();
                queryResult.TestCases = (from WorkItem workItem in workItems
                        where options.LimitToTypes.Contains(workItem.Type.Name)
                        select BuildResultItem(workItem, query.DisplayFieldList, options.AdditionalFields)).ToList();
            }
            else if (queryDef.QueryType == QueryType.OneHop)
            {
                var workItems = query.RunLinkQuery();
                queryResult.TestCases = (from item in workItems
                    where item.SourceId != 0
                    let parent = store.GetWorkItem(item.TargetId)
                    group BuildResultItem(parent, query.DisplayFieldList, options.AdditionalFields)
                    by item.SourceId
                        into g
                        let groupName = store.GetWorkItem(g.Key).Title
                        select new QueryGroup() { Id = g.Key, Name = groupName, WorkItems = g.ToList() }).ToList();
            }

            return queryResult;
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

    public class QueryGroup
    {
        public IList<IDictionary<string, object>> WorkItems { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class QueryOptions
    {
        public string[] LimitToTypes { get; set; }
        public Dictionary<string, Func<IWorkItemRevision, object>> AdditionalFields { get; set; }
    }

    public  class QueryResult
    {
        public string Name { get; set; }
        public QueryType QueryType { get; set; }
        public IEnumerable<object> TestCases { get; set; }
    }

    //public class ListQueryResult : QueryResult { }

    //public class OneHopQueryResult : QueryResult {}
}
