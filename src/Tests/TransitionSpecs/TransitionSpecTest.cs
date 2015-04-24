using System;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using Sprache;
using Tfs.TransitionSpecs;

namespace Tests.TransitionSpecs
{
    public class TransitionSpecTest
    {
        [Test]
        [TestCaseSource("Inputs")]
        public void ShouldParseValueExpression(string input, object expected)
        {
            // act                        
            var result = ExpressionParsers.ParseInput(new Input(input));

            // assert
            Assert.That(result.WasSuccessful, Is.True, "Parse was not successful:\n" + result.Message);
            Assert.That(result.Value, Is.EqualTo(expected));
        }

        private static IEnumerable<TestCaseData> Inputs()
        {
            Func<string, object, TestCaseData> tc = (input, expected) => new TestCaseData(input, expected).SetName(input);

            yield return tc("@Changed By(#Status:'Design'->'WaitingForApproval')", new ExpressionWithAsOfSpec
            {
                Expression = new WorkItemFieldReference() { FieldName = "Changed By" },
                AsOf = new AsOfSpec
                {
                    FieldRef = new CalculatedFieldReference() { FieldName = "Status" },
                    OldValue = "Design",
                    NewValue = "WaitingForApproval"
                }
            });

            yield return tc("'Some value'", new DirectValue()
            {
                Value = "Some value"
            });

            yield return tc("@Title", new WorkItemFieldReference()
            {
                FieldName = "Title"
            });

            yield return tc("#Calculated field", new CalculatedFieldReference
            {
                FieldName = "Calculated field"
            });

            yield return tc("null", new DirectValue()
            {
                Value = null
            });
        }
    }
}
