using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.UserModel;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistaMaster.Persistance.RegistaMasterContextes;

namespace RegistaMaster.Infasctructure.Repositories;

public class UserRepository : Repository, IUserRepository
{
    private readonly RegistaMasterContext context;

    private readonly IUnitOfWork uow;
    private readonly SessionModel session;

    public UserRepository(RegistaMasterContext _context, SessionModel _session, IUnitOfWork _uow) : base(_context, _session)
    {
        context = _context;
        uow = _uow;
        session = _session;
    }
    public async Task<string> AddUser(User model)
    {
        try
        {
            model.CustomerID = session.CustomerID;
            await uow.Repository.Add(model);
            await uow.SaveChanges();
            return "";
        }
        catch (Exception e)
        {

            throw e;
        }
    }
    public async Task<string> UpdateUser(UserDetailDto model)
    {
        try
        {
            var user = await GetById<User>(model.ID);
            user.Name = model.Name;
            user.Surname = model.Surname;
            user.Email = model.Email;
            user.Password = model.Password;
            user.Username = model.Username;
            Update(user);
            await uow.SaveChanges();
            return "1";
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    public async Task<string> DeleteUser(int ID)
    {
        try
        {
            var user = await GetById<User>(ID);
            user.ObjectStatus = ObjectStatus.Deleted;
            user.Status = Status.Passive;
            Update(user);
            await uow.SaveChanges();
            return "1";
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    public async Task<IQueryable<UserDTO>> GetList()
    {
        try
        {
            return GetNonDeletedAndActive<User>(t => t.ObjectStatus == ObjectStatus.NonDeleted).Select(s => new UserDTO()
            {
                AuthorizationStatus = s.AuthorizationStatus,
                Name = s.Name,
                Surname = s.Surname,
                Email = s.Email,
                Password = s.Password,
            });
        }
        catch (Exception ex)
        {
            throw ex;
        }
       
    }

    public async Task<List<ResponsibleDevextremeSelectListHelper>> GetResponsible()
    {
        try
        {
            List<ResponsibleDevextremeSelectListHelper> ResponsibleHelpers = new List<ResponsibleDevextremeSelectListHelper>();
            var model = context.Users
                .Where(t => t.ObjectStatus == ObjectStatus.NonDeleted);
            foreach (var item in model)
            {
                ResponsibleDevextremeSelectListHelper helper = new ResponsibleDevextremeSelectListHelper()
                {
                    ID = item.ID,
                    Name = item.Name + " " + item.Surname,
                };
                ResponsibleHelpers.Add(helper);
            }
            return ResponsibleHelpers;
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<UserDetailDto> UserDetails(int ID)
    {
       return GetNonDeletedAndActive<User>(t => t.ID == ID).Select(s=>new UserDetailDto
       {
           Name=s.Name,
           Surname=s.Surname,
           Username=s.Username,
           Email=s.Email,
           Password=s.Password,
           AuthorizationStatus=s.AuthorizationStatus

       }).FirstOrDefault();
    }

    public async Task<string> ChangeAuthorization(UserDetailDto model)
    {
        try
        {
            var user = await GetById<User>(model.ID);
            user.AuthorizationStatus = model.AuthorizationStatus;
            Update(user);
            await uow.SaveChanges();
            return "1";
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

   
}
