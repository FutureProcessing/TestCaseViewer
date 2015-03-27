namespace Web
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using Nancy.Security;

    public class ClaimsUser : IUserIdentity
    {
        private readonly ClaimsPrincipal _principal;

        public string UserName
        {
            get { return this._principal.Identity.Name; }
        }

        public IEnumerable<string> Claims 
        {
            get { return this._principal.Claims.Select(x => x.Value); }
        }

        public ClaimsUser(ClaimsPrincipal principal)
        {
            this._principal = principal;
        }
    }
}