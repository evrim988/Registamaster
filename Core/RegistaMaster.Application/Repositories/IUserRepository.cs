using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.DTOModels.Entities.UserModel;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using RegistaMaster.Domain.Entities;

namespace RegistaMaster.Application.Repositories;

public interface IUserRepository : IRepository
{
    public Task<string> AddUser(User user);
    public void Delete(int id);
    public Task<IQueryable<User>> GetList();
    Task<List<ResponsibleDevextremeSelectListHelper>> GetResponsible();
    Task<UserDetailDto> UserDetails(int ID);
}
