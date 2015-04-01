using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Common;
using Nancy;
using Newtonsoft.Json.Linq;

namespace Web
{
    public class JsonConfiguration : IConfiguration
    {
        private readonly dynamic config;

        public JsonConfiguration(IRootPathProvider rootPath)
        {
            var configPath = Path.Combine(rootPath.GetRootPath(), "config.json");

            this.config = JObject.Parse(File.ReadAllText(configPath));
        }

        public Uri TfsServer
        {
            get { return new Uri((string)this.config.tfs.url); }
        }

        public string ProjectName
        {
            get { return this.config.tfs.project; }
        }

        public IDictionary<string, object> AcceptTransition
        {
            get { return ((JObject) this.config.tfs.accept).Properties().ToDictionary(x => x.Name, x => ((JValue) x.Value).Value); }
        }
    }
}