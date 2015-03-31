namespace Tfs.DI
{
    using Autofac;
    using Microsoft.TeamFoundation.Client;
    using Microsoft.TeamFoundation.Framework.Client;

    public class TfsModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<AuthenticationService>().AsSelf();
            builder.RegisterType<ProfileService>().AsSelf();
            
            RegisterTfsService<IIdentityManagementService2>(builder);
        }

        private static void RegisterTfsService<TService>(ContainerBuilder builder)
            where TService : class
        {
            builder.Register(ctx =>
            {
                var tfs = ctx.Resolve<TfsTeamProjectCollection>();
                return tfs.GetService<TService>();
            })
            .As<TService>();
        }
    }
}
