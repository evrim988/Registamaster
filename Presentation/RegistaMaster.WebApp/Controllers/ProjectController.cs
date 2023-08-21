using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.Entities;

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
    public async Task<IActionResult> AddProject(string values)
    {
        try
        {
            var model = JsonConvert.DeserializeObject<Project>(values);
            await uow.ProjectRepository.AddProject(model);
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
            var size = await uow.Repository.GetById<Project>(Key);
            JsonConvert.PopulateObject(values, size);
            uow.ProjectRepository.Update(size);
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
            await uow.Repository.Delete<Project>(Key);
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

}
