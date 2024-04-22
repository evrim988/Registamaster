using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.DTOModels.Entities.RequestModel;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistaMaster.Persistance.RegistaMasterContextes;
using RegistPackets.FileService.Interfaces;
using RegistPackets.FileService.Models;
using Action = RegistaMaster.Domain.Entities.Action;
using Version = RegistaMaster.Domain.Entities.Version;

namespace RegistaMaster.Infasctructure.Repositories;

public class RequestRepository : Repository, IRequestRepository
{
  private readonly IUnitOfWork _uow;
  private readonly SessionModel _session;
  private readonly IConfiguration _config;
  private readonly IFileService _fileService;
  private readonly RegistaMasterContext _context;

  public RequestRepository(RegistaMasterContext context, SessionModel session, IUnitOfWork uow, IConfiguration config, IFileService fileService) : base(context, session)
  {
    _context = context;
    _uow = uow;
    _session = session;
    _config = config;
    _fileService = fileService;
  }

  public async Task<Request> RequestAdd(Request model)
  {
    try
    {
      var time = DateTime.Now;
      model.StartDate = time;
      model.PlanedEndDate = time.AddDays(7);
      model.RequestStatus = RequestStatus.Open;
      var request = await _uow.Repository.Add(model);
      await _uow.SaveChanges();
      return request;
    }
    catch (Exception e)
    {

      throw e;
    }

  }
  public async Task<Request> UpdateRequest(RequestGridDTO model)
  {
    var request = await GetById<Request>(model.ID);
    request.NotificationTypeID = model.NotificationTypeID;
    request.CategoryID = model.CategoryID;
    request.ProjectID = model.ProjectID;
    request.ModuleID = model.ModuleID;
    request.VersionID = model.VersionID;
    request.Subject = model.Subject;
    request.Description = model.Description;
    request.PageURL = model.PageURL;
    request.PictureURL = model.PictureURL;

    Update(request);
    await _uow.SaveChanges();
    return request;
  }
  public void Delete(int id)
  {
    var request = GetNonDeletedAndActive<Request>(t => t.ID == id);
    DeleteRange(request.ToList());

    Delete<Request>(id);
  }
  public async Task<List<RequestGridDTO>> GetList()
  {
    var model = GetNonDeletedAndActive<Request>(t => t.ObjectStatus == ObjectStatus.NonDeleted).OrderByDescending(s => s.ID).Select(t => new RequestGridDTO()
    {
      ID = t.ID,
      CreatedBy = t.CreatedBy,
      Subject = t.Subject,
      CategoryID = t.CategoryID,
      NotificationTypeID = t.NotificationTypeID,
      PageURL = t.PageURL,
      PictureURL = t.PictureURL,
      StartDate = t.StartDate,
      CreatedOn = t.CreatedOn,
      PlanedEndDate = t.PlanedEndDate,
      RequestStatus = t.RequestStatus,
      NotificationID = t.NotificationID,
      VersionID = t.VersionID,
      ModuleID = t.ModuleID,
      ProjectID = t.ProjectID,
      Description = t.Description
    }).ToList();

    return model;
  }

  public async Task<List<RequestGridDTO>> GetListWithFiles()
  {
    var requests = await _context.Requests.Where(t => t.ObjectStatus == ObjectStatus.NonDeleted && t.Status == Status.Active).OrderByDescending(s => s.ID).Include(x => x.Files).Select(t => new RequestGridDTO()
    {
      ID = t.ID,
      CreatedBy = t.CreatedBy,
      Subject = t.Subject,
      CategoryID = t.CategoryID,
      NotificationTypeID = t.NotificationTypeID,
      PageURL = t.PageURL,
      PictureURL = t.PictureURL,
      StartDate = t.StartDate,
      CreatedOn = t.CreatedOn,
      PlanedEndDate = t.PlanedEndDate,
      RequestStatus = t.RequestStatus,
      NotificationID = t.NotificationID,
      VersionID = t.VersionID,
      ModuleID = t.ModuleID,
      ProjectID = t.ProjectID,
      Description = t.Description,
      Files = t.Files.Where(a => a.ObjectStatus == ObjectStatus.NonDeleted && a.Status == Status.Active).OrderByDescending(s => s.ID).ToList(),
    }).ToListAsync();

    return requests;
  }

