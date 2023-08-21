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

public class RequestRepository : Repository, IRequestRepository
{
    private readonly RegistaMasterContext context;
    private readonly UnitOfWork uow;
    private readonly SessionModel session;
    public RequestRepository(RegistaMasterContext _context, SessionModel _session, UnitOfWork _uow) : base(_context, _session)
    {
        this.context = _context;
        this.uow = _uow;
        this.session = _session;
    }

    public async Task<string> RequestAdd(Request model)
    {
        try
        {
            model.CustomerID = session.CustomerID;
            model.StartDate = DateTime.Now;
            model.PlanedEndDate = model.StartDate.AddDays(7);
            model.RequestStatus = RequestStatus.NotStart;
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
        var model = GetNonDeletedAndActive<Request>(t => true);
        return model;
    }
    public async Task<List<ResponsibleDevextremeSelectListHelper>> GetProject()
    {
        try
        {
            List<ResponsibleDevextremeSelectListHelper> ResponsibleHelpers = new List<ResponsibleDevextremeSelectListHelper>();
            var model = context.Projects
                .Where(t => true);
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
        return await GetNonDeletedAndActive<Action>(t => t.RequestID == RequestId).Select(s => new ActionDTO()
        {
            ID = s.ID,
            Description = s.Description,
            EndDate = s.EndDate,
            OpeningDate = s.OpeningDate,
            ResponsibleID = s.ResponsibleID,
            ActionStatus = s.ActionStatus,
            ActionDescription = s.ActionDescription

        }).ToListAsync();

    }

    public async Task<List<ResponsibleDevextremeSelectListHelper>> GetModuleSelect()
    {
        try
        {
            List<ResponsibleDevextremeSelectListHelper> ModulersHelpers = new List<ResponsibleDevextremeSelectListHelper>();
            var model = context.Modules
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
}
