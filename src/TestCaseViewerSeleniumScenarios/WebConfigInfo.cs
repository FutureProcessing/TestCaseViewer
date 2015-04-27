using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestCaseViewerSeleniumScenarios
{
    public static class WebConfigInfo
    {
        private static string _defaultQuery;

        public static string DefaultQuery
        {
            get { return WebConfigInfo._defaultQuery; }
        }

        static WebConfigInfo()
        {
            dynamic webConfig = JObject.Parse(File.ReadAllText("../../../Web/config.json"));
            string defaultQuery = webConfig.tfs.defaultQuery;
            _defaultQuery = defaultQuery.Substring(defaultQuery.LastIndexOf('/') + 1);
        }
    }
}
