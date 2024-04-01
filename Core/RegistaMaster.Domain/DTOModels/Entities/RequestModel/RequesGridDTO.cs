using RegistaMaster.Domain.Enums;
using System.ComponentModel;

namespace RegistaMaster.Domain.DTOModels.Entities.RequestModel
{
  public class RequesGridDTO
  {
    public int ID { get; set; }
    public int CreatedBy { get; set; }
    public string Subject { get; set; }
    public string Description { get; set; }
    public int? CategoryID { get; set; }
    public int? NotificationTypeID { get; set; }
    public string? PageURL { get; set; }
    public string? PictureURL { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? CreatedOn { get; set; }
    public DateTime PlanedEndDate { get; set; }
    public RequestStatus RequestStatus { get; set; }
    public int NotificationID { get; set; }
    public int? VersionID { get; set; }
    public int? ModuleID { get; set; }
    public int ProjectID { get; set; }
    public string Color { get; set; }
  }
}
