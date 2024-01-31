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
using Version = RegistaMaster.Domain.Entities.Version;

namespace RegistaMaster.Infasctructure.Repositories;

public class RequestRepository : Repository, IRequestRepository
{
    private readonly RegistaMasterContext context;
    private readonly UnitOfWork uow;
    private readonly SessionModel session;
    public RequestRepository(RegistaMasterContext _context, SessionModel _session, UnitOfWork _uow) : base(_context, _session)
    {
        context = _context;
        uow = _uow;
        session = _session;
    }

    public async Task<string> RequestAdd(Request model)
    {
        try
        {
            model.StartDate = DateTime.Now;
            model.PlanedEndDate = model.StartDate.AddDays(7);
            model.RequestStatus = RequestStatus.Open;
            await uow.Repository.Add(model);
            await uow.SaveChanges();
            return "";
        }
        catch (Exception e)
        {

            throw e;
        }

    }
    public async Task<string> Update(Request model)
    {
        Update(model);
        await uow.SaveChanges();
        return "";
    }
    public void Delete(int id)
    {
        var request = GetNonDeletedAndActive<Request>(t => t.ID == id);
        DeleteRange(request.ToList());

        Delete<Request>(id);
    }
    public async Task<IQueryable<Request>> GetList()
    {
        var model = GetNonDeletedAndActive<Request>(t => t.ObjectStatus == ObjectStatus.NonDeleted).OrderByDescending(s=>s.ID);
        return model;
    }
    public async Task<List<ResponsibleDevextremeSelectListHelper>> GetProject()
    {
        try
        {
            List<ResponsibleDevextremeSelectListHelper> ResponsibleHelpers = new List<ResponsibleDevextremeSelectListHelper>();
            var model = context.Projects
                .Where(t => t.ObjectStatus == ObjectStatus.NonDeleted);
            foreach (var item in model)
            {
                ResponsibleDevextremeSelectListHelper helper = new ResponsibleDevextremeSelectListHelper()
                {
                    ID = item.ID,
                    Name = item.ProjectName,
                };
                ResponsibleHelpers.Add(helper);
            }
            return ResponsibleHelpers;
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async Task<List<ResponsibleDevextremeSelectListHelper>> GetCustomer()
    {
        try
        {
            List<ResponsibleDevextremeSelectListHelper> CustomerHelpers = new List<ResponsibleDevextremeSelectListHelper>();
            var model = context.Customers
                .Where(t => true);
            foreach (var item in model)
            {
                ResponsibleDevextremeSelectListHelper helper = new ResponsibleDevextremeSelectListHelper()
                {
                    ID = item.ID,
                    Name = item.Name,
                };
                CustomerHelpers.Add(helper);
            }
            return CustomerHelpers;
        }
        catch (Exception)
        {

            throw;
        }
    }
    public async Task<List<ActionDTO>> GetActionDetail(int RequestId)
    {
        var model =  await GetNonDeletedAndActive<Action>(t => t.RequestID == RequestId).Select(s => new ActionDTO()
        {
            ID = s.ID,
            Description = s.Description,
            EndDate = s.EndDate,
            OpeningDate = s.OpeningDate,
            ResponsibleID = s.ResponsibleID,
            ActionStatus = s.ActionStatus,
            ActionDescription = s.ActionDescription,
            LastModifiedBy = s.LastModifiedBy,
            RequestID = RequestId,
            CreatedOn = s.CreatedOn,
        }).ToListAsync();

        
        return model; 
    }

    public async Task<List<ResponsibleDevextremeSelectListHelper>> GetModuleSelect()
    {
        try
        {
            List<ResponsibleDevextremeSelectListHelper> ModulesHelpers = new List<ResponsibleDevextremeSelectListHelper>();
            var model = context.Modules
                .Where(t => t.ObjectStatus == ObjectStatus.NonDeleted);
            foreach (var item in model)
            {
                ResponsibleDevextremeSelectListHelper helper = new ResponsibleDevextremeSelectListHelper()
                {
                    ID = item.ID,
                    Name = item.Name,
                };
                ModulesHelpers.Add(helper);
            }
            return ModulesHelpers;
        }
        catch (Exception)
        {

            throw;
        }
    }

    public async Task<List<SelectListItem>> NotificationTypeSelectList()
    {
        List<SelectListItem> notificationTypeSelectList = new()
            {
                new SelectListItem { Value = "0", Text = "Hata" },
                new SelectListItem { Value = "1" , Text = "Öneri"}
            };
        return notificationTypeSelectList;

    }

    public async Task<List<SelectListItem>> CategorySelectList()
    {
        List<SelectListItem> categorySelectList = new()
            {
                new SelectListItem { Value = "0" , Text = "Sınıflandırılmamış" },
                new SelectListItem { Value = "1" , Text = "Yeni Fonksiyon"},
                new SelectListItem { Value = "2" , Text = "Hata Giderme"},
                new SelectListItem { Value = "3" , Text = "Veri Düzeltme"},
                new SelectListItem { Value = "4" , Text = "Uyumluluk"}
            };
        return categorySelectList;
    }

    public async Task<List<ResponsibleDevextremeSelectListHelper>> GetVersionSelect()
    {
        try
        {
            List<ResponsibleDevextremeSelectListHelper> ModulersHelpers = new List<ResponsibleDevextremeSelectListHelper>();
            var model = context.Versions
                .Where(t => true);
            foreach (var item in model)
            {
                ResponsibleDevextremeSelectListHelper helper = new ResponsibleDevextremeSelectListHelper()
                {
                    ID = item.ID,
                    Name = item.Name,
                };
                ModulersHelpers.Add(helper);
            }
            return ModulersHelpers;
        }
        catch (Exception)
        {

            throw;
        }
    }

    public async Task<string> ActionStatusChangeUpdate(int ID, ActionStatus actionStatus)
    {
        try
        {
            var model = await uow.Repository.GetById<Action>(ID);
            model.ActionStatus = actionStatus;
            Update(model);
            await uow.SaveChanges();
            return "1";
        }  
        catch (Exception e)
        {
            throw e;
        }
        

    }

    public async Task<List<SelectListItem>> GetProjectSelect()
    {
        try
        {
            return GetNonDeletedAndActive<Project>(t => true)
                .Select(s => new SelectListItem { Value = s.ID.ToString(), Text = s.ProjectName }).ToList();
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public async Task<List<SelectListItem>> GetModule()
    {
        try
        {
            return GetNonDeletedAndActive<Module>(t => true)
                .Select(s => new SelectListItem { Value = s.ID.ToString(), Text = s.Name }).ToList();
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public async Task<List<SelectListItem>> GetVersion()
    {
        try
        {
            return GetNonDeletedAndActive<Version>(t=>true)
                .Select(s=>new SelectListItem { Value=s.ID.ToString(), Text=s.Name }).ToList();
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
  

    public async Task<List<SelectListItem>> GetModuleList(int ID)
    {
        return GetNonDeletedAndActive<Module>(t => t.ProjectID == ID && t.ObjectStatus == ObjectStatus.NonDeleted)
                .Select(s => new SelectListItem { Value = s.ID.ToString(), Text = s.Name }).ToList();
    }


}
