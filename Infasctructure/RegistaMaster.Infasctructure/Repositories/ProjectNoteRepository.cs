using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ProjectNoteModel;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
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
            model.AddUserNote = session.FullName;
            model.Date = DateTime.Now;
            await uow.SaveChanges();
            return "1";
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

    public async Task<IQueryable<ProjectNoteDTO>> GetList()
    {
        try
        {
            return GetNonDeletedAndActive<ProjectNote>(t => t.ObjectStatus == ObjectStatus.NonDeleted).Select(s => new ProjectNoteDTO()
            {
                ID = s.ID,
                Date = s.Date,
                Description = s.Description,
                NoteType = s.NoteType,
                AddUserNote = s.AddUserNote
            });
        }
        catch (Exception ex)
        {
            throw ex;
        }
        
    }
    public async Task<string> Update(Project model)
    {
        Update(model);
        await uow.SaveChanges();
        return "1";
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
