using Microsoft.AspNetCore.Mvc.Rendering;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using RegistaMaster.Domain.Entities;

namespace RegistaMaster.Application.Repositories;

public interface IRequestRepository : IRepository
{
    public Task<string> RequestAdd(Request request);
    public void Delete(int id);
    public Task<IQueryable<Request>> GetList();
    Task<List<ResponsibleDevextremeSelectListHelper>> GetProject();
    Task<List<ResponsibleDevextremeSelectListHelper>> GetCustomer();
    public Task<List<ResponsibleDevextremeSelectListHelper>> GetModuleSelect();
    Task<List<ActionDTO>> GetActionDetail(int RequestId);
    public Task<List<SelectListItem>> NotificationTypeSelectList();
    public Task<List<SelectListItem>> CategorySelectList();
}
