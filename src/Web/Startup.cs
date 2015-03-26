using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Web.Startup))]

namespace Web {
    using Nancy;
    using Nancy.Conventions;

    public class Startup {
        public void Configuration(IAppBuilder app) {
            app.UseNancy();
        }
    }


    public class Bootstraper : DefaultNancyBootstrapper
    {
        protected override void ConfigureConventions(NancyConventions nancyConventions)
        {
            base.ConfigureConventions(nancyConventions);

            nancyConventions.ViewLocationConventions.Clear();
            nancyConventions.ViewLocationConventions.Add((view, model, ctx) => "app/" + view);
        }
    }
}
