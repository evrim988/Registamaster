using RegistaMaster.Domain.DTOModels.Entities.CustomerModel;
using RegistaMaster.Domain.Entities;

namespace RegistaMaster.Application.Repositories;

public interface ICustomerRepository : IRepository
{
    Task<IQueryable<CustomerDTO>> GetList();
    Task<string> CustomerAdd(Customer customer);
    void Delete(int id);
}
