using Microsoft.AspNetCore.Mvc;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Application.Services.SecurityService;
using RegistaMaster.WebApp.Models.SecurityModels;

namespace RegistaMaster.WebApp.Controllers;

public class SecurityController : Controller
{
    private readonly IUnitOfWork uow;
    private readonly ISecurityRepository securityRepository;
    private readonly ISessionService sessionService;

    public SecurityController(IUnitOfWork _uow, ISecurityRepository _securityRepository, ISessionService _sessionService)
    {
        uow = _uow;
        securityRepository = _securityRepository;
        sessionService = _sessionService;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpGet]
    public IActionResult Login(PathString uri)
    {
        var model = new LoginModel { uri = uri };
        var user = sessionService.GetUser();
        return View(model);
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginModel model)
    {
        var user = await securityRepository.Login(model.UserName, model.Password);
        if (user != null)
        {
            sessionService.SetUser(user);
            if (model.uri != null && model.uri != "/")
                return Redirect(model.uri);
            else
                return Redirect("/Home/Index");
        }
        else
        {
            ModelState.AddModelError("All", "Kullanıcı Adı veya Şifre Hatalı");
            return View(model);
        }
    }
    public IActionResult Logout()
    {
        sessionService.CleanSession();
        return RedirectToAction("Login");
    }
}
