using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.HealthChecksModel;
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
    public class HealthCheckRepository : Repository, IHealthCheckRepository
    {
        private readonly RegistaMasterContext _context;
        private readonly SessionModel _session;
        private readonly IUnitOfWork _uow;
        public HealthCheckRepository(RegistaMasterContext context, IUnitOfWork uow, SessionModel session) : base(context, session)
        {
            _context = context;
            _session = session;
            _uow = uow;
        }
        public IQueryable<HealthCheckDTO> GetList()
        {
            try
            {
                return GetNonDeletedAndActive<HealthCheck>(t => t.ObjectStatus == ObjectStatus.NonDeleted && t.Status == Status.Active).Select(s => new HealthCheckDTO()
                {
                    ProjectKey = s.ProjectKey,
                    Status = s.RequestStatus,
                    RequestDate= s.RequestDate,
                    RequestDesc = s.RequestDesc,
                });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<string> AddHealthCheck(HealthCheck model)
        {
            try
            {
                model.RequestDate = DateTime.Now;
                await _uow.Repository.Add(model);
                await _uow.SaveChanges();
                return "1";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
