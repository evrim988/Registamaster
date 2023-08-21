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

namespace RegistaMaster.WebApp.Controllers;

public class RequestController : Controller
{
    private readonly IUnitOfWork uow;

    public RequestController(IUnitOfWork _uow)
    {
        this.uow = _uow;
    }

    public IActionResult Index()
    {
        return View();
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
    [HttpDelete]
    public async Task<IActionResult> RequestDelete(int Key)
    {
        try
        {
            await uow.Repository.Delete<Request>(Key);
            await uow.SaveChanges();
            return Ok();

        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    public async Task<IActionResult> AddActionItem(string values, int ID)
    {
        var model = JsonConvert.DeserializeObject<Action>(values);
        model.RequestID = ID;
        await uow.ActionRepository.AddActions(model);
        return Ok(model);
    }
    [HttpPut]
    public async Task<IActionResult> EditActionItem(int key, string values, int ID)
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
}
