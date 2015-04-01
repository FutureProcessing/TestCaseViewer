using Microsoft.TeamFoundation.WorkItemTracking.Client;

namespace Tfs
{
    public static class Extensions
    {
        public static QueryItem ByPath(this QueryHierarchy @this, string path)
        {
            var parts = path.Split('/');

            QueryItem item = @this;

            for (int i = 1; i < parts.Length; i++)
            {
                item = ((QueryFolder) item)[parts[i]];
            }

            return item;
        }
    }
}