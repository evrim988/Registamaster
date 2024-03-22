﻿using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.DTOModels.Entities.ActionNoteModels;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
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

  public async Task<IActionResult> Index()
  {
    ViewBag.Responsible = await _uow.RequestRepository.ResponsibleSelectList();
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
      var model = _uow.ActionRepository.GetList().ToList();
      foreach (var item in model)
      {
        if (item.ActionStatus == ActionStatus.Contiuned || item.ActionStatus == ActionStatus.notStarted)
        {
          if (item.EndDate <= DateTime.Now)
          {
            item.Color = "clsRed";
          }
        }
      }
      return DataSourceLoader.Load(model, options);
    }
    catch (Exception e)
    {
      throw e;
    }
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

  public async Task<IActionResult> GetPriortyActionStatus()
  {
    try
    {
      var models = _uow.Repository.GetEnumSelect<ActionPriorityStatus>();
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
  public async Task<object> GetCreatedBy(DataSourceLoadOptions loadOptions)
  {
    try
    {
      var model = await _uow.UserRepository.GetCreatedBy();
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


  [HttpPost]
  public async Task<string> ActionUpdate(ActionDTO model)
  {
    try
    {
      var action = await _uow.Repository.GetById<Action>(model.ID);
      action.ActionDescription = model.ActionDescription;
      action.Description = model.Description;
      action.ActionPriorityStatus = model.ActionPriorityStatus;
      action.ResponsibleID = model.ResponsibleID;
      action.OpeningDate = model.OpeningDate;
      action.EndDate = model.EndDate;
      _uow.Repository.Update(action);
      await _uow.SaveChanges();
      return "1";
    }
    catch (Exception ex)
    {
      throw ex;
    }

  }
  [HttpPost]
  public async Task<string> ActionDelete(int ID)
  {
    try
    {
      await _uow.Repository.Delete<Action>(ID);
      await _uow.SaveChanges();
      return "1";
    }

    catch (Exception ex)
    {
      throw ex;
    }
  }
  [HttpPost]
  public async Task<string> ChangeActionStatus(ActionPageDTO model)
  {
    try
    {
      var action = await _uow.Repository.GetById<Action>(model.ID);
      action.ActionStatus = model.ActionStatus;
      action.StartDate = model.StartDate;
      action.FinishDate = model.FinishDate;
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











  public async Task<string> AddActionNote([FromBody] ActionNote model)
  {
    try
    {
      await _uow.ActionNoteRepository.AddActionNote(model);
      return "1";
    }
    catch (Exception e)
    {
      throw e;
    }
  }

  public async Task<object> GetActionNoteList(DataSourceLoadOptions options,int ID)
  {
    try
    {
      var model = _uow.ActionNoteRepository.GetList(ID).ToList();
      return DataSourceLoader.Load(model, options);
    }
    catch (Exception e)
    {

      throw e;
    }
  }
  [HttpPost]
  public async Task<string> ActionNoteDelete(int ID)
  {
    try
    {
      await _uow.Repository.Delete<ActionNote>(ID);
      await _uow.SaveChanges();
      return "1";
    }
    catch (Exception e)
    {
      throw e;
    }
  }
  [HttpPost]
  public async Task<string> ActionNoteUpdate(ActionNoteDTO model)
  {
    try
    {
      var actionNote = await _uow.Repository.GetById<ActionNote>(model.ID);
      actionNote.Description = model.Description;
      actionNote.Title = model.Title;
      _uow.Repository.Update(actionNote);
      await _uow.SaveChanges();
      return "1";
    }
    catch (Exception e)
    {
      throw e;
    }
  }

}
