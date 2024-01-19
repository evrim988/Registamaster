using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using RegistaMaster.Application.Repositories;

namespace RegistaMaster.WebApp.Controllers
{
    public class HealthCheckController : Controller
    {
        private readonly IUnitOfWork _uow;
        public HealthCheckController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IActionResult Index()
        {
            return View();
        }
        public async Task<object> GetList(DataSourceLoadOptions options)
        {
            var model = _uow.healthCheckRepository.GetList();
            return DataSourceLoader.Load(model, options);
        }
    }
}
