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

            app.UseNancy();
        }
    }
}
