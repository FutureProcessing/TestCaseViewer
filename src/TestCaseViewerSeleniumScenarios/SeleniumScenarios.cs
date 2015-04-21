using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;


namespace TestCaseViewerSeleniumScenarios
{
    [TestClass]
    public class SeleniumScenarios
    {

        [TestInitialize]
        public void Init()
        {
            MyDriver.NewDriverInstance();
            LoginPage.NavigateToLoginPage();
        }

        [TestMethod]
        public void LoginPageIsDisplayedProperly()
        {
                Assert.IsTrue(LoginPage.UserNameTextboxIsVisible(),"UserName textbox on the Login page could not be found!");
                Assert.IsTrue(LoginPage.PasswordTextboxIsVisible(), "Password textbox on the Login page could not be found!");
                Assert.IsTrue(LoginPage.LogInButtonIsVisible(), "Login button on the Login page could not be found!");
        }

        [TestMethod]
        public void MainPageIsDisplayedProperly()
        {
            string login = "Koizee";
            string password = "Dupa1234";
            var wait = new WebDriverWait(MyDriver.Driver, TimeSpan.FromSeconds(10));
            try
            {
                LoginPage.LoginWithCredentials(login, password);
                // waiting for loading Main Page
                wait.Until(browser => browser.FindElement(By.CssSelector(MainPage.LogOutButtonCss)));
                Assert.AreEqual(MainPage.MainPageUrl, MyDriver.Driver.Url, "Main page url is incorrect.");
            }
            catch (Exception ex)
            {
                Assert.Fail("Could not log in.\n Inner exception: " + ex.Message);
            }

            try
            {
                Assert.IsTrue(MainPage.LeftMenuIsVisible(), "Left Menu on the Main page could not be found!");
                Assert.IsTrue(MainPage.LogOutButtonIsVisible(), "Log Out button on the Main page could not be found!");
                Assert.IsTrue(MainPage.TestCaseNumberTextboxIsVisible(), "Test Case Number textbox on the Main page could not be found!");
                Assert.IsTrue(MainPage.GoButtonIsVisible(), "Go button on the Main page could not be found!");
                Assert.IsTrue(MainPage.TopBarIsVisible(), "Top Bar on the Main page could not be found!");
                Assert.IsTrue(MainPage.TestCaseDropdownIsVisible(), "Test Case dropdown on the Main page could not be found!");
                Assert.IsTrue(MainPage.RightContentIsVisible(), "Right Content on the Main page could not be found!");
                Assert.AreEqual("Default", MainPage.TestCaseDropdownValue,"Wrong default value selected in test case dropdown on the Main page!");
                Assert.AreEqual("Choose test case.", MainPage.RightContentValue, "Wrong right content text on the Main page");
            }
            catch (Exception ex)
            {
                Assert.Fail("The Main page is not displayed properly.\n Inner exception: " + ex.Message);
            }
        }

        [TestMethod]
        public void IncorrectLogIn()
        {
            string login = "Koizee";
            string password = "MileHaslo";
            var wait = new WebDriverWait(MyDriver.Driver, TimeSpan.FromSeconds(10));
            try
            {
                LoginPage.LoginWithCredentials(login, password);
                // waiting for loading Main Page
                wait.Until(browser => browser.FindElement(By.XPath("//div[@class='login-error']")));
                Assert.AreEqual(LoginPage.LoginPageUrl, MyDriver.Driver.Url, "Login page url is incorrect.");
            }
            catch (WebDriverTimeoutException ex)
            {
                Assert.Fail("Can not find error message.\n Inner exception: " + ex.Message);
            }
            catch(Exception ex)
            {
                Assert.Fail("Inner exception: " + ex.Message);
            }
        }

        [TestMethod]
        public void CorrectLogOut()
        {
            string login = "Koizee";
            string password = "Dupa1234";
            var wait = new WebDriverWait(MyDriver.Driver, TimeSpan.FromSeconds(10));
            try
            {
                LoginPage.LoginWithCredentials(login, password);
                // waiting for loading Main Page
                wait.Until(browser => browser.FindElement(By.CssSelector(MainPage.LogOutButtonCss)));
                Assert.AreEqual(MainPage.MainPageUrl, MyDriver.Driver.Url, "Main page url is incorrect.");
            }
            catch (Exception ex)
            {
                Assert.Fail("Could not log in.\n Inner exception: " + ex.Message);
            }

            //Log Out
            try
            {
                MainPage.LogOut();
                wait.Until(browser => browser.FindElement(By.CssSelector(LoginPage.LoginButtonCss)));
                Assert.AreEqual(LoginPage.LoginPageUrl, MyDriver.Driver.Url, "Login page url is incorrect.");
            }
            catch (Exception ex)
            {
                Assert.Fail("Can not log out.\n Inner exception: " + ex.Message);
            }
        }

        [TestCleanup]
        public void TearDown()
        {
            MyDriver.Driver.Quit();
        }
    }
}
