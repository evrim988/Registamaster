using System.ComponentModel;

namespace RegistaMaster.Domain.Entities;

public class Module : BaseEntitiy
{
    [DisplayName("Modül Adı")]
    public string Name { get; set; }

    [DisplayName("Modül Açıklaması")]
    public string? Description { get; set; }
    public int ProjectID { get; set; }
    public Project Project { get; set; }
}
