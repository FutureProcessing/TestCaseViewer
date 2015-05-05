using Microsoft.TeamFoundation.WorkItemTracking.Client;

namespace Tfs.Model
{
    public interface IWorkItemRevision
    {
        FieldCollection Fields { get; }
    }
}