using RegistaMaster.Domain.DTOModels.Entities.ErrorLog;
using RegistaMaster.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Application.Repositories
{
    public interface IErrorLogRepository : IRepository
    {
        IQueryable<ErrorLogDTO> GetList();
        public Task<string> AddErrorLog(ErrorLog model);
    }
}
