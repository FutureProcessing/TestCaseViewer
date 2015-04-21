using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestCaseViewerSeleniumScenarios
{
    public static class AppUrls
    {
        private static string _baseAppUrl = "http://localhost/TestCaseViewer/";

        private static string _LoginPageUrl = _baseAppUrl + "#/login";

        public static string LoginPageUrl
        {
            get { return _LoginPageUrl; }
        }

        private static string _MainPageUrl = _baseAppUrl + "#/testcases";

        public static string MainPageUrl
        {
            get { return _MainPageUrl; }
        }
    }
}
