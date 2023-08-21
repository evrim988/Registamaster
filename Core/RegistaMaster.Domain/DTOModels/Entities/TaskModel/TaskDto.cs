using Microsoft.AspNetCore.Mvc.Rendering;
using RegistaMaster.Domain.Enums;
using System.ComponentModel;
using TaskStatus = RegistaMaster.Domain.Enums.TaskStatus;

namespace RegistaMaster.Domain.DTOModels.Entities.TaskModel;

public class TaskDto
{
    public int UserID { get; set; }

    [DisplayName("Planlanan Başlangıç Tarihi")]
    public DateTime PlanedStart { get; set; }

    [DisplayName("Planlanan Bitiş Tarihi")]
    public DateTime PlanedEnd { get; set; }

    [DisplayName("Konu/Başlık")]
    public string Title { get; set; }

    [DisplayName("Bildirim Açıklama")]
    public string TicketContent { get; set; }

    [DisplayName("Açıklama")]
    public string Description { get; set; }

    [DisplayName("Sorumlu")]
    public int ResponsibleID { get; set; }

    [DisplayName("Durum")]
    public TaskStatus TaskStatus { get; set; }

    [DisplayName("Öncelik")]
    public PriorityStatus PriorityStatus { get; set; }

    [DisplayName("Görüntü")]
    public string Image { get; set; }
    public int CustomerID { get; set; }
    public int RequestID { get; set; }
    public string Base64 { get; set; }
    public List<SelectListItem> ResponsiblehelperModelList { get; set; }
    public List<SelectListItem> RequestModelList { get; set; }
}
