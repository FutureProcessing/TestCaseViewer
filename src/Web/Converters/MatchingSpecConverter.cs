using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Tfs.Matching;

namespace Web.Converters
{
    public class MatchingSpecConverter : JsonConverter
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var @object = (JObject)JToken.ReadFrom(reader);

            return new MatchingSpec
            {
                Fields = @object.Properties().ToDictionary(x => x.Name, x => x.Value.ToObject<FieldSpec>(serializer))
            };
        }

        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof (MatchingSpec);
        }
    }

    public class FieldSpecConverter : JsonConverter
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var token = JToken.ReadFrom(reader);

            var tokenValue = token as JValue;
            if (tokenValue != null)
            {
                return new ExactValue(tokenValue.Value);
            }

            var tokenArray = token as JArray;
            if (tokenArray != null)
            {
                return new AnyOfValue(tokenArray.Select(x => x.ToObject<FieldSpec>(serializer)));
            }

            return null;
        }

        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof (FieldSpec);
        }
    }
}