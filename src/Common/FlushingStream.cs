using System.IO;

namespace Common
{
    public class FlushingStream : Stream
    {
        private readonly Stream destionation;

        public FlushingStream(Stream destionation)
        {
            this.destionation = destionation;
        }

        public override void Flush()
        {
            this.destionation.Flush();
        }

        public override long Seek(long offset, SeekOrigin origin)
        {
            return this.destionation.Seek(offset, origin);
        }

        public override void SetLength(long value)
        {
            this.destionation.SetLength(value);
        }

        public override int Read(byte[] buffer, int offset, int count)
        {
            return this.destionation.Read(buffer, offset, count);
        }

        public override void Write(byte[] buffer, int offset, int count)
        {
            this.destionation.Write(buffer, offset, count);
            this.destionation.Flush();
        }

        public override bool CanRead
        {
            get { return this.destionation.CanRead; }
        }

        public override bool CanSeek
        {
            get { return this.destionation.CanSeek; }
        }

        public override bool CanWrite
        {
            get { return this.destionation.CanWrite; }
        }

        public override long Length
        {
            get { return this.destionation.Length; }
        }

        public override long Position
        {
            get { return this.destionation.Position; }
            set { this.destionation.Position = value; }
        }
    }
}