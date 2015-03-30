namespace Web
{
    using System;
    using System.Linq;
    using Microsoft.Owin;
    using Nancy;
    using Nancy.Bootstrapper;
    using Nancy.Conventions;
    using Nancy.Owin;
    using Nancy.Responses;
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
            pipelines.OnError += HandleAjaxError;
        }

        private Response HandleAjaxError(NancyContext context, Exception e)
        {
            bool isAjaxRequest = true;

            if (isAjaxRequest)
            {
                var response = new
                {
                    Type = e.GetType().Name,
                    Message = e.Message,
                    StackTrace = e.StackTrace
                };

                var serializer = this.ApplicationContainer.ResolveAll<ISerializer>().FirstOrDefault(x => x.CanSerialize("application/json"));

                return new JsonResponse(response, serializer)
                {
                    StatusCode = HttpStatusCode.InternalServerError
                };
            }

            return null;
        }

        private Response SetNancyUser(NancyContext ctx)
        {
            var owin = new OwinContext(ctx.GetOwinEnvironment());

            ctx.CurrentUser = new ClaimsUser(owin.Authentication.User);

            return null;
        }
    }
}