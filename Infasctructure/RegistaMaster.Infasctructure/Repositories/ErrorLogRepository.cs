using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ErrorLog;
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
    public class ErrorLogRepository : Repository, IErrorLogRepository
    {
        private readonly RegistaMasterContext _context;
        private readonly SessionModel _session;
        private readonly IUnitOfWork _uow;
        public ErrorLogRepository(RegistaMasterContext context, IUnitOfWork uow, SessionModel session) : base(context, session)
        {
            _context = context;
            _session = session;
            _uow = uow;
        }

        public async Task<string> AddErrorLog(ErrorLog model)
        {
            try
            {
                model.ErrorDate = DateTime.Now;
                await _uow.Repository.Add(model);
                await _uow.SaveChanges();
                return "1";
            }
            catch (Exception ex)
            {
                throw ex;
            }
           
        }

        public IQueryable<ErrorLogDTO> GetList()
        {
            try
            {
                return GetNonDeletedAndActive<ErrorLog>(t => t.ObjectStatus == ObjectStatus.NonDeleted && t.Status == Status.Active).Select(s => new ErrorLogDTO()
                {
                    NameSurname = s.NameSurname,
                    ErrorDate = s.ErrorDate,
                    ErrorDesc = s.ErrorDesc,
                    ClientID = s.ClientID,
                    MemberID = s.MemberID,
                });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
