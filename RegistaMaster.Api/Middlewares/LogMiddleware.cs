namespace RegistaMaster.Api.Middlewares;

public class LogMiddleware
{
    RequestDelegate _next;

    public LogMiddleware(RequestDelegate next)
    {
        _next = next;
    }
    public async Task InvokeAsync(HttpContext httpContext)
    {
        Console.WriteLine("Say Hello");
        await _next.Invoke(httpContext);
        Console.WriteLine(" Hello");
    }
}
