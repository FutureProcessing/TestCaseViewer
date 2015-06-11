using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tfs
{
    public class DownloadSpec
    {
        public string FileName { get; private set; }
        public long Length { get; private set; }
        public Action<Stream> WriteToStream { get; private set; }

        public DownloadSpec(string fileName, long length, Action<Stream> writeToStream)
        {
            FileName = fileName;
            Length = length;
            WriteToStream = writeToStream;
        }
    }
}
