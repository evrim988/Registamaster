namespace RegistaMaster.Application.Repositories;

public interface IVersionRepository : IRepository
{
    public Task<IQueryable<Domain.Entities.Version>> GetList();
    public Task<string> AddVersion(Domain.Entities.Version model);
    public Task<string> UpdateVersion(Domain.Entities.Version model);
    public string DeleteVersion(int ID);
}
