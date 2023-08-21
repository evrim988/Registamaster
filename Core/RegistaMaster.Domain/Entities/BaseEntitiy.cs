using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using RegistaMaster.Domain.Enums;

namespace RegistaMaster.Domain.Entities;

public class BaseEntitiy
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ID { get; set; }

    [DisplayName("Oluşturulma Tarihi")]
    public DateTime? CreatedOn { get; set; }

    [DisplayName("Güncellenme Tarihi")]
    public DateTime? LastModifiedOn { get; set; }

    [DisplayName("Oluşturan Kullanıcı")]
    public int CreatedBy { get; set; }

    [DisplayName("Güncelleyen Kullanıcı")]
    public int LastModifiedBy { get; set; }

    [DisplayName("Silindi Bilgisi")]
    [DefaultValue(0)]
    public ObjectStatus ObjectStatus { get; set; }

    [DisplayName("Durum")]
    [DefaultValue(1)]
    public Status Status { get; set; }
}
