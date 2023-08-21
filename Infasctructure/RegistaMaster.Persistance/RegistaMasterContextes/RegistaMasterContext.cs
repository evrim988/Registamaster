using Microsoft.EntityFrameworkCore;
using RegistaMaster.Domain;
using RegistaMaster.Domain.Entities;
using Task = RegistaMaster.Domain.Entities.Task;
using Version = RegistaMaster.Domain.Entities.Version;

namespace RegistaMaster.Persistance.RegistaMasterContextes
{
    public class RegistaMasterContext :DbContext
    {
        public RegistaMasterContext(DbContextOptions options) :base(options)
        {
            
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Domain.Entities.Action> Actions { get; set; }
        public DbSet<ProjectNote> ProjectNotes { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<Version> Versions { get; set; }
    }
}
