using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ProjectModel;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistaMaster.Persistance.RegistaMasterContextes;

namespace RegistaMaster.Infasctructure.Repositories;

public class ProjectRepository : Repository, IProjectRepository
{
    private readonly RegistaMasterContext context;
    private readonly IUnitOfWork uow;
    private readonly SessionModel session;
    public ProjectRepository(RegistaMasterContext _context, SessionModel _session, IUnitOfWork _uow) : base(_context, _session)
    {
        this.context = _context;
        this.uow = _uow;
        this.session = _session;
    }
    public async Task<string> AddProject(Project model)
    {
        try
        {
            await uow.Repository.Add(model);
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
        var project = GetNonDeletedAndActive<Project>(t => t.ID == id);
        DeleteRange(project.ToList());

        Delete<Project>(id);
    }

    public async Task<IQueryable<ProjectDTO>> GetList()
    {
        try
        {
            return GetNonDeletedAndActive<Project>(t => t.ObjectStatus == ObjectStatus.NonDeleted).Select(s => new ProjectDTO()
            {
                ID = s.ID,
                ProjectName = s.ProjectName,
                ProjectDescription = s.ProjectDescription
            });
        }
        catch (Exception ex)
        {
            throw ex;
        }

    }

    public ProjectSessionModel GetProjectKey(string key)
    {
        try
        {
            return GetNonDeletedAndActive<Project>(t => t.ProjectGuid.ToString() == key).Select(s => new ProjectSessionModel()
            {
                ID = s.ID,
                Name = s.ProjectName,

            }).FirstOrDefault();
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
}


