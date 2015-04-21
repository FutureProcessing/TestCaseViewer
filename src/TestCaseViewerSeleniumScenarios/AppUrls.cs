using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestCaseViewerSeleniumScenarios
{
    public static class AppUrls
    {
        private static string _LoginPageUrl = "http://localhost/TestCaseViewer/#/login";

        public static string LoginPageUrl
        {
            get { return _LoginPageUrl; }
        }

        private static string _MainPageUrl = "http://localhost/TestCaseViewer/#/testcases";

        public static string MainPageUrl
        {
            get { return _MainPageUrl; }
        }
    }
}
