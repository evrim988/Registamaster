using Microsoft.AspNetCore.Mvc;
using RegistaMaster.Api.Filters;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Application.Services.SecurityService;
using RegistaMaster.Domain.DTOModels.Entities.RequestModel;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using Request = RegistaMaster.Domain.Entities.Request;

namespace RegistaMaster.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RequestController : ControllerBase
{
    private readonly IUnitOfWork _uow;
    private readonly ProjectSessionModel projectSession;

    public RequestController(IUnitOfWork uow, ISessionService sessionService)
    {
        _uow = uow;
        projectSession = sessionService.GetProject();
    }
    [HttpPost("AddRequest")]
    [Auth]
    public async Task<IActionResult> AddRequest(RequestDTO model)
    {
        try
        {
            var request = new Request()
            {
                RequestSubject = model.RequestName,
                Description = model.Description,
                CustomerID = model.CustomerID,
                ProjectID = projectSession.ID,
                Category = "Sınıflandırılmamış"
            };

            await _uow.RequestRepository.RequestAdd(request);
            return Ok();

        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
}
