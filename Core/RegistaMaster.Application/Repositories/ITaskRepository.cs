using Microsoft.AspNetCore.Mvc.Rendering;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using RegistaMaster.Domain.Entities;
namespace RegistaMaster.Application.Repositories;

public interface ITaskRepository :IRepository
{
    public Task<IQueryable<Domain.Entities.Task>> Getlist();
    public Task<IQueryable<Domain.Entities.Task>> GetMyTaskUserID();
    public Task<string> AddTask(Domain.Entities.Task task);
    public Task<string> TaskUpdate(Domain.Entities.Task task);
    Task<string> MyTaskUpdate(int Key, string values);
    public void Delete(int id);
    public Task<string> SendMail(Domain.Entities.Task task);
    public Task<List<SelectListItem>> ResponsiblehelperModelList();
    public Task<List<SelectListItem>> RequestModelList();
    Task<List<ResponsibleDevextremeSelectListHelper>> GetRequest();
}
