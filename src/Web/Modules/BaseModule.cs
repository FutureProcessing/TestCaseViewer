namespace Web.Modules
{
    using System.Security.Claims;
    using Microsoft.Owin;
    using Nancy;
    using Nancy.Owin;

    public abstract class BaseModule : NancyModule
    {
        protected IOwinContext OwinContext
        {
            get { return new OwinContext(this.Context.GetOwinEnvironment()); }
        }

        protected ClaimsPrincipal CurrentUser
        {
            get { return this.OwinContext.Authentication.User; }
        }

        protected object Ok
        {
            get { return new {Ok = true}; }
        }

        protected BaseModule()
        {
            
        }

        protected BaseModule(string modulePath)
            : base(modulePath)
        {
            
        }   
            
    }
}