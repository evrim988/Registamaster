using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.Entities;

namespace RegistaMaster.WebApp.Controllers;

public class ProjectNoteController : Controller
{
    private readonly IUnitOfWork uow;

    public ProjectNoteController(IUnitOfWork _uow)
    {
        uow = _uow;
    }
    public IActionResult Index()
    {
        return View();
    }

    public async Task<object> GetList(DataSourceLoadOptions options)

    {
        var models = await uow.ProjectNoteRepository.GetList();
        return DataSourceLoader.Load(models, options);
    }
    public async Task<IActionResult> ProjectNoteAdd(string values)
    {
        try
        {
            var model = JsonConvert.DeserializeObject<ProjectNote>(values);
            await uow.ProjectNoteRepository.ProjectNoteAdd(model);
            return Ok();
        }
        catch (Exception e)
        {

            throw e;
        }
    }
    public async Task<string> ProjectEdit(int Key, string values)
    {
        try
        {
            var size = await uow.Repository.GetById<ProjectNote>(Key);
            JsonConvert.PopulateObject(values, size);
            uow.ProjectNoteRepository.Update(size);
            await uow.SaveChanges();

            return "1";
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    public async Task<string> DeleteProject(int Key)
    {
        try
        {
            await uow.Repository.Delete<ProjectNote>(Key);
            await uow.SaveChanges();
            return "1";
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    public async Task<object> GetProject(DataSourceLoadOptions loadOptions)
    {
        try
        {
            var responsibleHelpers = await uow.ProjectNoteRepository.GetProject();
            return DataSourceLoader.Load(responsibleHelpers, loadOptions);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}
