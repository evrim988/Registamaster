using System.ComponentModel;

namespace RegistaMaster.Domain.Entities;

public class Project : BaseEntitiy
{
    public Project()
    {
        ProjectGuid = Guid.NewGuid();
    }

    [DisplayName("Proje Adı")]
    public string ProjectName { get; set; }

    [DisplayName("Proje Açıklaması")]
    public string? ProjectDescription { get; set; }
    public Guid ProjectGuid { get; set; }

    public ICollection<ProjectNote> ProjectNotes { get; set; }
    public ICollection<Request> Requests { get; set; }
}
