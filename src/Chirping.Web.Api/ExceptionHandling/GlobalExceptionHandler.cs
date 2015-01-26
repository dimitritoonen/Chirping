﻿#region using directives

using Chirping.Web.Api.Diagnostics;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.ExceptionHandling;

#endregion

namespace Chirping.Web.Api.ExceptionHandling
{
    public class GlobalExceptionHandler : ExceptionHandler
    {
        public override bool ShouldHandle(ExceptionHandlerContext context)
        {
            return true;
        }

        public override void Handle(ExceptionHandlerContext context)
        {
            // log the exception to the tracing pipeline
            using (var logContext = new LogOperationScope("Global"))
            {
                logContext.TraceError(LogEvent.FatalGlobalUnexpectedException, context.Exception);
            }


            // create a response and send back a bad request (400)
            var response = new HttpResponseMessage(HttpStatusCode.BadRequest)
            {
                Content = new StringContent(context.Exception.Message)
            };

            context.Result = new ErrorMessageResult(context.Request, response);
        }
    }
}