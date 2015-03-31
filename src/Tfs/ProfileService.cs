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
    }

    public class ProfileInfo
    {
        public string DisplayName { get; private set; }

        public ProfileInfo(string displayName)
        {
            this.DisplayName = displayName;
        }
    }
}
