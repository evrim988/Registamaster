using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MySqlX.XDevAPI.Relational;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.DTOModels.Entities.ActionNoteModels;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistaMaster.Persistance.RegistaMasterContextes;
using Action = RegistaMaster.Domain.Entities.Action;

namespace RegistaMaster.Infasctructure.Repositories;

public class ActionRepository : Repository, IActionRepository
{
   private readonly RegistaMasterContext _context;
   private readonly SessionModel _session;
   private readonly IUnitOfWork _uow;
   public ActionRepository(RegistaMasterContext context, SessionModel session, IUnitOfWork uow) : base(context, session)
   {
      _context = context;
      _session = session;
      _uow = uow;
   }


   public async Task<string> ActionUpdate(ActionDTO model)
   {
    try
    {
      var action = await GetById<Action>(model.ID);
      action.Subject = model.Subject;
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

   public async Task<string> AddActions(Domain.Entities.Action model)
   {
      try
      {
         var actions = await GetById<Domain.Entities.Action>(model.RequestID);
         await _uow.Repository.Add(model);
         await _uow.SaveChanges();
         return "1";
      }
      catch (Exception e)
      {
         throw e;
      }
   }

   public string Delete(int ID)
   {
      var action = GetNonDeletedAndActive((Domain.Entities.Action t) => t.ID == ID);
      DeleteRange(action.ToList());
      Delete<Domain.Entities.Action>(ID);
      return "1";
   }

   public async Task<ActionPageDTO> GetAction(int ID)
   {
      try
      {
         return await GetQueryable<Action>(t => t.ID == ID && t.ObjectStatus == ObjectStatus.NonDeleted).Select(s => new ActionPageDTO
         {
            ID = s.ID,
            Reponsible = s.Responsible.Fullname,
            OpeningDate = s.OpeningDate,
            EndDate = s.EndDate,
            Description = s.Description,
            ActionStatus = s.ActionStatus,
            RequestID = s.RequestID
         }).FirstOrDefaultAsync();
      }
      catch (Exception ex)
      {

         throw ex;
      }
   }

   public IQueryable<ActionDTO> GetList()
   {
      try
      {
         return GetQueryable<Action>(t => t.ObjectStatus == ObjectStatus.NonDeleted).Select(s => new ActionDTO()
         {
            ID = s.ID,
            Description = s.Description,
            EndDate = s.EndDate,
            OpeningDate = s.OpeningDate,
            ResponsibleID = s.ResponsibleID,
            ActionStatus = s.ActionStatus,
            Subject = s.Subject,
            RequestID = s.RequestID,
            ActionPriorityStatus = s.ActionPriorityStatus,
            CreatedBy = s.CreatedBy,
            StartDate=s.StartDate,
            CompleteDate=s.CompleteDate
         });
      }
      catch (Exception e)
      {
         throw e;
      }

   }

   public async Task<List<ResponsibleDevextremeSelectListHelper>> GetRequest()
   {
      try
      {
         List<ResponsibleDevextremeSelectListHelper> RequestHelpers = new List<ResponsibleDevextremeSelectListHelper>();
         var model = context.Requests
             .Where(t => t.ObjectStatus == ObjectStatus.NonDeleted);
         foreach (var item in model)
         {
            ResponsibleDevextremeSelectListHelper helper = new ResponsibleDevextremeSelectListHelper()
            {
               ID = item.ID,
               Name = item.Subject,
            };
            RequestHelpers.Add(helper);
         }
         return RequestHelpers;
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }

   public async Task<List<SelectListItem>> ResponsiblehelperModelList()
   {
      try
      {
         return GetNonDeletedAndActive<User>(t => true)
             .Select(s => new SelectListItem { Value = s.ID.ToString(), Text = s.Name + " " + s.Surname }).ToList();
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }

   public async Task<List<SelectListItem>> ActionProrityStatusList()
   {
      try
      {
         var list = GetEnumSelect<ActionPriorityStatus>().Select(aps => new SelectListItem
         {
            Value = aps.Id.ToString(),
            Text = aps.Text,
         });
         return list.ToList();
      }
      catch (Exception ex)
      {

         throw ex;
      }
   }

  public List<ActionDTO> GetActionsByRequestID(int ID)
  {
    try
    {
      var model = GetQueryable<Action>(t => t.RequestID == ID && t.ObjectStatus == ObjectStatus.NonDeleted).OrderByDescending(t => t.ID);

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
          Subject = item.Subject,
          LastModifiedBy = item.LastModifiedBy,
          RequestID = ID,
          CreatedOn = item.CreatedOn,
          CreatedBy = item.CreatedBy,
          StartDate = item.StartDate,
          CompleteDate = item.CompleteDate,
        };

        actionList.Add(actions);
      }
      return actionList;
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }
  public async Task<string>ChangeActionStatus(ActionPageDTO model)
  {
    try
    {
      var action = await GetById<Action>(model.ID);
      action.ActionStatus = model.ActionStatus;
      action.StartDate = model.StartDate;
      action.CompleteDate = model.CompleteDate;
      _uow.Repository.Update(action);
      await _uow.SaveChanges();

      var request = await GetById<Request>(action.RequestID);

      var requestActions = GetQueryable<Action>(t => t.RequestID == action.RequestID && t.Status == Status.Active && t.ActionStatus != ActionStatus.Completed);

      var cancelledActions = requestActions.Where(x => x.ActionStatus == ActionStatus.Cancel).Count();
      var waitingActions = requestActions.Where(x => x.ActionStatus == ActionStatus.Contiuned || x.ActionStatus == ActionStatus.notStarted).Count();

      if (cancelledActions > 0 && waitingActions == 0)
      {
        request.RequestStatus = RequestStatus.Waiting;
        _uow.Repository.Update(request);
        await _uow.SaveChanges();
        return "2";
      }

      var continuedActions = requestActions.Where(x => x.ActionStatus == ActionStatus.Contiuned).Count();

      if (request.RequestStatus != RequestStatus.Start && continuedActions > 0)
      {
        request.RequestStatus = RequestStatus.Start;
        _uow.Repository.Update(request);
        await _uow.SaveChanges();
        return "2";
      }

      if (requestActions.Count() == 0)
      {
        request.RequestStatus = RequestStatus.Closed;
        request.PlanedEndDate = DateTime.Now;
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
  public async Task<string> ActionNoteUpdate(ActionNoteDTO model)
  {
    try
    {
      var actionNote = await GetById<ActionNote>(model.ID);
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
  public async Task<string> ActionDelete(int ID)
  {
    try
    {
      var actionNotes = GetNonDeletedAndActive<ActionNote>(t => t.ActionID == ID).ToList();
      await _uow.Repository.DeleteRange(actionNotes);
      await _uow.Repository.Delete<Action>(ID);
      await _uow.SaveChanges();
      return "1";
    }

    catch (Exception ex)
    {
      throw ex;
    }
  }


}
