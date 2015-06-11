using System;
using System.Collections.Generic;
using System.Linq;
using Nancy;
using Nancy.Responses.Negotiation;
using Tfs;

namespace Web
{
    public class DownloadResponseFormatter : IResponseProcessor
    {
        public IEnumerable<Tuple<string, MediaRange>> ExtensionMappings
        {
            get { return Enumerable.Empty<Tuple<string, MediaRange>>(); }
        }

        public ProcessorMatch CanProcess(MediaRange requestedMediaRange, dynamic model, NancyContext context)
        {
            if (model is DownloadSpec)
            {
                return new ProcessorMatch()
                {
                    ModelResult = MatchResult.ExactMatch,
                    RequestedContentTypeResult = MatchResult.DontCare
                };
            }
            else
            {
                return new ProcessorMatch()
                {
                    ModelResult = MatchResult.NoMatch,
                    RequestedContentTypeResult = MatchResult.DontCare
                };
            }
        }

        public Response Process(MediaRange requestedMediaRange, dynamic model, NancyContext context)
        {
            var spec = (DownloadSpec) model;

            return new Response()
            {
                Contents = spec.WriteToStream,
                ContentType = MimeTypes.GetMimeType(spec.FileName),
                Headers =
                {
                    {"Content-Length", spec.Length.ToString()}
                }
            };
        }
    }
}