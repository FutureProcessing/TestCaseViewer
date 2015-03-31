namespace Tfs
{
    public class ImageData
    {
        public string Type { get; private set; }
        public byte[] Data { get; private set; }

        public ImageData(string type, byte[] data)
        {
            this.Type = type;
            this.Data = data;
        }
    }
}