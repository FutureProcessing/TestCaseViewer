namespace Tfs.DI
{
    using System.Net;
    using System.Security.Claims;
    using Autofac;
    using Common;
    using Microsoft.TeamFoundation.Client;

    public class TfsConnectionModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.Register(ctx =>
            {
                var identity = ctx.Resolve<ClaimsIdentity>();
                var password = identity.FindFirst(LocalClaims.PasswordType).Value;

                return new NetworkCredential(identity.Name, password);

            })
            .AsSelf()
            .SingleInstance();

            builder.Register(ctx =>
            {
                var config = ctx.Resolve<IConfiguration>();
                var credentials = ctx.Resolve<NetworkCredential>();

                return new TfsTeamProjectCollection(config.TfsServer, credentials);
            })
            .AsSelf()
            .SingleInstance();
        }
    }
}