using RegistaMaster.Domain.DTOModels.Entities.UserLogModel;
using RegistaMaster.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Application.Repositories;

    public interface IUserLogRepository : IRepository
    {
        IQueryable<UserLogDTO> GetList();
        public Task<string> AddUserLog(UserLog model);
    }

