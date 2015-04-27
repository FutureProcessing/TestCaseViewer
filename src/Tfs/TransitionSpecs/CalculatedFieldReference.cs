using System;

namespace Tfs.TransitionSpecs
{
    public class CalculatedFieldReference : FieldReference,IEquatable<CalculatedFieldReference>
    {
        public string FieldName { get; set; }

        public override object Evalute(EvaluationContext context)
        {
            var testCaseService = context.Resolve<TestCaseService>();
            return testCaseService.DetermineStatus(context.Revision);
        }

        public override bool Equals(Expression other)
        {
            var type = other as CalculatedFieldReference;
            return type != null;
        }

        public bool Equals(CalculatedFieldReference other)
        {
            return other.FieldName == this.FieldName;
        }
    }
}