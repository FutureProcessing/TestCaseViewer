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
        ChromeDriver chrome;

        [TestInitialize]
        public void Init()
        {
            chrome = new ChromeDriver();
            chrome.Navigate().GoToUrl("http://localhost:51619/");
        }

        [TestMethod]
        public void LoginPageIsDisplayedProperly()
        {
            try
            {
                chrome.FindElement(By.XPath("//button[@class='button login-button']"));
                chrome.FindElement(By.XPath("//input[@type='password']"));
                chrome.FindElement(By.XPath("//input[@type='text']"));
            }
            catch(Exception ex)
            {
                Assert.Fail("The login page is not displayed properly.\n Inner exception: " + ex.Message);
            }
        }

        [TestMethod]
        public void MainPageIsDisplayedProperly()
        {
            string login = "Koizee";
            string password = "Dupa1234";
            var wait = new WebDriverWait(chrome, TimeSpan.FromSeconds(5));
            try
            {
                chrome.FindElement(By.XPath("//input[@type='text']")).SendKeys(login);
                chrome.FindElement(By.XPath("//input[@type='password']")).SendKeys(password);
                chrome.FindElement(By.XPath("//button[@class='button login-button']")).Click();

            }
            catch (Exception ex)
            {
                Assert.Fail("The login page is not displayed properly.\n Inner exception: " + ex.Message);
            }

            try
            {
                wait.Until(browser => browser.FindElement(By.XPath("//div[@data-logout='Log Out']")));
                chrome.FindElement(By.XPath("//div[@class='left-menu']"));
                string RightText = chrome.FindElement(By.XPath("//div[@class='right-content']")).Text;
                chrome.FindElement(By.XPath("//div[@class='top-bar']"));
                chrome.FindElement(By.XPath("//div[@class='action-input']/input[@type='text']"));
                chrome.FindElement(By.XPath("//div[@class='action-input']/button[@class='action-button action-button']"));

                Assert.AreEqual("Choose test case.", RightText);
            }
            catch (Exception ex)
            {
                Assert.Fail("The main page is not displayed properly.\n Inner exception: " + ex.Message);
            }
        }

        [TestMethod]
        public void CorrectLogIn()
        {
            string login = "Koizee";
            string password = "Dupa1234";
            var wait = new WebDriverWait(chrome, TimeSpan.FromSeconds(5));
            try
            {
                chrome.FindElement(By.XPath("//input[@type='text']")).SendKeys(login);
                chrome.FindElement(By.XPath("//input[@type='password']")).SendKeys(password);
                chrome.FindElement(By.XPath("//button[@class='button login-button']")).Click();

            }
            catch (Exception ex)
            {
                Assert.Fail("The login page is not displayed properly.\n Inner exception: " + ex.Message);
            }
            try
            {
                wait.Until(browser => browser.FindElement(By.XPath("//div[@data-logout='Log Out']")));
            }
            catch (Exception ex)
            {
                Assert.Fail("Can not find logout button.\n Inner exception: " + ex.Message);
            }
        }

        [TestMethod]
        public void IncorrectLogIn()
        {
            string login = "Koizee";
            string password = "MileHaslo";
            var wait = new WebDriverWait(chrome, TimeSpan.FromSeconds(5));
            try
            {
                chrome.FindElement(By.XPath("//input[@type='text']")).SendKeys(login);
                chrome.FindElement(By.XPath("//input[@type='password']")).SendKeys(password);
                chrome.FindElement(By.XPath("//button[@class='button login-button']")).Click();

            }
            catch (Exception ex)
            {
                Assert.Fail("The login page is not displayed properly.\n Inner exception: " + ex.Message);
            }
            try
            {
                wait.Until(browser => browser.FindElement(By.XPath("//div[@class='login-error']")));
            }
            catch (Exception ex)
            {
                Assert.Fail("Can not find error message.\n Inner exception: " + ex.Message);
            }
        }

        [TestMethod]
        public void CorrectLogOut()
        {
            string login = "Koizee";
            string password = "Dupa1234";
            var wait = new WebDriverWait(chrome, TimeSpan.FromSeconds(5));

            //Log in
            try
            {
                chrome.FindElement(By.XPath("//input[@type='text']")).SendKeys(login);
                chrome.FindElement(By.XPath("//input[@type='password']")).SendKeys(password);
                chrome.FindElement(By.XPath("//button[@class='button login-button']")).Click();

            }
            catch (Exception ex)
            {
                Assert.Fail("The login page is not displayed properly.\n Inner exception: " + ex.Message);
            }

            //Log Out
            try
            {
                wait.Until(browser => browser.FindElement(By.XPath("//div[@data-logout='Log Out']")));
                chrome.FindElement(By.XPath("//div[@data-logout='Log Out']")).Click();
            }
            catch (Exception ex)
            {
                Assert.Fail("Can not find logout button.\n Inner exception: " + ex.Message);
            }

            //Check
            try
            {
                wait.Until(browser => browser.FindElement(By.XPath("//button[@class='button login-button']")));
            }
            catch (Exception ex)
            {
                Assert.Fail("Can not log out correctly.\n Inner exception: " + ex.Message);
            }
            
        }

        [TestCleanup]
        public void TearDown()
        {
            chrome.Quit();
        }
    }
}
