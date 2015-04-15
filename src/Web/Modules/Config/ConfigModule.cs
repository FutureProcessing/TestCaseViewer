using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Common;

namespace Web.Modules.Config
{
    public class ConfigModule : BaseModule
    {
        public ConfigModule(IConfiguration config)
        {
            Get["/config"] = _ => new
            {
                DefaultQuery = config.DefaultQuery
            };
        }
    }
}