using System.ComponentModel;

namespace RegistaMaster.Domain.Entities
{
  public class EmailInformation : BaseEntitiy
  {
    public string? EmailHost { get; set; }
    public string? EmailPort { get; set; }
    public bool EnableSsl { get; set; }
    public string? EmailPassword { get; set; }
    public string? ContactEmail { get; set; }

    public int CustomerID { get; set; }
    public Customer Customer { get; set; }
  }
}
