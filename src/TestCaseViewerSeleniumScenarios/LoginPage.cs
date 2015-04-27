using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace TestCaseViewerSeleniumScenarios
{
    public static class LoginPage
    {
        private static string _LoginPageUrl;

        private static string _userNameXPath = "//input[@type='text']";

        private static string _passwordXPath = "//input[@type='password']";

        private static string _loginButtonXPath = "//button[@class='normal comm-button login-button']";

        private static string _loginButtonCss = "button[class='normal comm-button login-button']";

        public static string LoginButtonCss
        {
            get { return LoginPage._loginButtonCss; }
        }

        public static string LoginPageUrl
        {
            get { return _LoginPageUrl; }
        }

        public static void LoginWithCredentials(string user, string password)
        {
            MyDriver.Driver.FindElement(By.XPath(_userNameXPath)).SendKeys(user);
            MyDriver.Driver.FindElement(By.XPath(_passwordXPath)).SendKeys(password);
            MyDriver.Driver.FindElement(By.XPath(_loginButtonXPath)).Click();
        }

        public static bool UserNameTextboxIsVisible()
        {
            try
            {
                MyDriver.Driver.FindElement(By.XPath(_userNameXPath));
                return true;
            }
            catch
            {
                return false;
            }
        }

        public static bool PasswordTextboxIsVisible()
        {
            try
            {
                MyDriver.Driver.FindElement(By.XPath(_passwordXPath));
                return true;
            }
            catch
            {
                return false;
            }
        }

        public static bool LogInButtonIsVisible()
        {
            try
            {
                MyDriver.Driver.FindElement(By.XPath(_loginButtonXPath));
                return true;
            }
            catch
            {
                return false;
            }
        }

        public static void NavigateToLoginPage()
        {
            MyDriver.Driver.Url = AppUrls.LoginPageUrl;
            MyDriver.Driver.Navigate();
        }

        static LoginPage()
        {
            _LoginPageUrl = AppUrls.LoginPageUrl;
        }
    }
}
