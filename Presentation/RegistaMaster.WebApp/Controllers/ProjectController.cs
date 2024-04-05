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
  public async Task<string> AddProject(Project model)
  {
    try
    {
      return await uow.ProjectRepository.AddProject(model);
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
     return await uow.ProjectRepository.DeleteProject(ID);
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
    try
    {
      return await uow.ProjectNoteRepository.GetProjectNotes(ID);
    }
    catch (Exception e)
    {
      throw e;
    }
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
      return await uow.ProjectNoteRepository.CheckRequest(ID);
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
    try
    {
      return await uow.ModuleRepository.GetModules(ID);
    }
    catch (Exception e)
    {
      throw e;
    }
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
      return await uow.ModuleRepository.DeleteModule(ID);
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
