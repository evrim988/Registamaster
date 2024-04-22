using Microsoft.AspNetCore.Mvc.Rendering;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ProjectModel;
using RegistaMaster.Domain.DTOModels.Entities.VersionModel;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistaMaster.Persistance.RegistaMasterContextes;

namespace RegistaMaster.Infasctructure.Repositories;

public class ProjectRepository : Repository, IProjectRepository
{
  private readonly IUnitOfWork _uow;
  private readonly SessionModel _session;
  private readonly RegistaMasterContext _context;
  public ProjectRepository(RegistaMasterContext context, SessionModel session, IUnitOfWork uow) : base(context, session)
  {
    _context = context;
    _uow = uow;
    _session = session;
  }
  public async Task<string> AddProject(Project model)
  {
    try
    {
      await _uow.Repository.Add(model);
      await _uow.SaveChanges();
      var version = new VersionDTO()
      {
        ProjectID = model.ID,
        DatabaseChange = true,
        Name = "V1.0",
      };
      await _uow.VersionRepository.AddVersion(version);
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

  public async Task<string> DeleteProject(int ID)
  {
    try
    {
      await _uow.VersionRepository.DeleteVersionWithProjectID(ID);
      await _uow.ModuleRepository.DeleteModuleWithProjectID(ID);
      await _uow.ProjectNoteRepository.DeleteNoteWithProjectID(ID);
      await _uow.Repository.Delete<Project>(ID);
      await _uow.SaveChanges();
      return "1";
    }
    catch (Exception)
    {

      throw;
    }
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

  public async Task<List<SelectListItem>> GetProjectSelect()
  {
    try
    {
      return GetNonDeletedAndActive<Project>(t => true)
          .Select(s => new SelectListItem { Value = s.ID.ToString(), Text = s.ProjectName }).ToList();
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<string> UpdateProject(ProjectDTO model)
  {
    var project = await GetById<Project>(model.ID);
    project.ProjectDescription = model.ProjectDescription;
    project.ProjectName = model.ProjectName;
    Update(project);
    await _uow.SaveChanges();
    return "1";
  }
  
}


