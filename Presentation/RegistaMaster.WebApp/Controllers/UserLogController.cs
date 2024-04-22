using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using RegistaMaster.Application.Repositories;
using RegistaMaster.WebApp.Filter;

namespace RegistaMaster.WebApp.Controllers;
[Auth]
public class UserLogController : Controller
  {

      private readonly IUnitOfWork _uow;
      public UserLogController(IUnitOfWork uow)
      {
          _uow = uow;
      }

      public IActionResult Index()
      {
          return View();
      }
      public async Task<object> GetList(DataSourceLoadOptions options)
      {
          var model = _uow.UserLogRepository.GetList();
          return DataSourceLoader.Load(model, options);
      }
  }
