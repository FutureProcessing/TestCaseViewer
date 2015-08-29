using System;

namespace Tfs.TransitionSpecs
{
    public class Coalesce : Expression, IEquatable<Coalesce>
    {
        public Expression Left { get; set; }
        public Expression Right { get; set; }

        public override object Evalute(EvaluationContext context)
        {
            var left = this.Left.Evalute(context);

            if (left == NotFound.Value)
            {
                return this.Right.Evalute(context);
            }
            else
            {
                return left;
            }
        }

        public override bool Equals(Expression other)
        {
            var obj = other as Coalesce;
            return obj != null && this.Equals(obj);
        }

        public bool Equals(Coalesce other)
        {
            return this.Left.Equals(other.Left) && this.Right.Equals(other.Right);
        }

        public override string ToString()
        {
            return string.Format("({0}) ?? ({1})", this.Left, this.Right);
        }
    }
}