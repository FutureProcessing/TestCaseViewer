using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace TestCaseViewerSeleniumScenarios
{
    public static class AppUrls
    {
        private static string _baseAppUrl;

        private static string _LoginPageUrl;

        public static string LoginPageUrl
        {
            get { return _LoginPageUrl; }
        }

        private static string _MainPageUrl;

        public static string MainPageUrl
        {
            get { return _MainPageUrl; }
        }

        static AppUrls()
        {
            var doc = new XmlDocument();
            doc.Load("../../TestConfiguration.config");
            XmlNode node = doc.GetElementsByTagName("appUrl").Item(0);
            _baseAppUrl = node.InnerText;
            _LoginPageUrl = _baseAppUrl + "#/login";
            _MainPageUrl = _baseAppUrl + "#/testcases";
        }
    }
}
