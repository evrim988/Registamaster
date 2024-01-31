using RegistaMaster.Domain.Enums;
using System.ComponentModel;
using System.Reflection;

namespace RegistaMaster.Domain.Entities;

public class Request : BaseEntitiy
{
    [DisplayName("Konu")]
    public string RequestSubject { get; set; }
    [DisplayName("Açıklama")]
    public string? Description { get; set; }
    [DisplayName("Kategori")]
    public string? Category { get; set; }
    public int? CategoryID { get; set; }
    [DisplayName("Bildirim Türü")]
    public string? NotificationType { get; set; }
    public int? NotificationTypeID { get; set; }
    [DisplayName("Sayfa Linki")]
    public string? PageURL { get; set; }
    [DisplayName("Görüntü")]
    public string? PictureURL { get; set; }
    [DisplayName("Başlangıç Tarihi")]
    public DateTime StartDate { get; set; }
    [DisplayName("Bitiş Tarihi")]
    public DateTime PlanedEndDate { get; set; }
    [DisplayName("Durum")]
    public RequestStatus RequestStatus { get; set; }
    [DisplayName("Bildirim ID")]
    public int NotificationID {  get; set; }
    [DisplayName("Versiyon")]
    public int? VersionID {  get; set; }
    public Version Version { get; set; }
    public int? ModuleID { get; set; }
    public Module Module { get; set; }
  
    public int ProjectID { get; set; }
    public Project Project { get; set; }
    public ICollection<Task> Tasks { get; set; }
    public ICollection<Action> Actions { get; set; }
}
