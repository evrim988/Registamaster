using Microsoft.AspNetCore.Mvc;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Application.Services.SecurityService;
using RegistaMaster.WebApp.Models.SecurityModels;

namespace RegistaMaster.WebApp.Controllers;

public class SecurityController : Controller
{
    private readonly IUnitOfWork _uow;
    private readonly ISecurityRepository _securityRepository;
    private readonly ISessionService _sessionService;

    public SecurityController(IUnitOfWork uow, ISecurityRepository securityRepository, ISessionService sessionService)
    {
        _uow = uow;
        _securityRepository = securityRepository;
        _sessionService = sessionService;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpGet]
    public IActionResult Login(PathString uri)
    {
        var model = new LoginModel { uri = uri };
        var user = _sessionService.GetUser();
        return View(model);
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginModel model)
    {
        var user = await _securityRepository.Login(model.UserName, model.Password);
        if (user != null)
        {
            _sessionService.SetUser(user);
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
        _sessionService.CleanSession();
        return RedirectToAction("Login");
    }
}
