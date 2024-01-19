using RegistaMaster.Domain.DTOModels.SecurityModels;

namespace RegistaMaster.Application.Repositories;

public interface IUnitOfWork
{
    IRepository Repository { get; }
    ICustomerRepository CustomerRepository { get; }
    IUserRepository UserRepository { get; }
    IProjectRepository ProjectRepository { get; }
    IProjectNoteRepository ProjectNoteRepository { get; }
    IRequestRepository RequestRepository { get; }
    ITaskRepository TaskRepository { get; }
    IActionRepository ActionRepository { get; }
    IHomeRepository HomeRepository { get; }
    IModuleRepository ModuleRepository { get; }
    IVersionRepository VersionRepository { get; }
    IUserLogRepository UserLogRepository { get; }
    IErrorLogRepository errorLogRepository { get; }
    IHealthCheckRepository healthCheckRepository { get; }
    Task<int> SaveChanges();
    SessionModel GetSession();
}
