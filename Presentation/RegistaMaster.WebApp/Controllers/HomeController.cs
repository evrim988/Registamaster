using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.DTOModels.SecurityModels;
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
    private readonly SessionModel _session;
    public HomeController(ILogger<HomeController> logger, IUnitOfWork uow)
    {
        _logger = logger;
        _uow = uow;
        _session = uow.GetSession();
    }
    [Auth]
    public async Task<IActionResult> Index()
    {
        switch (_session.Authorization)
        {
            case AuthorizationStatus.Admin:
                ViewBag.Chart = await _uow.HomeRepository.AdminChart();
                break;
            case AuthorizationStatus.TeamsLeader:
                ViewBag.Chart = await _uow.HomeRepository.TeamLeaderChart(_session.ID);
                break;
            case AuthorizationStatus.Developer:
                ViewBag.Chart = await _uow.HomeRepository.DeveloperChart(_session.ID);
                break;
        }
       
        return View();
    }
    public async Task<string> GetDashboard()
    {
        try
        {
            return JsonConvert.SerializeObject(await _uow.HomeRepository.AdminChartUserActions());
        }
        catch (Exception ex)
        {

            throw ex;
        }
    }


    public async Task<object> GetActionHome(DataSourceLoadOptions options)
    {
        //var models = await _uow.HomeRepository.GetActionHome();
        var models = await _uow.HomeRepository.GetActionDtoHome();
        foreach (var item in models)
        {
            if (item.ActionStatus == ActionStatus.Contiuned || item.ActionStatus == ActionStatus.notStarted)
            {
                if (item.EndDate <= DateTime.Now)
                {
                    item.Color = "clsRed";
                }
            }
        }
        return DataSourceLoader.Load(models, options);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    [HttpPost]
    public string ChanceActionStatusCheckAuth(int ID)
    {
        if (_session.ID == ID)
            return "1";

        return "";
    }

    [HttpPost]
    public async Task<string> ChangeActionStatus(ActionPageDTO model)
    {
        try
        {
            var action = await _uow.Repository.GetById<Action>(model.ID);
            action.ActionStatus = model.ActionStatus;
            _uow.Repository.Update(action);
            await _uow.SaveChanges();

            var requestActions = _uow.Repository.GetNonDeletedAndActive<Action>(t => t.RequestID == action.RequestID).Where(x => x.ActionStatus == ActionStatus.Contiuned).Count();

            if (requestActions > 0)
            {
                var request = await _uow.Repository.GetById<Request>(action.RequestID);
                request.RequestStatus = RequestStatus.Start;
                _uow.Repository.Update(request);
                await _uow.SaveChanges();
                return "2";
            }

            if (requestActions == 0)
            {
                var request = await _uow.Repository.GetById<Request>(action.RequestID);
                request.RequestStatus = RequestStatus.Closed;
                _uow.Repository.Update(request);
                await _uow.SaveChanges();
                return "2";
            }


            return "1";
        }
        catch (Exception ex)
        {
            throw ex;
        }

    }
}