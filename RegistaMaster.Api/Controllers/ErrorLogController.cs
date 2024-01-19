using Microsoft.AspNetCore.Mvc;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ErrorLog;
using RegistaMaster.Domain.Entities;

namespace RegistaMaster.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ErrorLogController : BaseController
{
    private readonly IUnitOfWork _uow;
    public ErrorLogController(IUnitOfWork uow)
    {
        _uow = uow;
    }

    [HttpPost("AddErrorLog")]
    public async Task<object> AddErrorLog(ErrorLogDTO model)
    {
        try
        {
            var error = new ErrorLog()
            {
                ProjectKey = model.ProjectKey,
                NameSurname = model.NameSurname,
                ErrorDate = model.ErrorDate,
                ErrorDesc = model.ErrorDesc,
                ClientID = model.ClientID,
                MemberID = model.MemberID
            };
            await _uow.errorLogRepository.AddErrorLog(error);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
}

