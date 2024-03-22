using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using Version = RegistaMaster.Domain.Entities.Version;

namespace RegistaMaster.WebApp.Controllers;

public class DefinationController : Controller
{
   private readonly IUnitOfWork _uow;
   public DefinationController(IUnitOfWork uow)
   {
      _uow = uow;
   }
   public IActionResult Index()
   {
      return View();
   }
   [HttpGet]
   public async Task<object> GetModules(DataSourceLoadOptions options)
   {
      try
      {
         var model = await _uow.ModuleRepository.GetModule();
         return DataSourceLoader.Load(model, options);
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }

   public async Task<IActionResult> AddModules(string values)
   {
      try
      {
         var model = JsonConvert.DeserializeObject<Module>(values);
         await _uow.ModuleRepository.CreateModule(model);
         return Ok();
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }

   public async Task<IActionResult> ModuleUpdate(int key, string values)
   {
      try
      {
         var model = await _uow.Repository.GetById<Module>(key);
         JsonConvert.PopulateObject(values, model);
         await _uow.ModuleRepository.UpdateModule(model);
         await _uow.SaveChanges();
         return Ok();
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }

   public async Task<object> DeleteModule(int key)
   {
      try
      {
         await _uow.Repository.Delete<Module>(key);
         await _uow.SaveChanges();
         return Ok();
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }

   public async Task<object> GetVersion(DataSourceLoadOptions loadOptions)
   {
      try
      {
         var model = await _uow.VersionRepository.GetList();
         return DataSourceLoader.Load(model, loadOptions);
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }

   public async Task<IActionResult> AddVersion(string values)
   {
      try
      {
         var model = JsonConvert.DeserializeObject<Version>(values);
         var olderVersion = _uow.VersionRepository.GetVersionName(model.ProjectID);
         model.Name = "V"+(olderVersion + 0.1).ToString(".#").Replace(',', '.');
         await _uow.VersionRepository.AddVersion(model);
         return Ok();
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }

   public async Task<IActionResult> UpdateVersion(int key, string values)
   {
      try
      {
         var model = await _uow.Repository.GetById<Version>(key);
         JsonConvert.PopulateObject(values, model);
         await _uow.VersionRepository.UpdateVersion(model);
         await _uow.SaveChanges();
         return Ok();
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }

   public async Task<object> DeleteVersion(int key)
   {
      try
      {
         await _uow.Repository.Delete<Version>(key);
         await _uow.SaveChanges();
         return Ok();
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }

   public async Task<IActionResult> GetDatabaseStatus()
   {
      try
      {
         var model = _uow.Repository.GetEnumSelect<DatabaseChangeStatus>();
         var resultjson = JsonConvert.SerializeObject(model);
         return Content(resultjson, "application/json");
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }

   public async Task<object> GetProject(DataSourceLoadOptions options)
   {
      var model = await _uow.ModuleRepository.GetProject();
      return DataSourceLoader.Load(model, options);
   }
}
