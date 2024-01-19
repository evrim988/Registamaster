using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.UserLogModel;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistaMaster.Persistance.RegistaMasterContextes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Infasctructure.Repositories
{
    public class UserLogRepository : Repository, IUserLogRepository
    {
        private readonly RegistaMasterContext _context;
        private readonly SessionModel _session;
        private readonly IUnitOfWork _uow;
        public UserLogRepository(RegistaMasterContext context, IUnitOfWork uow,SessionModel session) : base(context, session)
        {
            _context = context;
            _session = session;
            _uow = uow;
        }

        public IQueryable<UserLogDTO> GetList()
        {
            try
            {
                return GetNonDeletedAndActive<UserLog>(t => t.ObjectStatus == ObjectStatus.NonDeleted && t.Status == Status.Active).Select(s => new UserLogDTO()
                {
                    ProjectKey = s.ProjectKey,
                    NameSurname=s.NameSurname,
                    LoginDate=s.LoginDate,
                    ClientID=s.ClientID,
                    MemberID=s.MemberID,
                });
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }

        public async Task<string> AddUserLog(UserLog model)
        {
            try
            {
                model.LoginDate = DateTime.Now;
                await _uow.Repository.Add(model);
                await _uow.SaveChanges();
                return "";
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }
    }
}
