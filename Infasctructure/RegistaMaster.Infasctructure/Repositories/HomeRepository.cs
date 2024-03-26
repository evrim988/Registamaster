using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.ChartModels;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistaMaster.Persistance.RegistaMasterContextes;
using Action = RegistaMaster.Domain.Entities.Action;

namespace RegistaMaster.Infasctructure.Repositories;

public class HomeRepository : Repository, IHomeRepository
{
   private readonly RegistaMasterContext _context;
   private readonly SessionModel session;
   private readonly IUnitOfWork uow;
   public HomeRepository(RegistaMasterContext _context, SessionModel _session, IUnitOfWork _uow) : base(_context, _session)
   {
      _context = context;
      session = _session;
      uow = _uow;
   }


   public async Task<List<ActionDTO>> GetActionDtoHome()
   {
      try
      {
         var model = GetQueryable<Action>(t => (t.ResponsibleID == session.ID || t.CreatedBy == session.ID) && t.ObjectStatus == ObjectStatus.NonDeleted).Select(s => new ActionDTO()
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
            LastModifiedBy = s.LastModifiedBy,
            CreatedBy = s.CreatedBy,
            CreatedOn=s.CreatedOn,
            StartDate=s.StartDate,
            CompleteDate=s.CompleteDate
         }).OrderBy(s => s.ID).ToList();

         return model;
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }

   public async Task<ChartDTO> AdminChart()
   {
      try
      {
         var chart = new ChartDTO();
         var requests = GetNonDeletedAndActive<Request>(t => true);
         chart.RequestOpen = requests.Where(t => t.RequestStatus == RequestStatus.Open).Count();
         chart.RequestStart = requests.Where(t => t.RequestStatus == RequestStatus.Start).Count();
         chart.RequestClosed = requests.Where(t => t.RequestStatus == RequestStatus.Closed).Count();

         var actions = GetQueryable<Action>(t => t.ObjectStatus == ObjectStatus.NonDeleted);
         chart.ActionNotStarted = actions.Where(t => t.ActionStatus == ActionStatus.notStarted).Count();
         chart.ActionContinued = actions.Where(t => t.ActionStatus == ActionStatus.Contiuned).Count();
         chart.ActionCompleted = actions.Where(t => t.ActionStatus == ActionStatus.Completed).Count();
         chart.ActionCancel = actions.Where(t => t.ActionStatus == ActionStatus.Cancel).Count();

         //var users = GetNonDeletedAndActive<User>(t => t.AuthorizationStatus != AuthorizationStatus.Admin).Select(s => new UserChartDTO()
         //{
         //   NotStarted = actions.Where(t => t.ActionStatus == ActionStatus.notStarted && t.ResponsibleID == s.ID).Count(),
         //   Continued = actions.Where(t => t.ActionStatus == ActionStatus.Contiuned && t.ResponsibleID == s.ID).Count(),
         //   Completed = actions.Where(t => t.ActionStatus == ActionStatus.Completed && t.ResponsibleID == s.ID).Count(),
         //   Cancel = actions.Where(t => t.ActionStatus == ActionStatus.Cancel && t.ResponsibleID == s.ID).Count(),
         //   UserFullName = s.Fullname
         //}).ToList();

         //chart.UserChartDTO = users;

         return chart;
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }

   public async Task<List<UserChartDTO>> AdminChartUserActions()
   {
      try
      {
         var actions = GetQueryable<Action>(t => t.ObjectStatus == ObjectStatus.NonDeleted);
         var users = GetNonDeletedAndActive<User>(t => t.AuthorizationStatus != AuthorizationStatus.Admin).Select(s => new UserChartDTO()
         {
            NotStarted = actions.Where(t => t.ActionStatus == ActionStatus.notStarted && t.ResponsibleID == s.ID).Count(),
            Continued = actions.Where(t => t.ActionStatus == ActionStatus.Contiuned && t.ResponsibleID == s.ID).Count(),
            Completed = actions.Where(t => t.ActionStatus == ActionStatus.Completed && t.ResponsibleID == s.ID).Count(),
            Cancel = actions.Where(t => t.ActionStatus == ActionStatus.Cancel && t.ResponsibleID == s.ID).Count(),
            UserFullName = s.Fullname
         }).ToList();

         return users;
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }


   public async Task<ChartDTO> TeamLeaderChart(int ID)
   {
      try
      {
         var chart = new ChartDTO();
         var requests = GetNonDeletedAndActive<Request>(t => t.CreatedBy == ID);
         chart.RequestOpen = requests.Where(t => t.RequestStatus == RequestStatus.Open).Count();
         chart.RequestStart = requests.Where(t => t.RequestStatus == RequestStatus.Start).Count();
         chart.RequestClosed = requests.Where(t => t.RequestStatus == RequestStatus.Closed).Count();

         var actions = GetQueryable<Action>(t => t.ObjectStatus == ObjectStatus.NonDeleted && t.CreatedBy == ID);
         chart.ActionNotStarted = actions.Where(t => t.ActionStatus == ActionStatus.notStarted).Count();
         chart.ActionContinued = actions.Where(t => t.ActionStatus == ActionStatus.Contiuned).Count();
         chart.ActionCompleted = actions.Where(t => t.ActionStatus == ActionStatus.Completed).Count();
         chart.ActionCancel = actions.Where(t => t.ActionStatus == ActionStatus.Cancel).Count();

         var userActions = GetQueryable<Action>(t => t.ObjectStatus == ObjectStatus.NonDeleted && t.ResponsibleID == ID);
         var user = new UserChartDTO()
         {
            NotStarted = userActions.Where(t => t.ActionStatus == ActionStatus.notStarted).Count(),
            Continued = userActions.Where(t => t.ActionStatus == ActionStatus.Contiuned).Count(),
            Completed = userActions.Where(t => t.ActionStatus == ActionStatus.Completed).Count(),
            Cancel = userActions.Where(t => t.ActionStatus == ActionStatus.Cancel).Count(),
         };

         chart.UserChartDTO = user;

         return chart;
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }

   public async Task<UserChartDTO> DeveloperChart(int ID)
   {
      try
      {
         var userActions = GetQueryable<Action>(t => t.ObjectStatus == ObjectStatus.NonDeleted && t.ResponsibleID == ID);
         var user = new UserChartDTO()
         {
            NotStarted = userActions.Where(t => t.ActionStatus == ActionStatus.notStarted).Count(),
            Continued = userActions.Where(t => t.ActionStatus == ActionStatus.Contiuned).Count(),
            Completed = userActions.Where(t => t.ActionStatus == ActionStatus.Completed).Count(),
            Cancel = userActions.Where(t => t.ActionStatus == ActionStatus.Cancel).Count(),
         };

         return user;
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }

}
