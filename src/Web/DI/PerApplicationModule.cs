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

            builder.RegisterType<WebConfigConfiguration>()
                .As<IConfiguration>();

            builder.Register(ctx => (ClaimsIdentity) Thread.CurrentPrincipal.Identity).AsSelf();
        }
    }
}