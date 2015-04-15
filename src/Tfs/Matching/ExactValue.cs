using System.Collections.Generic;
using System.Linq;
using Microsoft.TeamFoundation.WorkItemTracking.Client;

namespace Tfs.Matching
{
    public class ExactValue : FieldSpec
    {
        public object Value { get; private set; }

        public ExactValue(object value)
        {
            Value = value;
        }

        public override string ToString()
        {
            return "=" + this.Value;
        }

        public override bool IsMatching(Field field)
        {
            return Equals(field.Value, this.Value);
        }
    }

    public class AnyOfValue : FieldSpec
    {
        public IEnumerable<FieldSpec> AllowedValues { get; private set; }

        public AnyOfValue(IEnumerable<FieldSpec> allowedValues)
        {
            AllowedValues = allowedValues;
        }

        public override bool IsMatching(Field field)
        {
            return this.AllowedValues.Any(x => x.IsMatching(field));
        }
    }
}