  public async Task<List<ResponsibleDevextremeSelectListHelper>> GetProject()
  {
    try
    {
      List<ResponsibleDevextremeSelectListHelper> ResponsibleHelpers = new List<ResponsibleDevextremeSelectListHelper>();
      var model = _context.Projects
          .Where(t => t.ObjectStatus == ObjectStatus.NonDeleted);
      foreach (var item in model)
      {
        ResponsibleDevextremeSelectListHelper helper = new ResponsibleDevextremeSelectListHelper()
        {
          ID = item.ID,
          Name = item.ProjectName,
        };
        ResponsibleHelpers.Add(helper);
      }
      return ResponsibleHelpers;
    }
    catch (Exception e)
    {
      throw e;
    }
  }
  public async Task<List<ResponsibleDevextremeSelectListHelper>> GetCustomer()
  {
    try
    {
      List<ResponsibleDevextremeSelectListHelper> CustomerHelpers = new List<ResponsibleDevextremeSelectListHelper>();
      var model = _context.Customers
          .Where(t => true);
      foreach (var item in model)
      {
        ResponsibleDevextremeSelectListHelper helper = new ResponsibleDevextremeSelectListHelper()
        {
          ID = item.ID,
          Name = item.Name,
        };
        CustomerHelpers.Add(helper);
      }
      return CustomerHelpers;
    }
    catch (Exception)
    {

      throw;
    }
  }
  public async Task<List<ActionDTO>> GetActionDetail(int RequestId)
  {
    var model = await GetNonDeletedAndActive<Action>(t => t.RequestID == RequestId).Select(s => new ActionDTO()
    {
      ID = s.ID,
      Description = s.Description,
      EndDate = s.EndDate,
      OpeningDate = s.OpeningDate,
      ResponsibleID = s.ResponsibleID,
      ActionStatus = s.ActionStatus,
      Subject = s.Subject,
      LastModifiedBy = s.LastModifiedBy,
      RequestID = RequestId,
      CreatedOn = s.CreatedOn,
    }).ToListAsync();


    return model;
  }

  public async Task<List<ResponsibleDevextremeSelectListHelper>> GetModuleSelect()
  {
    try
    {
      List<ResponsibleDevextremeSelectListHelper> ModulesHelpers = new List<ResponsibleDevextremeSelectListHelper>();
      var model = _context.Modules
          .Where(t => t.ObjectStatus == ObjectStatus.NonDeleted);
      foreach (var item in model)
      {
        ResponsibleDevextremeSelectListHelper helper = new ResponsibleDevextremeSelectListHelper()
        {
          ID = item.ID,
          Name = item.Name,
        };
        ModulesHelpers.Add(helper);
      }
      return ModulesHelpers;
    }
    catch (Exception)
    {

      throw;
    }
  }

  public async Task<List<SelectListItem>> NotificationTypeSelectList()
  {
    List<SelectListItem> notificationTypeSelectList = new()
            {
                new SelectListItem { Value = "0", Text = "Hata" },
                new SelectListItem { Value = "1" , Text = "Öneri"}
            };
    return notificationTypeSelectList;

  }

  public async Task<List<SelectListItem>> CategorySelectList()
  {
    List<SelectListItem> categorySelectList = new()
            {
                new SelectListItem { Value = "0" , Text = "Sınıflandırılmamış" },
                new SelectListItem { Value = "1" , Text = "Yeni Fonksiyon"},
                new SelectListItem { Value = "2" , Text = "Hata Giderme"},
                new SelectListItem { Value = "3" , Text = "Veri Düzeltme"},
                new SelectListItem { Value = "4" , Text = "Uyumluluk"}
            };
    return categorySelectList;
  }

