﻿using System;
using System.Collections.Generic;
using Microsoft.TeamFoundation.WorkItemTracking.Client;
using Tfs;
using Tfs.Model;

namespace Web.Modules.Queries
{
    public class QueriesModule : BaseModule
    {
        public QueriesModule(QueriesService queries, TestCaseService testCases)
        {
            Get["queries"] = _ => queries.GetQueriesTree();
            Get["query/list/{path*}"] = _ => queries.ExecuteListQuery(_.path, new QueryOptions()
            {
                LimitToTypes = testCases.TestCaseTypeNames(),
                AdditionalFields = new Dictionary<string, Func<IWorkItemRevision, object>>
                {
                    {"Status", testCases.DetermineStatus}
                }
            });
            Get["query/link/{path*}"] = _ => queries.ExecuteLinkQuery(_.path, new QueryOptions()
            {
                LimitToTypes = testCases.TestCaseTypeNames(),
                AdditionalFields = new Dictionary<string, Func<IWorkItemRevision, object>>
                {
                    {
                        "Status", testCases.DetermineStatus
                    }
                }
            });
        }
    }
}