using RegistaMaster.Domain.DTOModels.Entities.VersionModel;
using Version = RegistaMaster.Domain.Entities.Version;

namespace RegistaMaster.Application.Repositories;

public interface IVersionRepository : IRepository
{
  public Task<IQueryable<VersionDTO>> GetList();
  public Task<string> AddVersion(VersionDTO model);
  public Task<string> UpdateVersion(Version model);
  public Task<string> DeleteVersion(int ID);
  public Task<string> DeleteVersionWithProjectID(int ID);
  public double GetVersionName(int ID);
  public Task<string> UpdateVersion(VersionDTO model);
  public  Task<string> GetVersion(int ID);


}
