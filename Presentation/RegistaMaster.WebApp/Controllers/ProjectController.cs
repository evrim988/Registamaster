using DevExpress.Data.Filtering;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ModuleModel;
using RegistaMaster.Domain.DTOModels.Entities.ProjectModel;
using RegistaMaster.Domain.DTOModels.Entities.ProjectNoteModel;
using RegistaMaster.Domain.DTOModels.Entities.VersionModel;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using Version = RegistaMaster.Domain.Entities.Version;

namespace RegistaMaster.WebApp.Controllers;

public class ProjectController : Controller
{
  private readonly IUnitOfWork uow;
  public ProjectController(IUnitOfWork _uow)
  {
    uow = _uow;
  }

  //PROJE
  public async Task<object> GetList(DataSourceLoadOptions options)

  {
    var models = await uow.ProjectRepository.GetList();
    return DataSourceLoader.Load(models, options);
  }
  public async Task<IActionResult> AddProject(Project model)
  {
    try
    {
      var projectID = await uow.ProjectRepository.AddProject(model);
      var version = new VersionDTO()
      {
        ProjectID = projectID,
        DatabaseChange = true,
        Name = "V1.0",
      };
      await uow.VersionRepository.AddVersion(version);
      return Ok();
    }
    catch (Exception e)
    {

      throw e;
    }

  }
  public async Task<string> ProjectEdit(ProjectDTO model)
  {
    try
    {
      return await uow.ProjectRepository.UpdateProject(model);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }
  public async Task<string> DeleteProject(int ID)
  {
    try
    {
      await uow.VersionRepository.DeleteVersionWithProjectID(ID);
      await uow.ModuleRepository.DeleteModuleWithProjectID(ID);
      await uow.ProjectNoteRepository.DeleteNoteWithProjectID(ID);
      await uow.Repository.Delete<Project>(ID);
      await uow.SaveChanges();
      return "1";
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }
  public async Task<IActionResult> Index()
  {
    ViewBag.CreatedBy = uow.ProjectNoteRepository.CreatedBySelectList();
    var model = new ProjectDTO();
    model.Project = await uow.ProjectRepository.GetProjectSelect();
    return View(model);
  }

  //PROJE NOTLARI İŞLEMLERİ
  public async Task<string> GetProjectNotes(int ID)
  {
    var notes = uow.Repository.GetNonDeletedAndActive<ProjectNote>(t => t.ProjectID == ID).Select(p => new ProjectNoteDTO
    {
      Date = p.CreatedOn,
      Description = p.Description,
      ID = p.ID,
      NoteType = p.NoteType,
      CreatedBy = p.CreatedBy,
    });

    return JsonConvert.SerializeObject(notes);
  }

  public async Task<string> AddProjectNote(ProjectNote model)
  {
    try
    {
      return await uow.ProjectNoteRepository.ProjectNoteAdd(model);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<string> EditProjectNote(ProjectNoteDTO model)
  {
    try
    {
      return await uow.ProjectNoteRepository.UpdateProjectNote(model);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }
  public async Task<string> DeleteProjectNote(int ID)
  {
    try
    {
      await uow.Repository.Delete<ProjectNote>(ID);
      await uow.SaveChanges();
      return "1";
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<string> CheckRequest(int ID)
  {
    try
    {
      if (uow.Repository.GetNonDeletedAndActive<Request>(t => t.ProjectID == ID && t.RequestStatus != RequestStatus.Closed).Count() != 0)
        return "-1";
      return "1";
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

  public async Task<object> GetCreatedBy(DataSourceLoadOptions loadOptions)
  {
    try
    {
      var model = await uow.UserRepository.GetCreatedBy();
      return DataSourceLoader.Load(model, loadOptions);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }


  //MODULE İŞLEMLERİ
  public async Task<string> AddModule(Module model)
  {
    try
    {
      return await uow.ModuleRepository.CreateModule(model);
    }
    catch (Exception e)
    {

      throw e;
    }
  }
  public async Task<string> GetModules(int ID)
  {
    var module = uow.Repository.GetNonDeletedAndActive<Module>(t => t.ProjectID == ID).Select(p => new ModuleDTO
    {
      ID = p.ID,
      Name = p.Name,
      Description = p.Description,
      ProjectID = p.ProjectID,
    });
    return JsonConvert.SerializeObject(module);
  }
  public async Task<string> EditModule(ModuleDTO model)
  {
    try
    {
      return await uow.ModuleRepository.UpdateModule(model);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }
  public async Task<string> DeleteModule(int ID)
  {
    try
    {
      await uow.Repository.Delete<Module>(ID);
      await uow.SaveChanges();
      return "1";
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }


  //VERSİYON İŞLEMLERİ
  public async Task<string> AddVersion(VersionDTO model)
  {
    try
    {
      return await uow.VersionRepository.AddVersion(model);
    }
    catch (Exception e)
    {

      throw e;
    }
  }
  public async Task<string> GetVersion(int ID)
  {
    try
    {
      return await uow.VersionRepository.GetVersion(ID);
    }
    catch (Exception)
    {
      throw;
    }
  }
  public async Task<string> EditVersion(VersionDTO model)
  {
    try
    {
      return await uow.VersionRepository.UpdateVersion(model);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }
  public async Task<string> DeleteVersion(int ID)
  {
    try
    {
     return await uow.VersionRepository.DeleteVersion(ID);
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }

}
