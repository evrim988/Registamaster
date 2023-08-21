using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using RegistaMaster.Persistance.RegistaMasterContextes;

namespace RegistaMaster.Api.Filters;

public class Auth : ResultFilterAttribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var key = context.HttpContext.Request.Headers["Authorization"].ToString();
        var db = context.HttpContext.RequestServices.GetRequiredService<RegistaMasterContext>();
        var chc = db.Projects.Any(t => t.ProjectGuid.ToString() == key);
        if (!chc)
        {
            context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            return;
        }

    }

}
