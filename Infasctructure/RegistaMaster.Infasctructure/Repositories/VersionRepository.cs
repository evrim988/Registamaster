using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Enums;
using RegistaMaster.Persistance.RegistaMasterContextes;

namespace RegistaMaster.Infasctructure.Repositories;

public class VersionRepository : Repository, IVersionRepository
{
    private readonly IUnitOfWork _uow;
    private readonly SessionModel _session;
    private readonly RegistaMasterContext _context;
    public VersionRepository(RegistaMasterContext context, SessionModel session, IUnitOfWork uow) : base(context, session)
    {
        _uow = uow;
        _session = session;
        _context = context;
    }

    public async Task<string> AddVersion(Domain.Entities.Version model)
    {
        try
        {
            await _uow.Repository.Add(model);
            await _uow.SaveChanges();
            return "";
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public Task<string> AddVersion(Version model)
    {
        throw new NotImplementedException();
    }

    public string DeleteVersion(int ID)
    {
        var version = GetNonDeletedAndActive<Domain.Entities.Version>(t => t.ID == ID);
        DeleteRange(version.ToList());
        Delete<Domain.Entities.Version>(ID);
        return "";
    }

    public async Task<IQueryable<Domain.Entities.Version>> GetList()
    {
        var model = GetNonDeletedAndActive<Domain.Entities.Version>(t => t.ObjectStatus == ObjectStatus.NonDeleted && t.Status == Status.Active);
        return model;
    }

    public async Task<string> UpdateVersion(Domain.Entities.Version model)
    {
        Update(model);
        await _uow.SaveChanges();
        return "";
    }
}
