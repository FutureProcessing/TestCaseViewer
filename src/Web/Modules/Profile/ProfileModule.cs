using System.Web;

namespace Web.Modules.Profile
{
    using Nancy;
    using Nancy.Extensions;
    using Tfs;

    public class ProfileModule : BaseModule
    {
        public ProfileModule(ProfileService profiles)
            : base("/profile")
        {
            Get["/{user}/image"] = _ => profiles.GetImageFor(_.user) ?? Response.AsImage(@"Content\empty_profile.png");
        }
    }
}