namespace Web.Modules.TestCases
{
    using Tfs;

    public class TestCasesModule : BaseModule
    {
        public TestCasesModule(TestCaseService testCases)
        {
            Get["testcase/{id}"] = _ => testCases.GetById(_.id) ?? NotFound("Test case {0} not found", _.id);

            Post["testcase/{id}/accept"] = _ =>
            {
                testCases.Accept(_.id);
                return Ok;
            };

            Post["testcase/{id}/reject"] = _ =>
            {
                testCases.Reject(_.id); return Ok;                
            };            
        }
    }
}