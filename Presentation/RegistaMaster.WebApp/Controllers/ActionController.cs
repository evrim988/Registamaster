using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.Enums;
using Action = RegistaMaster.Domain.Entities.Action;

namespace RegistaMaster.WebApp.Controllers;

public class ActionController : Controller
{
    private readonly IUnitOfWork _uow;
    public ActionController(IUnitOfWork uow)
    {
        _uow = uow;
    }

    public IActionResult Index()
    {
        return View();
    }
    [HttpGet]
    public async Task<IActionResult> Create()
    {
        var model = new ActionDTO();
        model.ResponsiblehelperModelList = await _uow.ActionRepository.ResponsiblehelperModelList();
        model.OpeningDate = DateTime.Now;
        model.EndDate = DateTime.Now;
        return View(model);
    }

    public async Task<object> GetList(DataSourceLoadOptions options)
    {
        try
        {
            var model = _uow.ActionRepository.GetList();
            return DataSourceLoader.Load(model, options);
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<IActionResult> AddAction(string values)
    {
        try
        {
            var model = JsonConvert.DeserializeObject<Action>(values);
            await _uow.ActionRepository.AddActions(model);
            return Ok();
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<string> ActionUpdate(int key, string values)
    {
        try
        {
            var model = await _uow.Repository.GetById<Action>(key);
            JsonConvert.PopulateObject(values, model);
            await _uow.ActionRepository.ActionsUpdate(model);
            await _uow.SaveChanges();
            return "";
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public async Task<object> DeleteAction(int key)
    {
        try
        {
            await _uow.Repository.Delete<Action>(key);
            await _uow.SaveChanges();
            return Ok();
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    public async Task<IActionResult> Detail(int ID)
    {
        var actionDetail = await _uow.ActionRepository.GetAction(ID);
        return View(actionDetail);
    }
    public async Task<IActionResult> GetActionStatus()
    {
        try
        {
            var models = _uow.Repository.GetEnumSelect<ActionStatus>();
            var resultJson = JsonConvert.SerializeObject(models);
            return Content(resultJson, "application/json");
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public async Task<object> GetResponsible(DataSourceLoadOptions loadOptions)
    {
        try
        {
            var model = await _uow.UserRepository.GetResponsible();
            return DataSourceLoader.Load(model, loadOptions);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public async Task<object> GetRequest(DataSourceLoadOptions loadOptions)
    {
        try
        {
            var model = await _uow.ActionRepository.GetRequest();
            return DataSourceLoader.Load(model, loadOptions);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

}
