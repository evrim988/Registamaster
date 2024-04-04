using Microsoft.AspNetCore.Mvc.Rendering;
using RegistaMaster.Domain.DTOModels.Entities.ProjectModel;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;

namespace RegistaMaster.Application.Repositories;

public interface IProjectRepository : IRepository
{
    public Task<int> AddProject(Project model);
   public Task<string> UpdateProject(ProjectDTO model);
    public void Delete(int id);
    public Task<IQueryable<ProjectDTO>> GetList();
    ProjectSessionModel GetProjectKey(string key);
  public Task<List<SelectListItem>> GetProjectSelect();

}
