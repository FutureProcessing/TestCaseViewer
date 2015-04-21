using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestCaseViewerSeleniumScenarios
{
    public static class MainPage
    {
        private static bool isVisible(string XPathArgument)
        {
            try
            {
                MyDriver.Driver.FindElement(By.XPath(XPathArgument));
                return true;
            }
            catch
            {
                return false;
            }
        }

        private static string _MainPageUrl;

        private static string _logOutButtonCss = "div[data-logout='Log Out']";

        private static string _leftMenuXPath = "//div[@class='left-menu']";

        private static string _rightContentXPath = "//div[@class='right-content']";

        private static string _topBarXPath = "//div[@class='top-bar']";

        private static string _testCaseNumberTextboxXPath = "//div[@class='comm-action-input left-menu-item']/input[@type='text']";

        private static string _goButtonXPath = "//div[@class='comm-action-input left-menu-item']/button[@class='normal comm-action-button comm-action-button']";

        private static string _logOutButtonXPath = "//div[@data-logout='Log Out']";

        private static string _testCaseDropdownXPath = "//div[@class='query-button']";

        private static string _testCaseDropdownValueXPath = "//div[@class='query-button-value']";

        public static string LogOutButtonCss
        {
            get { return MainPage._logOutButtonCss; }
        }

        public static bool LeftMenuIsVisible()
        {
            return isVisible(_leftMenuXPath);
        }

        public static bool RightContentIsVisible()
        {
            return isVisible(_rightContentXPath);
        }

        public static bool TopBarIsVisible()
        {
            return isVisible(_topBarXPath);
        }

        public static bool TestCaseNumberTextboxIsVisible()
        {
            return isVisible(_testCaseNumberTextboxXPath);
        }

        public static bool GoButtonIsVisible()
        {
            return isVisible(_goButtonXPath);
        }

        public static bool LogOutButtonIsVisible()
        {
            return isVisible(_logOutButtonXPath);
        }

        public static bool TestCaseDropdownIsVisible()
        {
            return isVisible(_testCaseDropdownXPath);
        }

        public static string TestCaseDropdownValue
        {
            get 
            {
                return MyDriver.Driver.FindElement(By.XPath(_testCaseDropdownValueXPath)).Text; 
            }
        }

        public static string RightContentValue
        {
            get
            {
                return MyDriver.Driver.FindElement(By.XPath(_rightContentXPath)).Text;
            }
        }

        public static void LogOut()
        {
            MyDriver.Driver.FindElement(By.XPath(_logOutButtonXPath)).Click();
        }

        public static string MainPageUrl
        {
            get { return MainPage._MainPageUrl; }
        }

        static MainPage()
        {
            _MainPageUrl = AppUrls.MainPageUrl;
        }
    }
}
