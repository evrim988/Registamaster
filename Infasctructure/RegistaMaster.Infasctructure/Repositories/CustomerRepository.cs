using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
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
            return "";
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

    //public Task<IQueryable<Customer>> GetById(int id)
    //{
    //    var model = GetNonDeletedAndActive<Customer>(t => t.IsDeleted == false);
    //    return model;
    //}

    public async Task<IQueryable<Customer>> GetList()
    {
        var model = GetNonDeletedAndActive<Customer>(t => true);
        return model;
    }

    public async Task<string> Update(Customer model)
    {
        Update(model);

        await uow.SaveChanges();
        return "";
    }
}
