using System;
using System.IO;
using Nancy;

namespace Web
{
    public static class Extensions
    {
        public static Response WithStream(this IResponseFormatter @this, Action<Stream> stream)
        {
            return (Response) stream;
        }
    }
}