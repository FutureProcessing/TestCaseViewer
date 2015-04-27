using Sprache;

namespace Tfs.TransitionSpecs
{
    public class ExpressionParsers
    {
        public static readonly Parser<string> FieldName = from field in Parse.LetterOrDigit.Or(Parse.Char(' ')).Many().Text()
                                                          select field.Trim();

        public static readonly Parser<string> Value = from leading in Parse.Char('\'')
                                                      from text in Parse.CharExcept('\'').Many().Text()
                                                      from trailing in Parse.Char('\'')
                                                      select text;

        public static readonly Parser<DirectValue> StringValue = from value in Value
                                                                 select new DirectValue()
                                                                 {
                                                                     Value = value
                                                                 };

        public static readonly Parser<DirectValue> Null = from value in Parse.String("null")
                                                          select new DirectValue
                                                          {
                                                              Value = null
                                                          };

        public static readonly Parser<DirectValue> DirectValue = StringValue.Or(Null); 

        public static readonly Parser<WorkItemFieldReference> WorkItemFieldReference = from _ in Parse.Char('@')
                                                                                       from f in FieldName
                                                                                       select new WorkItemFieldReference
                                                                                       {
                                                                                           FieldName = f
                                                                                       };

        public static readonly Parser<CalculatedFieldReference> CalculatedFieldReference = from _ in Parse.Char('#')
                                                                                           from f in FieldName
                                                                                           select new CalculatedFieldReference()
                                                                                           {
                                                                                               FieldName = f
                                                                                           };

        public static readonly Parser<FieldReference> FieldReference =
            WorkItemFieldReference.Select(x => (FieldReference)x)
            .Or(CalculatedFieldReference);

        public static readonly Parser<AsOfSpec> AsOf = from field in FieldReference
                                                       from _ in Parse.Char(':')
                                                       from oldValue in Value
                                                       from __ in Parse.String("->")
                                                       from newValue in Value
                                                       select new AsOfSpec
                                                       {
                                                           FieldRef = field,
                                                           OldValue = oldValue,
                                                           NewValue = newValue
                                                       };

        public static readonly Parser<Expression> Expression = DirectValue.Select(x => (Expression)x)
                                                           .Or(WorkItemFieldReference.Select(x => (Expression)x))
                                                           .Or(CalculatedFieldReference.Select(x => (Expression)x))
                                                           ;

        public static readonly Parser<ExpressionWithAsOfSpec> ExpressionWithAsOf = from expression in Expression
                                                                                   from _ in Parse.Char('(')
                                                                                   from asOf in AsOf
                                                                                   from __ in Parse.Char(')')
                                                                                   select new ExpressionWithAsOfSpec { Expression = expression, AsOf = asOf };

        public static readonly Parser<Expression> ParseInput = ExpressionWithAsOf
                                                           .Or(Expression)
                                                           ;
    }
}
