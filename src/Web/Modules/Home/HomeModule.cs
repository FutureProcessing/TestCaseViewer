using System.Reflection;
using Nancy;

namespace Web.Modules.Home {
    public class HomeModule : NancyModule {
        public HomeModule()
        {
            Get["/"] = _ => View["index.sshtml", new
            {
                Version = AppVersion()
            }];            
        }

        private static string AppVersion()
        {
            var attribute = typeof (HomeModule).Assembly.GetCustomAttribute<AssemblyFileVersionAttribute>();

            if (attribute != null)
            {
                return attribute.Version;
            }

            return "dev";
        }
    }
}