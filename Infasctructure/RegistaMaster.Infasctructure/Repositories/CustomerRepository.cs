using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.CustomerModel;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistaMaster.Persistance.RegistaMasterContextes;

namespace RegistaMaster.Infasctructure.Repositories;

public class CustomerRepository : Repository, ICustomerRepository
{
  private readonly IUnitOfWork _uow;
  private readonly SessionModel _session;
  private readonly RegistaMasterContext _context;
  public CustomerRepository(RegistaMasterContext context, SessionModel session, IUnitOfWork uow) : base(context, session)
  {
    _uow = uow;
    _context = context;
    _session = session;
  }

  public async Task<string> CustomerAdd(Customer model)
  {
    try
    {
      await _uow.Repository.Add(model);
      await _uow.SaveChanges();
      return "1";
    }
    catch (Exception e)
    {

      throw e;
    }

  }

  public void Delete(int id)
  {
    var customer = GetNonDeletedAndActive<Customer>(t => t.ID == id);
    DeleteRange(customer.ToList());

    Delete<Customer>(id);
  }



  public async Task<IQueryable<CustomerDTO>> GetList()
  {
    try
    {
      return GetNonDeletedAndActive<Customer>(t => t.ObjectStatus == ObjectStatus.NonDeleted).Select(s => new CustomerDTO()
      {
        ID = s.ID,
        Address = s.Address,
        Email = s.Email,
        Name = s.Name,
      });
    }
    catch (Exception ex)
    {
      throw ex;
    }

  }

  public async Task<string> Update(Customer model)
  {
    Update(model);

    await _uow.SaveChanges();
    return "1";
  }
}
