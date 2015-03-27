using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web
{
    using System.Configuration;
    using Common;

    public class WebConfigConfiguration : IConfiguration
    {
        public Uri TfsServer
        {
            get { return new Uri(ConfigurationManager.AppSettings["tfsServer"]); }
        }
    }
}