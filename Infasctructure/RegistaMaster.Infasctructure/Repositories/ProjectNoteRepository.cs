using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Persistance.RegistaMasterContextes;

namespace RegistaMaster.Infasctructure.Repositories;

public class ProjectNoteRepository : Repository, IProjectNoteRepository
{
    private readonly RegistaMasterContext registaContext;
    private readonly UnitOfWork uow;
    private readonly SessionModel session;
    public ProjectNoteRepository(RegistaMasterContext _registaContext, SessionModel _session, UnitOfWork _uow) : base(_registaContext, _session)
    {
        this.registaContext = _registaContext;
        this.uow = _uow;
        this.session = _session;
    }

    public async Task<string> ProjectNoteAdd(ProjectNote model)
    {
        try
        {
            await uow.Repository.Add(model);
            await uow.SaveChanges();
            return "";
        }
        catch (Exception e)
        {

            throw e;
        }
    }

    public void Delete(int id)
    {
        var project = GetNonDeletedAndActive<ProjectNote>(t => t.ID == id);
        DeleteRange(project.ToList());
        Delete<ProjectNote>(id);
    }

    public async Task<IQueryable<ProjectNote>> GetList()
    {
        var model = GetNonDeletedAndActive<ProjectNote>(t => true);
        return model;
    }
    public async Task<string> Update(Project model)
    {
        Update(model);
        await uow.SaveChanges();
        return "";
    }
    public async Task<List<ResponsibleDevextremeSelectListHelper>> GetProject()
    {
        try
        {
            List<ResponsibleDevextremeSelectListHelper> ResponsibleHelpers = new List<ResponsibleDevextremeSelectListHelper>();
            var model = context.Projects
                .Where(t => true);
            foreach (var item in model)
            {
                ResponsibleDevextremeSelectListHelper helper = new ResponsibleDevextremeSelectListHelper()
                {
                    ID = item.ID,
                    Name = item.ProjectName,
                };
                ResponsibleHelpers.Add(helper);
            }
            return ResponsibleHelpers;
        }
        catch (Exception e)
        {
            throw e;
        }
    }
}
