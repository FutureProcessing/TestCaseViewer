using System;

namespace Tfs.Model
{
    using System.Collections.Generic;

    public class TestCase
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string State { get; set; }
        public string CreatedBy { get; set; }
        public List<TestStepInfo> Steps { get; set; }
        public string Status { get; set; }
        public string AssignedTo { get; set; }
        public DateTime LastChangedDate { get; set; }
    }
}