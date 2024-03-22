using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Org.BouncyCastle.Asn1.X509;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.DTOModels.Entities.ProjectModel;
using RegistaMaster.Domain.DTOModels.Entities.ProjectNoteModel;
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
         var version = new Version()
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
         uow.VersionRepository.DeleteVersionWithProjectID(ID);
         uow.ModuleRepository.DeleteModuleWithProjectID(ID);
         uow.ProjectNoteRepository.DeleteNoteWithProjectID(ID);
         await uow.Repository.Delete<Project>(ID);
         await uow.SaveChanges();
         return "1";
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }
   public IActionResult Index()
   {
      return View();
   }

   //PROJE NOTLARI İŞLEMLERİ
   public async Task<string> GetProjectNotes(int ID)
   {
      var notes = uow.Repository.GetNonDeletedAndActive<ProjectNote>(t => t.ProjectID == ID).Select(p => new ProjectNoteDTO
      {
         AddUserNote = p.AddUserNote,
         Date = p.CreatedOn,
         Description = p.Description,
         ID = p.ID,
         NoteType = p.NoteType,
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
}
