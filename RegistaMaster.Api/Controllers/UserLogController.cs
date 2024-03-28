using Microsoft.AspNetCore.Mvc;
using RegistaMaster.Api.Filters;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Application.Services.SecurityService;
using RegistaMaster.Domain.DTOModels.Entities.UserLogModel;
using RegistaMaster.Domain.Entities;

namespace RegistaMaster.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserLogController : BaseController
{
    private readonly IUnitOfWork _uow;
    public UserLogController(IUnitOfWork uow)
    {
        _uow = uow;
    }

    [HttpPost("AddUserLog")]
    public async Task<IActionResult> AddUserLog(UserLogDTO model)
     {
        try
        {
            var Log = new UserLog()
            {
                NameSurname = model.NameSurname,
                LoginDate = model.LoginDate,
                ClientID = model.ClientID,
                MemberID = model.MemberID
            };
            await _uow.UserLogRepository.AddUserLog(Log);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
        
    }

}

