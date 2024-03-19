using Microsoft.AspNetCore.Mvc.Rendering;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using Action = RegistaMaster.Domain.Entities.Action;

namespace RegistaMaster.Application.Repositories;

public interface IActionRepository : IRepository
{
    IQueryable<ActionDTO> GetList();

    public Task<string> AddActions(Action model);

    public Task<string> ActionsUpdate(Action model);

    public string Delete(int ID);

    Task<ActionPageDTO> GetAction(int ID);

    public Task<List<SelectListItem>> ResponsiblehelperModelList();

    Task<List<ResponsibleDevextremeSelectListHelper>> GetRequest();
    public Task<List<SelectListItem>> ActionProrityStatusList();
}
