using Microsoft.AspNetCore.Mvc.Rendering;
using RegistaMaster.Domain.DTOModels.Entities.ProjectModel;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;

namespace RegistaMaster.Application.Repositories;

public interface IProjectRepository : IRepository
{
  Task<string> AddProject(Project model);
  Task<string> UpdateProject(ProjectDTO model);
  void Delete(int ID);
  Task<IQueryable<ProjectDTO>> GetList();
  ProjectSessionModel GetProjectKey(string key);
  Task<List<SelectListItem>> GetProjectSelect();
  Task<string> DeleteProject(int ID);

}
