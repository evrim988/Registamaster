using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
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


   public async Task<string> ActionsUpdate(Domain.Entities.Action model)
   {
      try
      {
         Update(model);
         await _uow.SaveChanges();
         return "1";
      }
      catch (Exception e)
      {
         throw e;
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
            ActionDescription = s.ActionDescription,
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
               Name = item.RequestSubject,
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
}
