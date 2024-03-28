using RegistaMaster.Domain.Enums;
using System.ComponentModel;

namespace RegistaMaster.Domain.Entities;

public class Action : BaseEntitiy
{
  [DisplayName("Aksiyon Konusu")]
  public string Subject { get; set; }

  [DisplayName("Sorumlu")]
  public int ResponsibleID { get; set; }
  public User Responsible { get; set; }

  [DisplayName("Açılma Tarihi")]
  public DateTime OpeningDate { get; set; }

  [DisplayName("Son Tarih")]
  public DateTime EndDate { get; set; }

  [DisplayName("Başlama Tarihi")]
  public DateTime StartDate { get; set; }

  [DisplayName("Tamamlanma Tarih")]
  public DateTime CompleteDate { get; set; }

  public string? Description { get; set; }

  [DisplayName("Durum")]
  public ActionStatus ActionStatus { get; set; }
  public RequestStatus RequestStatus { get; set; }
  public ActionPriorityStatus ActionPriorityStatus { get; set; }
  public int RequestID { get; set; }
  public Request Request { get; set; }
  public ICollection<ActionNote>? ActionNotes { get; set; }

}
