using System;
using System.Collections.Generic;
using Microsoft.TeamFoundation.WorkItemTracking.Client;
using Tfs.Model;

namespace Tfs.TransitionSpecs
{
    public class AsOfSpec
    {
        public FieldReference FieldRef { get; set; }

        public string OldValue { get; set; }

        public string NewValue { get; set; }

        public override bool Equals(object value)
        {
            var type = value as AsOfSpec;
            return (type != null) && EqualityComparer<FieldReference>.Default.Equals(type.FieldRef, FieldRef) && EqualityComparer<string>.Default.Equals(type.OldValue, OldValue) && EqualityComparer<string>.Default.Equals(type.NewValue, NewValue);
        }

        public override int GetHashCode()
        {
            int num = 0x7a2f0b42;
            num = (-1521134295 * num) + EqualityComparer<FieldReference>.Default.GetHashCode(FieldRef);
            num = (-1521134295 * num) + EqualityComparer<string>.Default.GetHashCode(OldValue);
            return (-1521134295 * num) + EqualityComparer<string>.Default.GetHashCode(NewValue);
        }

        public override string ToString()
        {
            return string.Format("{0}: {1} -> {2}", this.FieldRef, this.OldValue, this.NewValue);
        }

        public IWorkItemRevision Resolve(EvaluationContext context)
        {
            for (int i = context.WorkItem.Revisions.Count - 1; i >= 1; i--)
            {
                var old = context.WorkItem.Revisions[i - 1].Wrap();
                var @new = context.WorkItem.Revisions[i].Wrap();

                var oldValue = this.FieldRef.Evalute(context.AsOfRevision(old));
                var newValue = this.FieldRef.Evalute(context.AsOfRevision(@new));

                if (Equals(oldValue, this.OldValue) && Equals(newValue, this.NewValue))
                {
                    return @new;
                }
            }

            return null;
        }
    }
}