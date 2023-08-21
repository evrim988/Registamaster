using Microsoft.EntityFrameworkCore;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistaMaster.Persistance.RegistaMasterContextes;

namespace RegistaMaster.Infasctructure.Repositories;

public class SecurityRepository : ISecurityRepository
{
    private readonly RegistaMasterContext _context;
    public SecurityRepository(RegistaMasterContext context)
    {
        _context = context;
    }
    public async Task<User> Login(string username, string password)
    {
        return await _context.Users.FirstOrDefaultAsync(t => (t.Username == username || t.Email == username) && t.Password == password && t.ObjectStatus == ObjectStatus.NonDeleted && t.Status == Status.Active);
    }
}
