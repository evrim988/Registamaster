using RegistaMaster.Api.Middlewares;

namespace RegistaMaster.Api.Extensions;

static public class Extension
{
    public static IApplicationBuilder UseLog(this IApplicationBuilder applicationBuilder)
    {
        return applicationBuilder.UseMiddleware<LogMiddleware>();
    }
}
