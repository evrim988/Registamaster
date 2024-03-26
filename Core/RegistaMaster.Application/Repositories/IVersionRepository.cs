using RegistaMaster.Domain.Entities;
using Version = RegistaMaster.Domain.Entities.Version;

namespace RegistaMaster.Application.Repositories;

public interface IVersionRepository : IRepository
{
  public Task<IQueryable<Version>> GetList();
  public Task<string> AddVersion(Version model);
  public Task<string> UpdateVersion(Version model);
  public string DeleteVersion(int ID);
  public Task<string> DeleteVersionWithProjectID(int ID);
  public double GetVersionName(int ID);
}
