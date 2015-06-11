using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Web.Startup))]

namespace Web {
    using Microsoft.Owin.Security;
    using Microsoft.Owin.Security.Cookies;

    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions()
            {
                AuthenticationMode = AuthenticationMode.Active,
                AuthenticationType = "Forms",
                CookieName = ".TCViewer.Auth",                
            });

            app.Map("/dupa2", p =>
            {
                p.Run(async ctx =>
                {
                    ctx.Response.ContentLength = 1*1024*1024*30;
                    for (int i = 0; i < 1 * 1024 * 1024; i++)
                    {
                        await ctx.Response.WriteAsync("000111222333444555666777888999");
                        await ctx.Response.Body.FlushAsync();
                    }
                });
            });

            app.UseNancy();
        }
    }
}
