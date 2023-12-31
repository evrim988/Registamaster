﻿using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;

namespace RegistaMaster.Application.Repositories;

public interface IProjectRepository : IRepository
{
    public Task<string> AddProject(Project model);
    public void Delete(int id);
    public Task<IQueryable<Project>> GetList();
    ProjectSessionModel GetProjectKey(string key);
}
