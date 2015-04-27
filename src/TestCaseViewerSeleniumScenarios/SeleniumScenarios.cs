using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using Microsoft.CSharp;

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
            
            var wait = new WebDriverWait(MyDriver.Driver, TimeSpan.FromSeconds(10));


            try
            {
                LoginPage.LoginWithCredentials(LoginCredentials.UserName, LoginCredentials.Password);
                // waiting for loading Main Page
                wait.Until(browser => browser.FindElement(By.CssSelector(MainPage.TCFromListCss(13))));
                Assert.AreEqual(MainPage.MainPageUrl, MyDriver.Driver.Url, "Main page url is incorrect.");
            }
            catch (AssertFailedException) { }
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
                Assert.IsTrue(MainPage.TestCaseListIsVisible(), "Test Case list on the Main page could not be found!");
                Assert.IsTrue(MainPage.TestCaseListContainsAllDefaultTC(), "Not all test cases are displayed on the Main page!");
                Assert.AreEqual(WebConfigInfo.DefaultQuery, MainPage.TestCaseDropdownValue,"Wrong default value selected in test case dropdown on the Main page!");
                Assert.AreEqual("Choose test case.", MainPage.RightContentValue, "Wrong right content text on the Main page");
            }
            catch (AssertFailedException) { }
            catch (Exception ex)
            {
                Assert.Fail("The Main page is not displayed properly.\n Inner exception: " + ex.Message);
            }
        }

        [TestMethod]
        public void IncorrectLogIn()
        {
            var wait = new WebDriverWait(MyDriver.Driver, TimeSpan.FromSeconds(10));
            try
            {
                LoginPage.LoginWithCredentials(LoginCredentials.UserName, LoginCredentials.IncorrectPassword);
                // waiting for loading Main Page
                wait.Until(browser => browser.FindElement(By.XPath("//div[@class='login-error']")));
                Assert.AreEqual(LoginPage.LoginPageUrl, MyDriver.Driver.Url, "Login page url is incorrect.");
            }
            catch (AssertFailedException) { }
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
            var wait = new WebDriverWait(MyDriver.Driver, TimeSpan.FromSeconds(10));
            try
            {
                LoginPage.LoginWithCredentials(LoginCredentials.UserName, LoginCredentials.Password);
                // waiting for loading Main Page
                wait.Until(browser => browser.FindElement(By.CssSelector(MainPage.LogOutButtonCss)));
                Assert.AreEqual(MainPage.MainPageUrl, MyDriver.Driver.Url, "Main page url is incorrect.");
            }
            catch (AssertFailedException) { }
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
            catch (AssertFailedException) { }
            catch (Exception ex)
            {
                Assert.Fail("Can not log out.\n Inner exception: " + ex.Message);
            }
        }

        [TestMethod]
        public void ChangeQuery()
        {
            var wait = new WebDriverWait(MyDriver.Driver, TimeSpan.FromSeconds(2));

            LoginPage.LoginWithCredentials(LoginCredentials.UserName, LoginCredentials.Password);

            //tak wiem bardzo profesjonalne obejście problemu... ale lepszego nie znalazlem w czasie jaki mialem
            try
            {
                while(true)
                wait.Until(browser => browser.FindElement(By.XPath(MainPage.TestCaseListInactiveXPath)));
            }
            catch { }
            Assert.AreEqual(MainPage.MainPageUrl, MyDriver.Driver.Url, "Main page url is incorrect.");

            MainPage.ClickDropdownButton();
            wait.Until(browser => browser.FindElement(By.XPath(MainPage.ExtendedMenuXPath)));
            Assert.IsTrue(MainPage.ExtendedMenuIsVisible(), "Extended manu on the Main page could not be found!");
            MainPage.ClickExtendedMenuElement("Assign to Kojzi");

            //tak wiem bardzo profesjonalne obejście problemu... ale lepszego nie znalazlem w czasie jaki mialem
            try
            {
                while(true)
                wait.Until(browser => browser.FindElement(By.XPath(MainPage.TestCaseListInactiveXPath)));
            }
            catch { }
            Assert.IsTrue(MainPage.TestCaseIsVisible("Developers work"), "On the Main page correct test case is not visible!");
            Assert.IsFalse(MainPage.TestCaseIsVisible("Sample test case 1"), "On the Main page invalid test case is visible!");
            Assert.IsFalse(MainPage.TestCaseIsVisible("TC rejection"), "On the Main page invalid test case is visible!");

        }

        [TestCleanup]
        public void TearDown()
        {
            MyDriver.Driver.Quit();
        }
    }
}
