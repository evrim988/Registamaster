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
  private readonly IUnitOfWork _uow;
  private readonly SessionModel _session;
  private readonly RegistaMasterContext _context;
  public HomeRepository(RegistaMasterContext context, SessionModel session, IUnitOfWork uow) : base(context, session)
  {
    _uow = uow;
    _context = context;
    _session = session;
  }


  public async Task<List<ActionDTO>> GetActionDtoHome()
  {
    try
    {
      var model = GetQueryable<Action>(t => (t.ResponsibleID == _session.ID || t.CreatedBy == _session.ID) && t.ObjectStatus == ObjectStatus.NonDeleted).Select(s => new ActionDTO()
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
        LastModifiedBy = s.LastModifiedBy,
        CreatedBy = s.CreatedBy,
        StartDate = s.StartDate,
        CompleteDate = s.CompleteDate
      }).OrderByDescending(s => s.ID).ToList();

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
      chart.RequestWaiting = requests.Where(t => t.RequestStatus == RequestStatus.Waiting).Count();

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
      chart.RequestWaiting = requests.Where(t => t.RequestStatus == RequestStatus.Waiting).Count();

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
