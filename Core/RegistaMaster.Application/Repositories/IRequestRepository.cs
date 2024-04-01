using Microsoft.AspNetCore.Mvc.Rendering;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.DTOModels.Entities.RequestModel;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;

namespace RegistaMaster.Application.Repositories;

public interface IRequestRepository : IRepository
{
    public Task<string> RequestAdd(Request request);
    public void Delete(int id);
    public Task<List<RequesGridDTO>> GetList();
    Task<List<ResponsibleDevextremeSelectListHelper>> GetProject();
    Task<List<ResponsibleDevextremeSelectListHelper>> GetCustomer();
    public Task<List<ResponsibleDevextremeSelectListHelper>> GetModuleSelect();
    public Task<List<ResponsibleDevextremeSelectListHelper>> GetVersionSelect();
    Task<List<ActionDTO>> GetActionDetail(int RequestId);
    public Task<string> ActionStatusChangeUpdate(int ID, ActionStatus actionStatus);
    public Task<List<SelectListItem>> NotificationTypeSelectList();
    public Task<List<SelectListItem>> CategorySelectList();
    public Task<List<SelectListItem>> GetProjectSelect();
    public Task<List<SelectListItem>> GetModule();
    public Task<List<SelectListItem>> GetModuleList(int ID);
    public Task<List<SelectListItem>> GetVersion();
    public Task<List<SelectListItem>> ResponsibleSelectList();
    public Task<List<SelectListItem>> GetVersionList(int ID);
}
