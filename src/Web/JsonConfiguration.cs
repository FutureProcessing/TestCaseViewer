using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Common;
using Nancy;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Tfs;
using Tfs.Matching;
using Web.Converters;

namespace Web
{
    public class JsonConfiguration : IConfiguration
    {
        private readonly dynamic config;
        private readonly JsonSerializer serializer;

        public JsonConfiguration(IRootPathProvider rootPath)
        {
            var configPath = Path.Combine(rootPath.GetRootPath(), "config.json");

            this.config = JObject.Parse(File.ReadAllText(configPath));

            this.serializer = new JsonSerializer();
            this.serializer.Converters.Add(new MatchingSpecConverter());
            this.serializer.Converters.Add(new FieldSpecConverter());
        }

        public Uri TfsServer
        {
            get { return new Uri((string)this.config.tfs.url); }
        }

        public string ProjectName
        {
            get { return this.config.tfs.project; }
        }

        public IDictionary<string, string> AcceptTransition
        {
            get { return ((JObject) this.config.tfs.transitions.accept).Properties().ToDictionary(x => x.Name, x => ((JValue) x.Value).Value.ToString()); }
        }

        public IDictionary<string, string> RejectTransition
        {
            get { return ((JObject)this.config.tfs.transitions.reject).Properties().ToDictionary(x => x.Name, x => ((JValue)x.Value).Value.ToString()); }
        }

        public MatchingSpec DesignStatus
        {
            get { return ((JObject) this.config.tfs.status.design).ToObject<MatchingSpec>(this.serializer); }
        }

        public MatchingSpec WaitingForApprovalStatus
        {
            get { return ((JObject)this.config.tfs.status.waitingForApproval).ToObject<MatchingSpec>(this.serializer); }
        } 
        
        public MatchingSpec ReadyStatus
        {
            get { return ((JObject)this.config.tfs.status.ready).ToObject<MatchingSpec>(this.serializer); }
        }

        public string DefaultQuery
        {
            get { return this.config.tfs.defaultQuery; }
        }
    }
}