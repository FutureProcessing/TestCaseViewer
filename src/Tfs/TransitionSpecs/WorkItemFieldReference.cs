using System;

namespace Tfs.TransitionSpecs
{
    public class WorkItemFieldReference : FieldReference, IEquatable<WorkItemFieldReference>
    {
        public string FieldName { get; set; }

        public bool Equals(WorkItemFieldReference other)
        {
            return this.FieldName == other.FieldName;
        }

        public override bool Equals(Expression other)
        {
            var type = other as WorkItemFieldReference;
            return type != null && this.Equals(type);
        }

        public override object Evalute(EvaluationContext context)
        {
            return context.Revision.Fields[this.FieldName].Value;
        }

        public override string ToString()
        {
            return "@" + this.FieldName;
        }
    }
}