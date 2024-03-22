using RegistaMaster.Domain.Enums;

namespace RegistaMaster.Domain.Entities;

public class Version : BaseEntitiy
{
   public string Name { get; set; }
   public string? Description { get; set; }
   public DateTime Date { get; set; }
   public bool DatabaseChange { get; set; }
   public int ProjectID { get; set; }
   public Project Project { get; set; }
}
