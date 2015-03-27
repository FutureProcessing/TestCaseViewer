namespace Web.Modules.Authentication
{
    using System.Security.Claims;
    using System.Security.Principal;
    using Microsoft.Owin.Security;
    using Nancy;
    using Nancy.Security;
    using Tfs;

    public class AuthenticationModule : BaseModule
    {
        public AuthenticationModule(AuthenticationService authentication)
            : base("/auth")
        {
            Post["login"] = _ =>
            {
                var userName = this.Request.Form.userName;
                var password = this.Request.Form.password;

                if (authentication.ValidateCredentials(userName, password))
                {
                    var props = new AuthenticationProperties { IsPersistent = true };

                    var identity = new ClaimsIdentity(new GenericIdentity(userName, "Forms"), new[]
                    {
                        new Claim(LocalClaims.PasswordType, password), 
                    });

                    this.OwinContext.Authentication.SignIn(props, identity);

                    return Ok;
                }
                else
                {
                    return Negotiate
                        .WithModel(new {Error = "Authentication failed"})
                        .WithStatusCode(HttpStatusCode.Forbidden);
                }
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