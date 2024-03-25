using DevExtreme.AspNet.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Win32;
using Newtonsoft.Json;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.Enums;
using Request = RegistaMaster.Domain.Entities.Request;
using Action = RegistaMaster.Domain.Entities.Action;
using DevExtreme.AspNet.Mvc;
using NuGet.Protocol.Plugins;
using RegistaMaster.Domain.DTOModels.Entities.RequestModel;
using RegistaMaster.Persistance.RegistaMasterContextes;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.DTOModels.Entities.ActionNoteModels;
using RegistaMaster.Domain.Entities;

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
  public async Task<string> Create(RequestDTO model, string base64)
  {
    try
    {
      if (base64 != null)
      {
        string webRootPath = env.WebRootPath;
        var ımageString = base64.Split(',');
        Guid guidFile = Guid.NewGuid();
        string fileName = "RequestImage" + guidFile + ".jpg";
        var path = Path.Combine(webRootPath + "\\Modernize\\Img\\RequestFile\\", fileName);
        var bytes = Convert.FromBase64String(ımageString[1]);
        using (var imageFile = new FileStream(path, FileMode.Create))
        {
          imageFile.Write(bytes, 0, bytes.Length);
          imageFile.Flush();
        }

        var Extantion = Path.GetExtension(fileName);
        var request = new Request()
        {
          PictureURL = fileName,
          NotificationTypeID = model.NotificationTypeID,
          CategoryID = model.CategoryID,
          ProjectID = model.ProjectID,
          ModuleID = model.ModuleID,
          VersionID = model.VersionID,
          RequestSubject = model.RequestSubject,
          Description = model.Description,
          PageURL = model.PageUrl

        };
        await uow.RequestRepository.RequestAdd(request);
        await uow.SaveChanges();
        return "";
      }
      else
      {
        var request = new Request()
        {
          NotificationTypeID = model.NotificationTypeID,
          CategoryID = model.CategoryID,
          ProjectID = model.ProjectID,
          ModuleID = model.ModuleID,
          VersionID = model.VersionID,
          RequestSubject = model.RequestSubject,
          Description = model.Description,
          PageURL = model.PageUrl

        };
        await uow.RequestRepository.RequestAdd(request);
        await uow.SaveChanges();
      }
      return "1";
    }
    catch (Exception ex)
    {
      throw ex;
    }

  }
  [HttpPost]
  public async Task<string> RequestUpdate(RequestDTO model)
  {
    try
    {
      var request = new Request()
      {
        ID = model.ID,
        NotificationTypeID = model.NotificationTypeID,
        CategoryID = model.CategoryID,
        ProjectID = model.ProjectID,
        ModuleID = model.ModuleID,
        VersionID = model.VersionID,
        RequestSubject = model.RequestSubject,
        Description = model.Description,
        PageURL = model.PageUrl,
        PictureURL = model.PictureURL,
        LastModifiedBy = model.LastModifiedBy,
        LastModifiedOn = DateTime.Now,
        CreatedOn = model.CreatedOn,
        ObjectStatus = ObjectStatus.NonDeleted,
        Status = Status.Active,
        StartDate = DateTime.Now,
        PlanedEndDate = DateTime.Now.AddDays(7),
      };
      context.Update(request);
      await context.SaveChangesAsync();
      return "1";
    }
    catch (Exception ex)
    {
      throw ex;
    }

  }
  public async Task<object> GetList(DataSourceLoadOptions options)

  {
    var models = await uow.RequestRepository.GetList();
    return DataSourceLoader.Load(models, options);
  }

  public async Task<string> GetRequestDetail(int ID)
  {
    var model = uow.Repository.GetNonDeletedAndActive<Action>(t => t.RequestID == ID);

    List<ActionDTO> actionList = new List<ActionDTO>();

    foreach (var item in model)
    {
      ActionDTO actions = new ActionDTO()
      {
        ID = item.ID,
        Description = item.Description,
        EndDate = item.EndDate,
        OpeningDate = item.OpeningDate,
        ResponsibleID = item.ResponsibleID,
        ActionStatus = item.ActionStatus,
        ActionPriorityStatus = item.ActionPriorityStatus,
        ActionDescription = item.ActionDescription,
        LastModifiedBy = item.LastModifiedBy,
        RequestID = ID,
        CreatedOn = item.CreatedOn,
        CreatedBy = item.CreatedBy,
      };
      if (item.ActionStatus == ActionStatus.Contiuned || item.ActionStatus == ActionStatus.notStarted)
      {
        if (item.EndDate <= DateTime.Now)
        {
          actions.Color = "clsRed";
        }
      }
      actionList.Add(actions);
    }
    return JsonConvert.SerializeObject(actionList);
  }

  [HttpPost]
  public async Task<string> RequestDelete(int ID)
  {
    try
    {
      var model = uow.Repository.GetNonDeletedAndActive<Action>(t => t.RequestID == ID).ToList();
      if (model.Count > 0)
        return "-1";
      await uow.Repository.Delete<Request>(ID);
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
      if (model.Count == 0)
        return "1";
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
    var actions = uow.Repository.GetNonDeletedAndActive<Action>(t => t.RequestID == ID).ToList();
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
      var actions = uow.Repository.GetNonDeletedAndActive<Action>(t => t.RequestID == ID).ToList();
      foreach (var action in actions)
      {
        await uow.Repository.Delete<Action>(action.ID);
        var actionNotes = uow.Repository.GetNonDeletedAndActive<ActionNote>(t => t.ActionID == action.ID);
        foreach (var note in actionNotes)
        {
          await uow.Repository.Delete<ActionNote>(note.ID);
        }
      }

      await uow.Repository.Delete<Request>(ID);
      await uow.SaveChanges();
      return "1";
    }

    catch (Exception ex)
    {
      throw ex;
    }
  }


}
