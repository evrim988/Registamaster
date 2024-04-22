using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Application.Services.SecurityService;
using RegistaMaster.Domain.DTOModels.Entities.UserModel;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistaMaster.Infasctructure.Services.SecurityServices;
using RegistaMaster.WebApp.Filter;

namespace RegistaMaster.WebApp.Controllers;
[Auth]
public class UserController : Controller
{
  private readonly IUnitOfWork uow;
  private readonly SessionModel session;
  private readonly ISessionService _sessionService;
  public UserController(IUnitOfWork _uow, ISessionService sessionService)
  {
    uow = _uow;
    session = _uow.GetSession();
    _sessionService = sessionService;
  }
  public async Task<object> GetList(DataSourceLoadOptions options)

  {
    var models = await uow.UserRepository.GetList();
    return DataSourceLoader.Load(models, options);
  }
  public IActionResult Index()
  {
    return View();
  }

  [HttpGet]
  public async Task<IActionResult> UserDetail()
  {
    try
    {
      return View(await uow.UserRepository.UserSessionDetail());
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<string> FileUpload(IFormFile FileUrl)
  {
    try
    {
      string fileName = "";
      if (FileUrl != null)
      {
        string extension = Path.GetExtension(FileUrl.FileName);
        Guid guidFile = Guid.NewGuid();
        fileName = "user" + guidFile + extension;
        var path = Path.Combine("wwwroot/Modernize/Img/ProfilePhotos/", fileName);

        using (var stream = new FileStream(path, FileMode.Create))
        {
          FileUrl.CopyTo(stream);
        }
      }
      return fileName;
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }
  public async Task<IActionResult> GetAuthStatus()
  {
    try
    {
      var models = uow.Repository.GetEnumSelect<AuthorizationStatus>();
      var resultJson = JsonConvert.SerializeObject(models);
      return Content(resultJson, "application/json");
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  [HttpPost]
  public async Task<string> AddUser(User model)
  {
    try
    {
      await uow.UserRepository.AddUser(model);
      return "1";
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<string> UpdateUser(UserDetailDto model)
  {
    try
    {
      var user = await uow.UserRepository.UpdateUser(model);
      _sessionService.CleanSession();
      _sessionService.SetUser(user);
      return "1";
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<string> ChangeAuthorization(UserDetailDto model)
  {
    try
    {
      return await uow.UserRepository.ChangeAuthorization(model);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<string> DeleteUser(int ID)
  {
    try
    {
      await uow.UserRepository.DeleteUser(ID);
      return "1";
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }
}
