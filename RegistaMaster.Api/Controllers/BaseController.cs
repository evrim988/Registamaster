using Microsoft.AspNetCore.Mvc;
using RegistaMaster.Domain.Exceptions;

namespace RegistaMaster.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BaseController : Controller
{
    protected IActionResult ErrorHandler(Exception error)
    {
        if (error is UnAuth)
            return Unauthorized(error.Message);
        if (error is CustomEx)
            return BadRequest(error.Message);
        else
            return BadRequest("Beklenmeyen Bir Hata Oluştu");
    }
}
