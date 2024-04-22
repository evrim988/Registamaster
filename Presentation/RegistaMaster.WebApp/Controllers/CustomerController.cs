using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.Entities;
using RegistaMaster.WebApp.Filter;

namespace RegistaMaster.WebApp.Controllers;
[Auth]
public class CustomerController : Controller
{
  private readonly IUnitOfWork _uow;
  public CustomerController(IUnitOfWork uow)
  {
    _uow = uow;
  }

  public async Task<object> GetList(DataSourceLoadOptions options)

  {
    var models = await _uow.CustomerRepository.GetList();
    return DataSourceLoader.Load(models, options);
  }
  public IActionResult Index()
  {
    return View();
  }


  public async Task<IActionResult> CustomerAdd(string values)
  {
    try
    {
      var model = JsonConvert.DeserializeObject<Customer>(values);
      await _uow.CustomerRepository.CustomerAdd(model);
      return Ok();
    }
    catch (Exception e)
    {

      throw e;
    }

  }
  [HttpPut]
  public async Task<string> CustomerEdit(int Key, string values)
  {
    try
    {
      var customer = await _uow.Repository.GetById<Customer>(Key);
      JsonConvert.PopulateObject(values, customer);
      _uow.CustomerRepository.Update(customer);
      await _uow.SaveChanges();

      return "1";
    }
    catch (Exception ex)
    {
      throw ex;
    }
  }
  public async Task<string> DeleteCustomer(int Key)
  {
    try
    {
      await _uow.Repository.Delete<Customer>(Key);
      await _uow.SaveChanges();


      return "1";

    }
    catch (Exception ex)
    {
      throw ex;
    }
  }


}

