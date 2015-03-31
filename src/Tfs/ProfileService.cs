using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tfs
{
    using Microsoft.TeamFoundation.Framework.Client;
    using Microsoft.TeamFoundation.Framework.Common;

    public class ProfileService
    {
        private readonly Func<IIdentityManagementService2> _identityManagementFactory;

        public ProfileService(Func<IIdentityManagementService2> identityManagementFactory)
        {
            this._identityManagementFactory = identityManagementFactory;
        }

        public ProfileInfo GetProfileFor(string userName)
        {
            var service = this._identityManagementFactory();

            var identity = service.ReadIdentity(IdentitySearchFactor.AccountName, userName, MembershipQuery.Direct, ReadIdentityOptions.ExtendedProperties);

            if (identity == null)
            {
                return null;
            }

            return new ProfileInfo(identity.DisplayName);
        }

        public object GetImageFor(string user)
        {
            var service = this._identityManagementFactory();

            var identity = service.ReadIdentity(IdentitySearchFactor.AccountName, user, MembershipQuery.Direct, ReadIdentityOptions.ExtendedProperties);

            if (identity == null)
            {
                return null;
            }

            object imageType;
            if (identity.TryGetProperty("Microsoft.TeamFoundation.Identity.Image.Type", out imageType))
            {
                var imageData = (byte[])identity.GetProperty("Microsoft.TeamFoundation.Identity.Image.Data");

                return new ImageData((string) imageType, imageData);
            }

            return null;
        }
    }
}
