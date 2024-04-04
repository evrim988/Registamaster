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
using RegistPackets.FileService.Interfaces;
using RegistPackets.FileService.Models;
using Action = RegistaMaster.Domain.Entities.Action;
using Request = RegistaMaster.Domain.Entities.Request;

namespace RegistaMaster.WebApp.Controllers;

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
    var request = uow.Repository.GetNonDeletedAndActive<Request>(t => t.ObjectStatus == ObjectStatus.NonDeleted);

    var model = new RequestDTO();
    foreach (var item in request)
    {
      model.PictureURL = item.PictureURL;
      model.ID = item.ID;
      model.LastModifiedBy = item.LastModifiedBy;
      model.RequestStatus = item.RequestStatus;

    }
    model.NotificationType = await uow.RequestRepository.NotificationTypeSelectList();
    model.Category = await uow.RequestRepository.CategorySelectList();
    model.Project = await uow.RequestRepository.GetProjectSelect();

    model.Responsible = await uow.RequestRepository.ResponsibleSelectList();
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
    //var models = await uow.RequestRepository.GetList();
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
      var model = uow.Repository.GetQueryable<Action>(t => t.RequestID == ID && t.ObjectStatus == ObjectStatus.NonDeleted).ToList();
      if (model.Count > 0)
        return "-1";
      await uow.Repository.Delete<Request>(ID);
      await uow.RequestRepository.DeleteFilesWithRequestID(ID);
      await uow.SaveChanges();
      return "1";

    }

    catch (Exception ex)
    {
      throw ex;
    }
  }



  [HttpPost]
  public async Task<IActionResult> AddActionItem([FromBody] Action model, int ID)
  {
    try
    {
      var request = await uow.Repository.GetById<Request>(ID);
      if (request.RequestStatus == RequestStatus.Waiting)
      {
        var cancelledActions = uow.Repository.GetQueryable<Action>(t => t.RequestID == ID && t.Status == Status.Active && t.ObjectStatus == ObjectStatus.NonDeleted && t.ActionStatus == ActionStatus.Cancel).ToList();
        foreach (var action in cancelledActions)
        {
          action.Status = Status.Passive;
        }
        await uow.Repository.UpdateRange(cancelledActions);
        request.RequestStatus = RequestStatus.Start;
        uow.Repository.Update(request);
        await uow.SaveChanges();
      }
      model.RequestID = ID;
      model.ActionStatus = ActionStatus.notStarted;
      await uow.ActionRepository.AddActions(model);
      return Ok(model);
    }
    catch (Exception ex)
    {
      throw ex;
    }

  }

  public async Task<string> DeleteActionItem(int key)
  {
    try
    {
      await uow.Repository.Delete<Action>(key);
      await uow.SaveChanges();
      return "";
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
    var actions = uow.Repository.GetQueryable<Action>(t => t.RequestID == ID && t.ObjectStatus == ObjectStatus.NonDeleted).ToList();
    if (actions.Count() != 0)
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
