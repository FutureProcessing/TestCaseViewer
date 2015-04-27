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

        #region private values

        private static string _MainPageUrl;

        private static string _logOutButtonCss = "div[data-logout='Log Out']";

        private static string _TCFromListCss = "li[data-reactid='.0.0.1.0.2.0.0.$NUM']";

        private static string _leftMenuXPath = "//div[@class='left-menu']";

        private static string _rightContentXPath = "//div[@class='right-content']";

        private static string _topBarXPath = "//div[@class='top-bar']";

        private static string _testCaseNumberTextboxXPath = "//div[@class='comm-action-input left-menu-item']/input[@type='text']";

        private static string _goButtonXPath = "//div[@class='comm-action-input left-menu-item']/button[@class='normal comm-action-button comm-action-button']";

        private static string _logOutButtonXPath = "//div[@data-logout='Log Out']";

        private static string _testCaseDropdownActiveXPath = "//div[@class='query-button active']";

        private static string _testCaseDropdownButtonXPath = "//div[@class='query-button-icon']";

        private static string _testCaseDropdownValueXPath = "//div[@class='query-button-value']";

        private static string _testCaseListXPath = "//div[@class='scrollarea test-case-list']";

        private static string _testCaseListInactiveXPath = "//div[@class='scrollarea test-case-list']/div/div[@class='swirl test-case-list-swirl']";

        //private static string _testCaseListActiveXPath = "//div[@class='scrollarea test-case-list']/div/ul]";

        private static string _leftMenuExtensionXPath = "//div[@class='scrollarea left-menu-extension']";

        #endregion

        #region bool functions

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
            return isVisible(_testCaseDropdownButtonXPath) && isVisible(_testCaseDropdownValueXPath);
        }

        public static bool TestCaseListIsVisible()
        {
            return isVisible(_testCaseListXPath);
        }

        public static bool TestCaseListContainsAllDefaultTC()
        {
            return
                isVisible(_testCaseListXPath + "/div/ul/li[. ='Sample test case 1']") &&
                isVisible(_testCaseListXPath + "/div/ul/li[. ='Approval test']") &&
                isVisible(_testCaseListXPath + "/div/ul/li[. ='TC with shared steps']") &&
                isVisible(_testCaseListXPath + "/div/ul/li[. ='TC rejection']") &&
                isVisible(_testCaseListXPath + "/div/ul/li[. ='Do something']") &&
                isVisible(_testCaseListXPath + "/div/ul/li[. ='Developers work']") &&
                isVisible(_testCaseListXPath + "/div/ul/li[. ='Transition test']");
        }

        public static bool TestCaseIsVisible(string tcName)
        {
            return isVisible(_testCaseListXPath + "/div/ul/li[. ='" + tcName + "']");
        }

        public static bool ExtendedMenuIsVisible()
        {
            return isVisible(_leftMenuExtensionXPath);
        }

        #endregion

        #region string parameters

        public static string LogOutButtonCss
        {
            get { return MainPage._logOutButtonCss; }
        }

        public static string TCFromListCss(int tcNumber)
        {
            return MainPage._TCFromListCss.Replace("$NUM", "$" + tcNumber);
        }

        public static string TestCaseListInactiveXPath
        {
            get { return MainPage._testCaseListInactiveXPath; }
        }

        public static string ExtendedMenuXPath
        {
            get { return _leftMenuExtensionXPath; }
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

        public static string TestCaseDropdownActiveXPath
        {
            get { return MainPage._testCaseDropdownActiveXPath; }
        }

        #endregion

        #region gui functions

        public static void LogOut()
        {
            MyDriver.Driver.FindElement(By.XPath(_logOutButtonXPath)).Click();
        }

        public static void ClickDropdownButton()
        {
            MyDriver.Driver.FindElement(By.XPath(_testCaseDropdownButtonXPath)).Click();
        }

        public static void ClickExtendedMenuElement(string elementName)
        {
            string xPath = "//li[. = '" + elementName + "']";
            MyDriver.Driver.FindElement(By.XPath(xPath)).Click();
        }

        #endregion

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
