using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using System.Text;
using System.Text.Json;

namespace RegistaMaster.WebApp.Filter
{
    public class Auth : ResultFilterAttribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var session = context.HttpContext.Session;
            if (session == null)
            {
                var uri = context.HttpContext.Request.Path;
                context.Result = new RedirectToActionResult("Login", "Security", new { uri });
            }
            else
            {
                Byte[] ss;
                var ctry = session.TryGetValue("login", out ss);
                if (!ctry)
                {
                    var uri = context.HttpContext.Request.Path;
                    context.Result = new RedirectToActionResult("Login", "Security", new { uri });
                    return;
                }
                var sessionModel = FromByteArray<SessionModel>(ss);
                if (sessionModel == null)
                {
                    var uri = context.HttpContext.Request.Path;
                    context.Result = new RedirectToActionResult("Login", "Security", new { uri });
                    return;
                }

            }
        }
        public T FromByteArray<T>(byte[] data)
        {
            if (data == null)
                return default(T);
            // make sure you use same type what you use chose during conversation
            var stringObj = Encoding.ASCII.GetString(data);
            // proper way to Deserialize object
            return JsonSerializer.Deserialize<T>(stringObj);
        }
    }
}
