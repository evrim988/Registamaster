using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistaMaster.WebApp.Filter;
using RegistaMaster.WebApp.Models;
using System.Diagnostics;
using System.Runtime.InteropServices;
using Action = RegistaMaster.Domain.Entities.Action;

namespace RegistaMaster.WebApp.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IUnitOfWork _uow;
    public HomeController(ILogger<HomeController> logger, IUnitOfWork uow)
    {
        _logger = logger;
        _uow = uow;
    }
    [Auth]
    public async Task<IActionResult> Index()
    {
        var action = _uow.Repository.GetNonDeletedAndActive<Action>(t => t.ObjectStatus == ObjectStatus.NonDeleted);
        var model = new ActionDTO();
        foreach (var item in action)
        {
            model.ActionDescription = item.ActionDescription;
            model.Description = item.Description;
            model.OpeningDate = item.OpeningDate;
            model.EndDate = item.EndDate;
            model.LastModifiedBy = item.LastModifiedBy;
        }
        return View(model);
    }
    [Auth]
    public async Task<object> GetTaskHome(DataSourceLoadOptions options)
    {
        var models = await _uow.HomeRepository.GetTaskHome();
        return DataSourceLoader.Load(models, options);
    }

    public async Task<object> GetActionHome(DataSourceLoadOptions options)
    {
        var models = await _uow.HomeRepository.GetActionHome();
        return DataSourceLoader.Load(models, options);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }


}