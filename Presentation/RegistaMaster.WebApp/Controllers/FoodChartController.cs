using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.Entities;

namespace RegistaMaster.WebApp.Controllers
{
  public class FoodChartController : Controller
  {
    private readonly IUnitOfWork _uow;

    public FoodChartController(IUnitOfWork uow)
    {
      _uow = uow;
    }

    public IActionResult Index()
    {
      return View();
    }
    public async Task<object> GetList(DataSourceLoadOptions options)
    {
      var models = _uow.FoodChartRepository.GetList();
      return DataSourceLoader.Load(models, options);
    }
    public async Task<IActionResult> FoodChartAdd(string values)
    {
      try
      {
        var model = JsonConvert.DeserializeObject<FoodChart>(values);
        await _uow.FoodChartRepository.AddFoodChart(model);
        return Ok();
      }
      catch (Exception e)
      {

        throw e;
      }
    }
    public async Task<string> FoodChartEdit(int key, string values)
    {
      try
      {
        var model = await _uow.FoodChartRepository.GetById<FoodChart>(key);
        JsonConvert.PopulateObject(values, model);
        _uow.FoodChartRepository.Update(model);
        await _uow.SaveChanges();
        return "1";
      }
      catch (Exception e)
      {
        throw e;
      }
    }
    public async Task<string> FoodChartDelete(int key)
    {
      try
      {
        await _uow.FoodChartRepository.Delete<FoodChart>(key);
        await _uow.SaveChanges();
        return "1";
      }
      catch (Exception e)
      {

        throw e;
      }
    }
  }
}
