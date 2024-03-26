using RegistaMaster.Domain.DTOModels.Entities.ModuleModel;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using Module = RegistaMaster.Domain.Entities.Module;

namespace RegistaMaster.Application.Repositories;

public interface IModuleRepository : IRepository
{
    public Task<IQueryable<ModuleDTO>> GetModule();
    public Task<string> CreateModule(Module model);
    public Task<string> UpdateModule(Module model);
    public string DeleteModule(int ID);
    Task<List<ResponsibleDevextremeSelectListHelper>> GetProject();
   public Task<string> DeleteModuleWithProjectID(int ID);
}
