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
                var config = ctx.Resolve<IConfiguration>();

                var identity = ctx.Resolve<ClaimsIdentity>();
                var password = identity.FindFirst(LocalClaims.PasswordType).Value;
                var credentials = new NetworkCredential(identity.Name, password);

                return new TfsTeamProjectCollection(config.TfsServer, credentials);
            })
            .AsSelf()
            .SingleInstance();
        }
    }
}