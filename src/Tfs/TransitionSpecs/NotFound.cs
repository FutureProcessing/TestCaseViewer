namespace Tfs.TransitionSpecs
{
    public class NotFound
    {
        public static readonly NotFound Value = new NotFound();

        private NotFound()
        {            
        }

        protected bool Equals(NotFound other)
        {
            return true;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals((NotFound) obj);
        }

        public override int GetHashCode()
        {
            return 0;
        }

        public static bool operator ==(object left, NotFound right)
        {
            return left is NotFound;
        }

        public static bool operator !=(object left, NotFound right)
        {
            return !(left == right);
        }
    }
}