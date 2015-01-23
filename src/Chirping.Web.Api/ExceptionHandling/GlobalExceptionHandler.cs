﻿#region using directives

using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Web.Http.ExceptionHandling;

#endregion

namespace Chirping.Web.Api.ExceptionHandling
{
    public class GlobalExceptionHandler : ExceptionHandler
    {
        public override void Handle(ExceptionHandlerContext context)
        {
            // log the exception to the tracing pipeline
            Trace.WriteLine(context.Exception.ToString());

            // create a response and send back a bad request (400)
            var response = new HttpResponseMessage(HttpStatusCode.BadRequest)
            {
                Content = new StringContent(context.Exception.Message)
            };

            context.Result = new ErrorMessageResult(context.Request, response);
        }
    }
}