using System;
using System.IO;
using System.Linq;
using Nancy;
using Nancy.ModelBinding;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Tfs.Matching;

namespace Web.Modules.TestCases
{
    using Tfs;

    public class TestCasesModule : BaseModule
    {
        public TestCasesModule(TestCaseService testCases)
        {
            Get["testcase/{id}"] = _ => testCases.GetById(_.id) ?? NotFound("Test case {0} not found", _.id);

            Post["testcase/{id}/accept"] = _ =>
            {
                testCases.Accept(_.id);
                return Ok;
            };

            Post["testcase/{id}/reject"] = _ =>
            {
                testCases.Reject(_.id); return Ok;
            };

            Get["testcase/{id}/attachment/{fileId}/{name}"] = _ => testCases.DownloadAttachment((int) _.id, (int) _.fileId, (string) _.name) ?? NotFound("Attachment not found");
        }
    }
}