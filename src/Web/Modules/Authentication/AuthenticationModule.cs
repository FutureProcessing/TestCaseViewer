namespace Web.Modules.Authentication
{
    using System.Linq;
    using System.Security.Claims;
    using System.Security.Principal;
    using Microsoft.Owin.Security;
    using Nancy;
    using Nancy.Security;

    public class AuthenticationModule : BaseModule
    {
        public AuthenticationModule()
            : base("/auth")
        {
            Post["login"] = _ =>
            {
                var props = new AuthenticationProperties { IsPersistent = true };

                var identity = new ClaimsIdentity(new GenericIdentity("admin", "Forms"), new[]
                {
                    new Claim(LocalClaims.PasswordType, "password"), 
                });

                this.OwinContext.Authentication.SignIn(props, identity);

                return Ok;
            };

            Post["/logout"] = _ =>
            {
                this.OwinContext.Authentication.SignOut("Forms");

                return Ok;
            };

            Get["identity", ctx => ctx.CurrentUser.IsAuthenticated()] = _ => new
            {
                IsAuthenticated = true,
                UserName = this.CurrentUser.Identity.Name
            };

            Get["identity", ctx => !ctx.CurrentUser.IsAuthenticated()] = _ => new
            {
                IsAuthenticated = false
            };
        }
    }
}