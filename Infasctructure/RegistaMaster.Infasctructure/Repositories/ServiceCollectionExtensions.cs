using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Application.Services.EmailService;
using RegistaMaster.Application.Services.SecurityService;
using RegistaMaster.Infasctructure.Services.EmailService;
using RegistaMaster.Infasctructure.Services.SecurityServices;
using RegistPackets.FileService.Registrations;

namespace RegistaMaster.Infasctructure.Repositories;

public static class ServiceCollectionExtensions
{
  public static void MyRepository(this IServiceCollection services)
  {
    services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
    services.AddTransient<IUnitOfWork, UnitOfWork>();
    services.AddTransient<ISessionService, SessionService>();
    services.AddTransient<IEmailService, EmailService>();
    services.AddTransient<ISecurityRepository, SecurityRepository>();
    services.AddFileService();
  }
}
