using RegistaMaster.Application.Repositories;
using RegistaMaster.Application.Services.EmailService;
using RegistaMaster.Application.Services.SecurityService;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Infasctructure.Services.EmailService;
using RegistaMaster.Persistance.RegistaMasterContextes;

namespace RegistaMaster.Infasctructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly RegistaMasterContext context;
    private readonly SessionModel session;
    private readonly IEmailService emailService;
    public UnitOfWork(RegistaMasterContext _context, ISessionService sessionService, IEmailService _emailService)
    {
        session = sessionService.GetInjection();
        context = _context;
        emailService = _emailService;
    }
    private IRepository _repository;
    public IRepository Repository
    {
        get => _repository ?? (_repository = new Repository(context, session));
    }
    private ICustomerRepository _customerRepository;
    public ICustomerRepository CustomerRepository
    {
        get => _customerRepository ?? (_customerRepository = new CustomerRepository(context, session, this));
    }
    private IUserRepository _userRepository;
    public IUserRepository UserRepository
    {
        get => _userRepository ?? (_userRepository = new UserRepository(context, session, this));
    }
    private IProjectRepository _projectRepository;
    public IProjectRepository ProjectRepository
    {
        get => _projectRepository ?? (_projectRepository = new ProjectRepository(context, session, this));
    }
    private IProjectNoteRepository _projectNoteRepository;
    public IProjectNoteRepository ProjectNoteRepository
    {
        get => _projectNoteRepository ?? (_projectNoteRepository = new ProjectNoteRepository(context, session, this));
    }
    private IRequestRepository _requestRepository;
    public IRequestRepository RequestRepository
    {
        get => _requestRepository ?? (_requestRepository = new RequestRepository(context, session, this));
    }
    private ITaskRepository _taskRepository;
    public ITaskRepository TaskRepository
    {
        get => _taskRepository ?? (_taskRepository = new TaskRepository(context, session, this, emailService));

    }
    private IActionRepository _actionRepository;
    public IActionRepository ActionRepository
    {
        get => _actionRepository ?? (_actionRepository = new ActionRepository(context, session, this));
    }
    private IHomeRepository _homeRepository;
    public IHomeRepository HomeRepository
    {
        get => _homeRepository ?? (_homeRepository = new HomeRepository(context, session, this));
    }
    private IModuleRepository _moduleRepository;
    public IModuleRepository ModuleRepository
    {
        get => _moduleRepository ?? (_moduleRepository = new ModuleRepository(context, session, this));
    }
    private IVersionRepository _versionRepository;
    public IVersionRepository VersionRepository
    {
        get => _versionRepository ?? (_versionRepository = new VersionRepository(context, session, this));

    }
    private IUserLogRepository _userLogRepository;
    public IUserLogRepository UserLogRepository
    {
        get => _userLogRepository ?? (_userLogRepository = new UserLogRepository(context,this, session));
    }
    
    private IErrorLogRepository _errorLogRepository;
    public IErrorLogRepository errorLogRepository
    {
        get => _errorLogRepository ?? (_errorLogRepository = new ErrorLogRepository(context,this, session));
    }
    private IHealthCheckRepository _healthCheckRepository;
    public IHealthCheckRepository healthCheckRepository
    {
        get => _healthCheckRepository ?? (_healthCheckRepository = new HealthCheckRepository(context,this, session));
    }
  private IActionNoteRepository _actionNoteRepository;
  public IActionNoteRepository ActionNoteRepository {
    get => _actionNoteRepository ?? (_actionNoteRepository = new ActionNoteRepository(context, this, session));
  }

  public async Task<int> SaveChanges()
    {
        try
        {
            return await context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public SessionModel GetSession()
    {
        try
        {
            return session;
        }
        catch (Exception e)
        {
            throw e;
        }

    }
}
