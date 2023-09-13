using Microsoft.AspNetCore.Mvc.Rendering;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;

namespace RegistaMaster.Application.Repositories;

public interface IActionRepository : IRepository
{
    IQueryable<ActionDTO> GetList();

    public Task<string> AddActions(Domain.Entities.Action model);

    public Task<string> ActionsUpdate(Domain.Entities.Action model);

    public string Delete(int ID);

    Task<ActionPageDTO> GetAction(int ID);

    public Task<List<SelectListItem>> ResponsiblehelperModelList();

    Task<List<ResponsibleDevextremeSelectListHelper>> GetRequest();
    
}
