using Microsoft.Extensions.Configuration;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Application.Services.EmailService;
using RegistaMaster.Application.Services.SecurityService;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Infasctructure.Services.EmailService;
using RegistaMaster.Persistance.RegistaMasterContextes;
using RegistPackets.FileService.Interfaces;

namespace RegistaMaster.Infasctructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
  private readonly SessionModel _session;
  private readonly IEmailService _emailService;
  private readonly IConfiguration _config;
  private readonly IFileService _fileService;
  private readonly RegistaMasterContext _context;
  public UnitOfWork(RegistaMasterContext context, ISessionService sessionService, IEmailService emailService, IFileService fileService, IConfiguration config)
  {
    _session = sessionService.GetInjection();
    _context = context;
    _emailService = emailService;
    _fileService = fileService;
    _config = config;
  }
  private IRepository _repository;
  public IRepository Repository
  {
    get => _repository ?? (_repository = new Repository(_context, _session));
  }
  private ICustomerRepository _customerRepository;
  public ICustomerRepository CustomerRepository
  {
    get => _customerRepository ?? (_customerRepository = new CustomerRepository(_context, _session, this));
  }
  private IUserRepository _userRepository;
  public IUserRepository UserRepository
  {
    get => _userRepository ?? (_userRepository = new UserRepository(_context, _session, this));
  }
  private IProjectRepository _projectRepository;
  public IProjectRepository ProjectRepository
  {
    get => _projectRepository ?? (_projectRepository = new ProjectRepository(_context, _session, this));
  }
  private IProjectNoteRepository _projectNoteRepository;
  public IProjectNoteRepository ProjectNoteRepository
  {
    get => _projectNoteRepository ?? (_projectNoteRepository = new ProjectNoteRepository(_context, _session, this));
  }
  private IRequestRepository _requestRepository;
  public IRequestRepository RequestRepository
  {
    get => _requestRepository ?? (_requestRepository = new RequestRepository(_context, _session, this, _config, _fileService));
  }
  private IActionRepository _actionRepository;
  public IActionRepository ActionRepository
  {
    get => _actionRepository ?? (_actionRepository = new ActionRepository(_context, _session, this));
  }
  private IHomeRepository _homeRepository;
  public IHomeRepository HomeRepository
  {
    get => _homeRepository ?? (_homeRepository = new HomeRepository(_context, _session, this));
  }
  private IModuleRepository _moduleRepository;
  public IModuleRepository ModuleRepository
  {
    get => _moduleRepository ?? (_moduleRepository = new ModuleRepository(_context, _session, this));
  }
  private IVersionRepository _versionRepository;
  public IVersionRepository VersionRepository
  {
    get => _versionRepository ?? (_versionRepository = new VersionRepository(_context, _session, this));

  }
  private IUserLogRepository _userLogRepository;
  public IUserLogRepository UserLogRepository
  {
    get => _userLogRepository ?? (_userLogRepository = new UserLogRepository(_context, this, _session));
  }

  private IErrorLogRepository _errorLogRepository;
  public IErrorLogRepository errorLogRepository
  {
    get => _errorLogRepository ?? (_errorLogRepository = new ErrorLogRepository(_context, this, _session));
  }
  private IHealthCheckRepository _healthCheckRepository;
  public IHealthCheckRepository healthCheckRepository
  {
    get => _healthCheckRepository ?? (_healthCheckRepository = new HealthCheckRepository(_context, this, _session));
  }
  private IActionNoteRepository _actionNoteRepository;
  public IActionNoteRepository ActionNoteRepository
  {
    get => _actionNoteRepository ?? (_actionNoteRepository = new ActionNoteRepository(_context, this, _session));
  }
  private IFoodChartRepository _foodChartRepository;
  public IFoodChartRepository FoodChartRepository
  {
    get => _foodChartRepository ?? (_foodChartRepository = new FoodChartRepository(_context, _session, this));
  }

  public async Task<int> SaveChanges()
  {
    try
    {
      return await _context.SaveChangesAsync();
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
      return _session;
    }
    catch (Exception e)
    {
      throw e;
    }

  }
}