  public async Task<List<ResponsibleDevextremeSelectListHelper>> GetVersionSelect()
  {
    try
    {
      List<ResponsibleDevextremeSelectListHelper> ModulersHelpers = new List<ResponsibleDevextremeSelectListHelper>();
      var model = _context.Versions
          .Where(t => true);
      foreach (var item in model)
      {
        ResponsibleDevextremeSelectListHelper helper = new ResponsibleDevextremeSelectListHelper()
        {
          ID = item.ID,
          Name = item.Name,
        };
        ModulersHelpers.Add(helper);
      }
      return ModulersHelpers;
    }
    catch (Exception)
    {

      throw;
    }
  }

  public async Task<string> ActionStatusChangeUpdate(int ID, ActionStatus actionStatus)
  {
    try
    {
      var model = await _uow.Repository.GetById<Action>(ID);
      model.ActionStatus = actionStatus;
      Update(model);
      await _uow.SaveChanges();
      return "1";
    }
    catch (Exception e)
    {
      throw e;
    }


  }

  public async Task<List<SelectListItem>> GetProjectSelect()
  {
    try
    {
      return GetNonDeletedAndActive<Project>(t => true)
          .Select(s => new SelectListItem { Value = s.ID.ToString(), Text = s.ProjectName }).ToList();
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<List<SelectListItem>> GetModule()
  {
    try
    {
      return GetNonDeletedAndActive<Module>(t => true)
          .Select(s => new SelectListItem { Value = s.ID.ToString(), Text = s.Name }).ToList();
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<List<SelectListItem>> GetVersion()
  {
    try
    {
      return GetNonDeletedAndActive<Version>(t => true)
          .Select(s => new SelectListItem { Value = s.ID.ToString(), Text = s.Name }).ToList();
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<List<SelectListItem>> GetModuleList(int ID)
  {
    return GetNonDeletedAndActive<Module>(t => t.ProjectID == ID && t.ObjectStatus == ObjectStatus.NonDeleted)
            .Select(s => new SelectListItem { Value = s.ID.ToString(), Text = s.Name }).ToList();
  }

  public async Task<List<SelectListItem>> ResponsibleSelectList()
  {
    var list = GetNonDeletedAndActive<User>(t => t.AuthorizationStatus != AuthorizationStatus.Admin).Select(user => new SelectListItem
    {
      Value = user.ID.ToString(),
      Text = user.Fullname,
    }).ToList();

    return list;
  }

  public async Task<List<SelectListItem>> GetVersionList(int ID)
  {
    var versions = await GetNonDeletedAndActive<Version>(t => t.ProjectID == ID && t.ObjectStatus == ObjectStatus.NonDeleted).ToListAsync();

    var uniqueVersions = versions.GroupBy(v => v.Name)
                                 .Select(g => g.First())
                                 .ToList();

    return uniqueVersions.Select(s => new SelectListItem { Value = s.ID.ToString(), Text = s.Name }).ToList();
  }


  public async Task<string> CompleteRequest(int ID)
  {
    try
    {
      var request = await _uow.Repository.GetById<Request>(ID);
      request.RequestStatus = RequestStatus.Closed;
      request.PlanedEndDate = DateTime.Now;
      Update<Request>(request);
      await _uow.SaveChanges();
      return "1";
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<string> AddRequestFiles(List<IFormFile> files, int ID)
  {
    try
    {
      var filesResponces = new List<FileResponseModel>();
      foreach (IFormFile file in files)
      {
        var fileRespose = _fileService.SaveFile(file, "/Documents/RequestDocs");
        FileResponseModel model = new();
        model.FileName = fileRespose.FileName;
        model.Extension = fileRespose.Extension;
        model.FilePath = _config["BasePaths:BaseUri"] + _config["BasePaths:ServiceUri"] + "/" + fileRespose.FileName;
        filesResponces.Add(model);
      }
      foreach (var file in filesResponces)
      {
        await _uow.Repository.Add<RequestFile>(new RequestFile()
        {
          RequestID = ID,
          FileName = file.FileName,
          FileURL = file.FilePath
        });
      }
      await _uow.SaveChanges();
      return "filesResponces";
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<string> DeleteRequestFiles(List<string> fileIDs)
  {
    try
    {
      List<RequestFile> files = new();
      foreach (string fileID in fileIDs)
      {
        files.Add(await GetById<RequestFile>(Convert.ToInt32(fileID)));
      }
      await DeleteRange<RequestFile>(files);
      await _uow.SaveChanges();
      return "";
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<string> DeleteFilesWithRequestID(int ID)
  {
    try
    {
      var files = GetNonDeletedAndActive<RequestFile>(t => t.RequestID == ID).ToList();
      if (files.Count > 0)
        await DeleteRange<RequestFile>(files);
      return "";
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<string> RequestDeleteWithActions(int ID)
  {
    try
    {
      var actions = GetQueryable<Action>(t => t.RequestID == ID && t.ObjectStatus == ObjectStatus.NonDeleted).ToList();
      foreach (var action in actions)
      {
        await Delete<Action>(action.ID);
        var actionNotes = GetNonDeletedAndActive<ActionNote>(t => t.ActionID == action.ID).ToList();
        await DeleteRange<ActionNote>(actionNotes);
      }

      var files = GetNonDeletedAndActive<RequestFile>(t => t.RequestID == ID).ToList();
      if (files.Count > 0)
        await DeleteRange<RequestFile>(files);

      await Delete<Request>(ID);
      await _uow.SaveChanges();
      return "1";
    }

    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<string> RequestDelete(int ID)
  {
    try
    {
      await DeleteFilesWithRequestID(ID);
      await Delete<Request>(ID);
      await _uow.SaveChanges();
      return "1";
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<RequestWithIncludeDTO> RequestDetail(int ID)
  {
    try
    {
      var request = _context.Requests.Where(t => t.ID == ID).Include(x => x.Project).Include(y => y.Version).Include(z => z.Files).First();
      request.Files = request.Files.Where(t => t.ObjectStatus == ObjectStatus.NonDeleted).ToList();
      var requestInc = new RequestWithIncludeDTO()
      {
        StartDate = request.StartDate.ToShortDateString(),
        PlanedEndDate = request.PlanedEndDate.ToShortDateString(),
        Description = request.Description,
        Subject = request.Subject,
        Files = request.Files,
        Project = request.Project.ProjectName,
        Version = request.Version.Name,
        PageURL = request.PageURL == null ? "-" : request.PageURL,
        PictureURL = request.PictureURL,
        RequestStatus = request.RequestStatus.ToString(),
      };

      switch (request.CategoryID)
      {
        case 0: requestInc.Category = "Hata"; break;
        case 1: requestInc.Category = "Öneri"; break;
        default: requestInc.Category = "-"; break;
      }

      switch (request.NotificationTypeID)
      {
        case 0: requestInc.NotificationType = "Sınıflandırılmamış"; break;
        case 1: requestInc.NotificationType = "Yeni Fonksiyon"; break;
        case 2: requestInc.NotificationType = "Hata Giderme"; break;
        case 3: requestInc.NotificationType = "Veri Düzeltme"; break;
        case 4: requestInc.NotificationType = "Uyumluluk"; break;
        default: requestInc.NotificationType = "-"; break;
      }

      if (request.ModuleID != null)
        requestInc.Module = _context.Modules.Find(ID).Name;
      else
        requestInc.Module = "-";
      return requestInc;
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }
}
