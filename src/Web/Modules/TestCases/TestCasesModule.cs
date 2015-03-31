namespace Web.Modules.TestCases
{
    using Tfs;

    public class TestCasesModule : BaseModule
    {
        public TestCasesModule(TestCaseService testCases)
        {
            this.Get["testcase/{id}"] = _ => testCases.GetById(_.id);
        }
    }
}