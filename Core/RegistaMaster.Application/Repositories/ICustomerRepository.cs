using RegistaMaster.Domain.Entities;

namespace RegistaMaster.Application.Repositories;

public interface ICustomerRepository : IRepository
{
    public Task<IQueryable<Customer>> GetList();
    public Task<string> CustomerAdd(Customer customer);
    public void Delete(int id);
}
