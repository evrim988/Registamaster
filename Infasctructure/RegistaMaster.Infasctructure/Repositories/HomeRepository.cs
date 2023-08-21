using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Persistance.RegistaMasterContextes;

namespace RegistaMaster.Infasctructure.Repositories;

public class HomeRepository : Repository, IHomeRepository
{
    private readonly RegistaMasterContext context;
    private readonly SessionModel session;
    private readonly IUnitOfWork uow;
    public HomeRepository(RegistaMasterContext _context, SessionModel _session, IUnitOfWork _uow) : base(_context, _session)
    {
        context = _context;
        session = _session;
        uow = _uow;
    }

    public async Task<IQueryable<Domain.Entities.Action>> GetActionHome()
    {
        try
        {
            var model = GetNonDeletedAndActive((Domain.Entities.Action t) => t.ResponsibleID == session.ID || t.LastModifiedBy == session.Name);
           
            return model;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public async Task<IQueryable<Domain.Entities.Task>> GetTaskHome()
    {
        try
        {
            var model = GetNonDeletedAndActive<Domain.Entities.Task>(t => t.ResponsibleID == session.ID);
            return model;
        }
        catch (Exception e)
        {
            throw e;
        }
    }
}
