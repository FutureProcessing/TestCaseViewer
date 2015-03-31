namespace Tfs.Model
{
    public class SimpleTestStep : TestStepInfo
    {
        public string Action { get; set; }
        public string ExpectedResult { get; set; }

        public override string Type
        {
            get { return "simple"; }
        }
    }
}