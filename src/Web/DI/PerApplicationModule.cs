using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Web.Converters;

namespace Web.DI
{
    using System.Security.Claims;
    using System.Threading;
    using Autofac;
    using Common;
    using Tfs;
    using Tfs.DI;

    public class PerApplicationModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterModule<TfsModule>();

            builder.RegisterType<JsonConfiguration>()
                .As<IConfiguration>();

            builder.Register(ctx => (ClaimsIdentity) Thread.CurrentPrincipal.Identity).AsSelf();            

            builder.RegisterType<CustomJsonSerializer>().As<JsonSerializer>();            
        }
    }

    public class CustomJsonSerializer : JsonSerializer
    {
        public CustomJsonSerializer()
        {
            this.ContractResolver = new CamelCasePropertyNamesContractResolver();
            this.Converters.Add(new MatchingSpecConverter());
            this.Converters.Add(new FieldSpecConverter());
        }
    }
}