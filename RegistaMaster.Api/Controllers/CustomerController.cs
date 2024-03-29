using Microsoft.AspNetCore.Mvc;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.CustomerModel;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Persistance.RegistaMasterContextes;

namespace RegistaMaster.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CustomerController : BaseController
{
    private readonly IUnitOfWork _uow;
    private readonly RegistaMasterContext _context;
    public CustomerController(IUnitOfWork uow, RegistaMasterContext context)
    {
        _uow = uow;
        _context = context;
    }

    [HttpGet("GetCustomers")]
    public async Task<IActionResult> GetCustomers()
    {
        return Ok(_uow.CustomerRepository.GetList());
    }
    [HttpGet("GetCustomer")]
    public async Task<IActionResult> GetCustomer(int ID)
    {
        try
        {
            var currentCustomer = await _uow.CustomerRepository.GetById<Customer>(ID);

            var model = new CustomerDTO();
            model.Name = currentCustomer.Name;
            model.Email = currentCustomer.Email;
            model.Address = currentCustomer.Address;
            if (currentCustomer == null)
                return BadRequest();
            return Ok(model);
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }

    }
    [HttpPost("AddCustomer")]
    public async Task<IActionResult> AddCustomer(CustomerDTO model)
    {
        try
        {
            var customer = new Customer()
            {
                Name = model.Name,
                Address = model.Address,
                Email = model.Email
            };
            await _uow.CustomerRepository.CustomerAdd(customer);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
    [HttpDelete("DeleteCustomer")]
    public async Task<IActionResult> DeleteCustomer(int ID)
    {
        var currentCustomer = await _uow.CustomerRepository.Delete<Customer>(ID);

        if (currentCustomer == null)
            return BadRequest("Kullanıcı bulunamadı");
        return Ok();
    }
    [HttpPut("UpdateCustomer")]
    public async Task<IActionResult> UpdateCustomer(int ID)
    {

        return Ok();
    }


}
