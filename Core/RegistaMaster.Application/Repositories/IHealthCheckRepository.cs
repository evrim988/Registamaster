using RegistaMaster.Domain.DTOModels.Entities.HealthChecksModel;
using RegistaMaster.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Application.Repositories
{
    public interface IHealthCheckRepository : IRepository
    {
        IQueryable<HealthCheckDTO> GetList();
        Task<string> AddHealthCheck(HealthCheck model);

    }
}
