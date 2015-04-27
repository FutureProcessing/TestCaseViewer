using System;

namespace Tfs.TransitionSpecs
{
    public abstract class Expression : IEquatable<Expression>
    {
        public abstract bool Equals(Expression other);

        public override bool Equals(object obj)
        {
            var expr = obj as Expression;

            return expr != null && this.Equals(expr);
        }

        public abstract object Evalute(EvaluationContext context);
    }
}