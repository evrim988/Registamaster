using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace RegistaMaster.Domain.Entities;

public class Customer : BaseEntitiy
{
    [DisplayName("Name")]
    [StringLength(150)]
    [MinLength(3, ErrorMessage = "{0} {1} karakterden küçük olamaz")]
    [MaxLength(150, ErrorMessage = "{0} {1} karakterden büyük olamaz")]
    public string Name { get; set; }

    [DisplayName("Adres")]
    [StringLength(600)]
    [MinLength(3, ErrorMessage = "{0} {1} karakterden küçük olamaz")]
    [MaxLength(600, ErrorMessage = "{0} {1} karakterden büyük olamaz")]
    public string? Address { get; set; }

    public string? ContactEmail { get; set; }

    public string? EmailHost { get; set; }

    public string? EmailPort { get; set; }

    public bool EnableSsl { get; set; }

    public string? EmailPassword { get; set; }

    [DisplayName("Email")]
    public string? Email { get; set; }

    public string? ApiKey { get; set; }

    [DisplayName("Müşteri Tanım No")]
    public int? CustomerDescriptionID { get; set; }

    public ICollection<Request> Requests { get; set; }
    public ICollection<ProjectNote> ProjectNotes { get; set; }
}
