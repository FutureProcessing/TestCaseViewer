using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace TestCaseViewerSeleniumScenarios
{
    public static class LoginCredentials
    {
        private static string _userName;

        private static string _password;

        private static string _incorrectPassword;

        public static string IncorrectPassword
        {
            get { return LoginCredentials._incorrectPassword; }
        }

        public static string Password
        {
            get { return LoginCredentials._password; }
        }

        public static string UserName
        {
            get { return LoginCredentials._userName; }
        }

        static LoginCredentials()
        {
            var doc = new XmlDocument();
            doc.Load("../../TestConfiguration.config");
            XmlNode node = doc.GetElementsByTagName("username").Item(0);
            _userName = node.InnerText;
            node = doc.GetElementsByTagName("password").Item(0);
            _password = node.InnerText;
            node = doc.GetElementsByTagName("incorrectPass").Item(0);
            _incorrectPassword = node.InnerText;
        }
    }
}
