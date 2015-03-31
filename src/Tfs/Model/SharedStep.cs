namespace Tfs.Model
{
    using System.Collections.Generic;

    public class SharedStep : TestStepInfo
    {
        public int SharedStepId { get; set; }
        public string Title { get; set; }
        public List<TestStepInfo> Steps { get; set; }

        public override string Type
        {
            get { return "shared"; }
        }
    }
}