using Microsoft.AspNetCore.Mvc;
using RegistaMaster.Api.Filters;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Application.Services.SecurityService;
using RegistaMaster.Domain.DTOModels.Entities.RequestModel;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using Request = RegistaMaster.Domain.Entities.Request;

namespace RegistaMaster.Api.Controllers;

[Route("[controller]")]
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
    public async Task<IActionResult> AddRequest(RegistaTicketCreateDto model)
    {
        try
        {

            var request = new Request()
            {
                NotificationTypeCNC = model.TicketType,
                RequestSubject = model.TicketTitle,
                Description = model.TicketContent,
                PictureURL = model.Image,
                PageURL = model.PageUrl,
                Category = "Sınıflandırılmamış",
                ProjectID = 2,
                
            };

            await _uow.RequestRepository.RequestAdd(request);
            return Ok(request);

        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
}
