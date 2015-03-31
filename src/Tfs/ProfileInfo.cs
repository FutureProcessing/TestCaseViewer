namespace Tfs
{
    public class ProfileInfo
    {
        public string DisplayName { get; private set; }

        public ProfileInfo(string displayName)
        {
            this.DisplayName = displayName;
        }
    }
}