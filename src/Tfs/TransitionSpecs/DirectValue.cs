using System;

namespace Tfs.TransitionSpecs
{
    public class DirectValue : Expression, IEquatable<DirectValue>
    {
        public string Value { get; set; }

        public bool Equals(DirectValue other)
        {
            return other.Value == this.Value;
        }

        public override string ToString()
        {
            return this.Value;
        }

        public override bool Equals(Expression other)
        {
            var type = other as DirectValue;

            return type != null && this.Equals(type);
        }

        public override object Evalute(EvaluationContext context)
        {
            return this.Value;
        }
    }
}