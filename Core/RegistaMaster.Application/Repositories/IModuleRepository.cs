using RegistaMaster.Domain.DTOModels.Entities.ModuleModel;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using Module = RegistaMaster.Domain.Entities.Module;

namespace RegistaMaster.Application.Repositories;

public interface IModuleRepository : IRepository
{
  Task<IQueryable<ModuleDTO>> GetModule();
  Task<string> CreateModule(Module model);
  Task<string> UpdateModule(Module model);
  public string DeleteModule(int ID);
  Task<List<ResponsibleDevextremeSelectListHelper>> GetProject();
  Task<string> DeleteModuleWithProjectID(int ID);
  Task<string> UpdateModule(ModuleDTO model);

}
