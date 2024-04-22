using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.JSInterop.Implementation;
using Newtonsoft.Json;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.DTOModels.Entities.RequestModel;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistaMaster.Persistance.RegistaMasterContextes;
using RegistaMaster.WebApp.Filter;
using RegistPackets.FileService.Interfaces;
using RegistPackets.FileService.Models;
using Action = RegistaMaster.Domain.Entities.Action;
using Request = RegistaMaster.Domain.Entities.Request;

namespace RegistaMaster.WebApp.Controllers;
[Auth]
public class RequestController : Controller
{
  private readonly IUnitOfWork uow;
  private IWebHostEnvironment env;
  private readonly RegistaMasterContext context;
  public RequestController(IUnitOfWork _uow, IWebHostEnvironment _env, RegistaMasterContext _context)
  {
    uow = _uow;
    env = _env;
    context = _context;
  }

  public async Task<IActionResult> Index()
  {
    var model = new RequestDTO
    {
      NotificationType = await uow.RequestRepository.NotificationTypeSelectList(),
      Category = await uow.RequestRepository.CategorySelectList(),
      Project = await uow.RequestRepository.GetProjectSelect(),
      Responsible = await uow.RequestRepository.ResponsibleSelectList()
    };
    return View(model);
  }

  [HttpPost]
  public async Task<Request> Create(Request model, string base64)
  {
    try
    {
      if (base64 != null)
      {
        string webRootPath = env.WebRootPath;
        var ımageString = base64.Split(',');
        Guid guidFile = Guid.NewGuid();
        string fileName = "RequestImage" + guidFile + ".jpg";
        var path = Path.Combine(webRootPath + "\\Documents\\RequestDocs\\", fileName);
        var bytes = Convert.FromBase64String(ımageString[1]);
        using (var imageFile = new FileStream(path, FileMode.Create))
        {
          imageFile.Write(bytes, 0, bytes.Length);
          imageFile.Flush();
        }

        var Extantion = Path.GetExtension(fileName);
        model.PictureURL = fileName;

        return await uow.RequestRepository.RequestAdd(model);
      }
      else
        return await uow.RequestRepository.RequestAdd(model);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public Task<string> SaveRequestDoc(List<IFormFile> files, int ID)
  {
    try
    {
      return uow.RequestRepository.AddRequestFiles(files, ID);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  [HttpPost]
  public async Task<Request> RequestUpdate(RequestGridDTO model)
  {
    try
    {
      return await uow.RequestRepository.UpdateRequest(model);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<object> GetList(DataSourceLoadOptions options)
  {
    var models = await uow.RequestRepository.GetListWithFiles();
    return DataSourceLoader.Load(models, options);
  }

  public async Task<string> GetRequestDetail(int ID)
  {
    return JsonConvert.SerializeObject(uow.ActionRepository.GetActionsByRequestID(ID));
  }

  [HttpPost]
  public async Task<string> RequestDelete(int ID)
  {
    try
    {
      return await uow.RequestRepository.RequestDelete(ID);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<IActionResult> AddAction(Action model)
  {
    try
    {
      await uow.ActionRepository.AddAction(model);
      return Ok();
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<IActionResult> GetRequestStatus()
  {
    try
    {
      var models = uow.Repository.GetEnumSelect<RequestStatus>();
      var resultJson = JsonConvert.SerializeObject(models);
      return Content(resultJson, "application/json");
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<object> GetProject(DataSourceLoadOptions loadOptions)
  {
    try
    {
      var responsibleHelpers = await uow.RequestRepository.GetProject();
      return DataSourceLoader.Load(responsibleHelpers, loadOptions);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<object> GetModules(DataSourceLoadOptions options)
  {
    try
    {
      var model = await uow.RequestRepository.GetModuleSelect();
      return DataSourceLoader.Load(model, options);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<object> GetVersion(DataSourceLoadOptions loadOptions)
  {
    try
    {
      var model = await uow.RequestRepository.GetVersionSelect();
      return DataSourceLoader.Load(model, loadOptions);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<List<SelectListItem>> GetNotificationType()
  {
    return await uow.RequestRepository.NotificationTypeSelectList();
  }

  public async Task<List<SelectListItem>> GetCategorySelect()
  {
    return await uow.RequestRepository.CategorySelectList();
  }

  public async Task<string> GetModuleList(int ID)
  {
    try
    {
      var model = await uow.RequestRepository.GetModuleList(ID);
      return JsonConvert.SerializeObject(model);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<string> GetVersionList(int ID)
  {
    try
    {
      var model = await uow.RequestRepository.GetVersionList(ID);
      if (model.Count == 0)
        return "1";
      return JsonConvert.SerializeObject(model);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }


  public async Task<string> CheckActionsForDeleteRequest(int ID)
  {
    //Talebe bağlı aksiyon kontrolü
    if (uow.Repository.GetQueryable<Action>(t => t.RequestID == ID && t.ObjectStatus == ObjectStatus.NonDeleted).Any())
      return "2";
    return "1";
  }

  //aksiyonlarala birlikte talebi sil
  [HttpPost]
  public async Task<string> RequestDeleteWithActions(int ID)
  {
    try
    {
      return await uow.RequestRepository.RequestDeleteWithActions(ID);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<string> CompleteRequest(int ID)
  {
    try
    {
      return await uow.RequestRepository.CompleteRequest(ID);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<string> DeleteFile([FromBody] List<string> files)
  {
    try
    {
      return await uow.RequestRepository.DeleteRequestFiles(files);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }
}
