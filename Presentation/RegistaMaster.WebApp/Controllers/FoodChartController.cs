using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.Entities;
using RegistaMaster.WebApp.Filter;

namespace RegistaMaster.WebApp.Controllers;
[Auth]
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
      var result = await _uow.FoodChartRepository.AddFoodChart(values);
      return result == "1" ? Ok() : BadRequest(result);
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
      return await _uow.FoodChartRepository.UpdateFoodChart(key,values);
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
     return await _uow.FoodChartRepository.DeleteFoodChart(key);
    }
    catch (Exception e)
    {
      throw e;
    }
  }
  public async Task<object> FoodChartGraph()
  {
    return View();
  }
  [HttpPost]
  public async Task<object> FoodChartGraph(int year)
  {
    try
    {
      return JsonConvert.SerializeObject(_uow.FoodChartRepository.GetChart(year));
    }
    catch (Exception e)
    {
      throw e;
    }
  }
  [HttpPost]
  public async Task<IActionResult> UploadExcel(IFormFile file)
  {
    try
    {
      var result = await _uow.FoodChartRepository.UploadExcel(file);
      return result == "1" ? RedirectToAction(nameof(Index)) : BadRequest(result);
    }
    catch (Exception e)
    {
      throw e;
    }
  }
}
