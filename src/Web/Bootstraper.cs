namespace Web
{
    using Microsoft.Owin;
    using Nancy;
    using Nancy.Bootstrapper;
    using Nancy.Conventions;
    using Nancy.Owin;
    using Nancy.TinyIoc;

    public class Bootstraper : DefaultNancyBootstrapper
    {
        protected override void ConfigureConventions(NancyConventions nancyConventions)
        {
            base.ConfigureConventions(nancyConventions);

            nancyConventions.ViewLocationConventions.Clear();
            nancyConventions.ViewLocationConventions.Add((view, model, ctx) => "app/dist/" + view);

            nancyConventions.StaticContentsConventions.Clear();
            nancyConventions.StaticContentsConventions.AddDirectory("/", "app/dist");
        }

        protected override void RequestStartup(TinyIoCContainer container, IPipelines pipelines, NancyContext context)
        {
            base.RequestStartup(container, pipelines, context);

            pipelines.BeforeRequest += SetNancyUser;
        }

        private Response SetNancyUser(NancyContext ctx)
        {
            var owin = new OwinContext(ctx.GetOwinEnvironment());

            ctx.CurrentUser = new ClaimsUser(owin.Authentication.User);

            return null;
        }
    }
}