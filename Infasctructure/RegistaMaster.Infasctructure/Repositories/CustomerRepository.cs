using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.CustomerModel;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistaMaster.Persistance.RegistaMasterContextes;

namespace RegistaMaster.Infasctructure.Repositories;

public class CustomerRepository : Repository, ICustomerRepository
{
    private readonly RegistaMasterContext context;

    private readonly IUnitOfWork uow;
    private readonly SessionModel session;
    public CustomerRepository(RegistaMasterContext _context, SessionModel _session, IUnitOfWork _uow) : base(_context, _session)
    {
        context = _context;
        uow = _uow;
        session = _session;
    }

    public async Task<string> CustomerAdd(Customer model)
    {
        try
        {
            await uow.Repository.Add(model);
            await uow.SaveChanges();
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
                Adress = s.Address,
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

        await uow.SaveChanges();
        return "1";
    }
}
