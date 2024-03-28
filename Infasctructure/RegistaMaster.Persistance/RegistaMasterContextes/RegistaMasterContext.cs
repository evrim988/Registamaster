using Microsoft.EntityFrameworkCore;
using RegistaMaster.Domain;
using RegistaMaster.Domain.Entities;
using Action = RegistaMaster.Domain.Entities.Action;
using Task = RegistaMaster.Domain.Entities.Task;
using Version = RegistaMaster.Domain.Entities.Version;

namespace RegistaMaster.Persistance.RegistaMasterContextes
{
  public class RegistaMasterContext : DbContext
  {
    public RegistaMasterContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<Customer> Customers { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Task> Tasks { get; set; }
    public DbSet<Action> Actions { get; set; }
    public DbSet<ProjectNote> ProjectNotes { get; set; }
    public DbSet<Request> Requests { get; set; }
    public DbSet<Module> Modules { get; set; }
    public DbSet<Version> Versions { get; set; }
    public DbSet<UserLog> UserLogs { get; set; }
    public DbSet<ErrorLog> ErrorLogs { get; set; }
    public DbSet<HealthCheck> HealthChecks { get; set; }
    public DbSet<ActionNote> ActionNotes { get; set; }
    public DbSet<FoodChart> FoodCharts { get; set; }
  }
}
