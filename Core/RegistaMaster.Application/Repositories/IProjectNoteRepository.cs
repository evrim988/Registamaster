using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using RegistaMaster.Domain.Entities;

namespace RegistaMaster.Application.Repositories;

public interface IProjectNoteRepository : IRepository
{
    public Task<string> ProjectNoteAdd(ProjectNote projectNote);
    public void Delete(int id);
    public Task<IQueryable<ProjectNote>> GetList();
    Task<List<ResponsibleDevextremeSelectListHelper>> GetProject();
}
