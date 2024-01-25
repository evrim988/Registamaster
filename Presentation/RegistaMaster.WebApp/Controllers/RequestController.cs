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

namespace RegistaMaster.WebApp.Controllers;

public class RequestController : Controller
{
    private readonly IUnitOfWork uow;
    private IWebHostEnvironment env;
    private readonly RegistaMasterContext context;
    public RequestController(IUnitOfWork _uow,IWebHostEnvironment _env,RegistaMasterContext _context)
    {
        uow = _uow;
        env = _env;
        context = _context;
    }

    public async Task<IActionResult> Index()
    {
        var request =  uow.Repository.GetNonDeletedAndActive<Request>(t => t.ObjectStatus == ObjectStatus.NonDeleted);
        
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
        model.Module = await uow.RequestRepository.GetModule();
        model.Version = await uow.RequestRepository.GetVersion();
        return View(model);
    }
    //[HttpPost]
    //public async Task<IActionResult> Create()
    //{
    //    var model = new RequestDTO();
    //    model.NotificationType = await uow.RequestRepository.NotificationTypeSelectList();
    //    model.Category = await uow.RequestRepository.CategorySelectList();
    //    model.Project = await uow.RequestRepository.GetProjectSelect();
    //    model.Module = await uow.RequestRepository.GetModule();
    //    model.Version = await uow.RequestRepository.GetVersion();
    //    return View(model);
    //}
    [HttpPost]
    public async Task<string> Create(RequestDTO model,string base64)
    {
        try
        {
            if (base64 != null)
            {
                string webRootPath = env.WebRootPath;
                var ımageString = base64.Split(',');
                Guid guidFile = Guid.NewGuid();
                string fileName = "RequestImage" + guidFile + ".jpg";
                var path = Path.Combine(webRootPath + "\\Modernize\\Img\\RequestFiles\\", fileName);
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
                PictureURL=model.PictureURL,
                LastModifiedBy = model.LastModifiedBy,
                CustomerID = model.CustomerID,
                LastModifiedOn = DateTime.Now,
                CreatedOn = model.CreatedOn,
                ObjectStatus=ObjectStatus.NonDeleted,
                Status=Status.Active,
                StartDate= DateTime.Now,
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

    public async Task<IActionResult> GetRequestDetail(int ID)
    {
        var models = await uow.RequestRepository.GetActionDetail(ID);
        return Ok(models);
    }

    public async Task<IActionResult> RequestAdd(string values)
    {
        try
        {
            var model = JsonConvert.DeserializeObject<Request>(values);
            await uow.RequestRepository.RequestAdd(model);
            return Ok();
        }
        catch (Exception e)
        {

            throw e;
        }
    }
    public async Task<string> RequestEdit(int Key, string values)
    {
        try
        {
            var size = await uow.Repository.GetById<Request>(Key);
            JsonConvert.PopulateObject(values, size);
            uow.RequestRepository.Update(size);
            await uow.SaveChanges();

            return "1";
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    [HttpPost]
    public async Task<string> RequestDelete(int ID)
    {
        try
        {
            var model =  uow.Repository.GetNonDeletedAndActive<Action>(t => t.RequestID == ID).ToList();
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
            model.OpeningDate = DateTime.Now;
            model.EndDate = DateTime.Now.AddDays(7);
            model.ActionStatus = ActionStatus.Contiuned;
            await uow.ActionRepository.AddActions(model);
            return Ok(model);
        }
        catch (Exception ex)
        {
            throw ex;
        }

    }

    [HttpPut]
    public async Task<IActionResult> EditActionItem(int key, string values)
    {
        var model = await uow.Repository.GetById<Action>(key);
        JsonConvert.PopulateObject(values, model);
        await uow.ActionRepository.ActionsUpdate(model);
        return Ok();
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

    public async Task<IActionResult> GetCategoryStatus()
    {
        try
        {
            var models = uow.Repository.GetEnumSelect<CategoryStatus>();
            var resultJson = JsonConvert.SerializeObject(models);
            return Content(resultJson, "application/json");
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

    public async Task<object> GetCustomer(DataSourceLoadOptions loadOptions)
    {
        try
        {
            var model = await uow.RequestRepository.GetCustomer();
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
    [HttpPost]
    public async Task<string> ActionStatusChangeUpdate(int ID, ActionStatus actionStatus)
    {
        try
        {
            var model = await uow.RequestRepository.ActionStatusChangeUpdate(ID, actionStatus);
            return model;
        }
        catch (Exception e)
        {
            throw e;
        }
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

    [HttpPost]
    public async Task<string> RequestChangeStatusUpdate(int requestStatus, int ID)
    {
        try
        {
            var model = await uow.Repository.GetById<Request>(ID);
            model.RequestStatus = (RequestStatus)requestStatus;
            model.PlanedEndDate = DateTime.Now;
            context.Update(model);
            await uow.SaveChanges();
            return "1";
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}
