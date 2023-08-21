using RegistaMaster.Domain.Entities;

namespace RegistaMaster.Application.Repositories;

public interface ISecurityRepository
{
    Task<User> Login(string username, string password);

}

