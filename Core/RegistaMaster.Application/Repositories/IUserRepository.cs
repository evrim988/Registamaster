using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.DTOModels.Entities.UserModel;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using RegistaMaster.Domain.Entities;

namespace RegistaMaster.Application.Repositories;

public interface IUserRepository : IRepository
{
    Task<string> AddUser(User user);
    Task<IQueryable<UserDTO>> GetList();
    Task<List<ResponsibleDevextremeSelectListHelper>> GetResponsible();
    Task<UserDetailDto> UserDetails(int ID);
    Task<string> UpdateUser(UserDetailDto user);
    Task<string> DeleteUser(int ID);

    Task<string> ChangeAuthorization(UserDetailDto user);
}
