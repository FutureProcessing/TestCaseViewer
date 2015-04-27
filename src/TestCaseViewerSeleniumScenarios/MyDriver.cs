using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestCaseViewerSeleniumScenarios
{
    public static class MyDriver
    {
        private static ChromeDriver _driver;

        public static ChromeDriver Driver
        {
            get { return _driver; }
        }

        public static void NewDriverInstance()
        {
            _driver = new ChromeDriver();
        }
    }
}
