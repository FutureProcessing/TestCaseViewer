using Microsoft.TeamFoundation.WorkItemTracking.Client;
using Tfs.Model;
using QueryFolder = Microsoft.TeamFoundation.WorkItemTracking.Client.QueryFolder;
using QueryItem = Microsoft.TeamFoundation.WorkItemTracking.Client.QueryItem;

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

        public static IWorkItemRevision LastRevision(this WorkItem @this)
        {
            return new WorkItemAccesor(@this);            
        }

        public static IWorkItemRevision Wrap(this Revision @this)
        {
            return new RevisionAccessor(@this);
        }
    }

    public class RevisionAccessor : IWorkItemRevision
    {
        public RevisionAccessor(Revision revision)
        {
            this.Fields = revision.Fields;
        }

        public FieldCollection Fields { get; private set; }
    }

    public class WorkItemAccesor : IWorkItemRevision
    {
        public FieldCollection Fields { get; private set; }

        public WorkItemAccesor(WorkItem workItem)
        {
            this.Fields = workItem.Fields;
        }
    }
}