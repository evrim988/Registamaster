using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.Entities;

namespace RegistaMaster.WebApp.Controllers;

public class CustomerController : Controller
{
  private readonly IUnitOfWork uow;
  public CustomerController(IUnitOfWork _uow)
  {
    this.uow = _uow;
  }

  public async Task<object> GetList(DataSourceLoadOptions options)

  {
    var models = await uow.CustomerRepository.GetList();
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
      await uow.CustomerRepository.CustomerAdd(model);
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
      var customer = await uow.Repository.GetById<Customer>(Key);
      JsonConvert.PopulateObject(values, customer);
      uow.CustomerRepository.Update(customer);
      await uow.SaveChanges();

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
      await uow.Repository.Delete<Customer>(Key);
      await uow.SaveChanges();


      return "1";

    }
    catch (Exception ex)
    {
      throw ex;
    }
  }


}

