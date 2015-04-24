using Microsoft.TeamFoundation.WorkItemTracking.Client;
using Tfs.Model;
using Tfs.TransitionSpecs;

namespace Tfs.DI
{
    using Autofac;
    using Microsoft.TeamFoundation.Client;
    using Microsoft.TeamFoundation.Framework.Client;
    using Microsoft.TeamFoundation.TestManagement.Client;

    public class TfsModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<AuthenticationService>().AsSelf();
            builder.RegisterType<ProfileService>().AsSelf();
            builder.RegisterType<TestCaseService>().AsSelf();
            builder.RegisterType<QueriesService>().AsSelf();

            builder.RegisterType<EvaluationContext>().AsSelf();
            builder.RegisterType<WorkItemTransition>().AsSelf();

            RegisterTfsService<IIdentityManagementService2>(builder);
            RegisterTfsService<ITestManagementService2>(builder);
            RegisterTfsService<WorkItemStore>(builder);
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
