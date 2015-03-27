using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Modules.Home {
    using Nancy;

    public class HomeModule : NancyModule {
        public HomeModule()
        {
            Get["/"] = _ => View["index.sshtml"];            
        }
    }
}