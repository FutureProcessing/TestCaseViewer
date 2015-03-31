namespace Web.Modules.Profile
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using Nancy;
    using Nancy.Responses;
    using Nancy.Responses.Negotiation;
    using Tfs;

    public class ImageDataResponse : IResponseProcessor
    {
        public ProcessorMatch CanProcess(MediaRange requestedMediaRange, dynamic model, NancyContext context)
        {
            if (model is ImageData)
            {
                return new ProcessorMatch(){ModelResult = MatchResult.ExactMatch, RequestedContentTypeResult = MatchResult.DontCare};                
            }

            return new ProcessorMatch {ModelResult = MatchResult.NoMatch, RequestedContentTypeResult = MatchResult.DontCare};
        }

        public Response Process(MediaRange requestedMediaRange, dynamic model, NancyContext context)
        {
            var image = (ImageData) model;

            Func<Stream> streamSource = () => new MemoryStream(image.Data);

            return new StreamResponse(streamSource, image.Type);
        }

        public IEnumerable<Tuple<string, MediaRange>> ExtensionMappings
        {
            get { return Enumerable.Empty<Tuple<string, MediaRange>>(); }
        }
    }
}