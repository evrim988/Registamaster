using RegistaMaster.Domain.DTOModels.Entities.VersionModel;
using Version = RegistaMaster.Domain.Entities.Version;

namespace RegistaMaster.Application.Repositories;

public interface IVersionRepository : IRepository
{
  Task<IQueryable<VersionDTO>> GetList();
  Task<string> AddVersion(VersionDTO model);
  Task<string> UpdateVersion(Version model);
  Task<string> DeleteVersion(int ID);
  Task<string> DeleteVersionWithProjectID(int ID);
  double GetVersionName(int ID);
  Task<string> UpdateVersion(VersionDTO model);
   Task<string> GetVersion(int ID);


}
