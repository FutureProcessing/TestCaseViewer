using System.Collections.Generic;

namespace Tfs.TransitionSpecs
{
    public class ExpressionWithAsOfSpec : Expression
    {
        public Expression Expression { get; set; }
        public AsOfSpec AsOf { get; set; }

        public override bool Equals(object value)
        {
            var type = value as ExpressionWithAsOfSpec;
            return (type != null) 
                && EqualityComparer<Expression>.Default.Equals(type.Expression, Expression) 
                && EqualityComparer<object>.Default.Equals(type.AsOf, AsOf);
        }

        public override int GetHashCode()
        {
            int num = 0x7a2f0b42;
            num = (-1521134295*num) + EqualityComparer<Expression>.Default.GetHashCode(Expression);
            return (-1521134295*num) + EqualityComparer<object>.Default.GetHashCode(AsOf);
        }

        public override bool Equals(Expression other)
        {
            return this.Equals((object) other);
        }

        public override string ToString()
        {
            return string.Format("FieldRef = {0} AsOfSpec = {1}", this.Expression, this.AsOf);
        }

        public override object Evalute(EvaluationContext context)
        {
            var revision = this.AsOf.Resolve(context);

            return this.Expression.Evalute(context.AsOfRevision(revision));
        }
    }
}