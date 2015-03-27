namespace Tfs
{
    using System;
    using System.Net;
    using Common;
    using Microsoft.TeamFoundation;
    using Microsoft.TeamFoundation.Client;

    public class AuthenticationService 
    {
        private readonly IConfiguration _configuration;

        public AuthenticationService(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        public bool ValidateCredentials(string userName, string password)
        {            
            var credentials = new NetworkCredential(userName, password);

            var tfs = new TfsTeamProjectCollection(this._configuration.TfsServer, credentials);
            try
            {
                tfs.Authenticate();
                return true;
            }
            catch (TeamFoundationServerUnauthorizedException e)
            {
                return false;
            }            
        }
    }
}