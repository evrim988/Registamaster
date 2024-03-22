using Microsoft.AspNetCore.Mvc.Rendering;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using RegistaMaster.Domain.Enums;

namespace RegistaMaster.Domain.DTOModels.Entities.RequestModel;

public class RequestDTO
{
    public string RequestSubject { get; set; }
    public int ModuleID { get; set; }
    public int ID { get; set; }
    public int VersionID { get; set; }
    public string PageUrl { get; set; }
    public string PictureURL { get; set; }
    public string RequestName { get; set; }
    public string? Description { get; set; }
    public int CustomerID { get; set; }
    public string CustomerName { get; set; }
    public int ProjectID { get; set; }
    public int NotificationTypeID { get; set; }
    public int? CategoryID { get; set; }
    public string LastModifiedBy { get; set; }
    public DateTime? LastModifiedOn { get; set; }
    public DateTime? CreatedOn { get; set; }

    public ObjectStatus ObjectStatus { get; set; }
    public Status Status { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime PlanedEndDate { get; set; }
    public RequestStatus RequestStatus { get; set; }

    public CategoryStatus CategoryStatus { get; set; }
    public List<SelectListItem> Project { get; set; }

    //public List<SelectListItem> Module { get; set; }
    //public List<SelectListItem> Version { get; set; }
    public List<SelectListItem> Responsible { get; set; }
    public List<SelectListItem> NotificationType { get; set; }
    public List<SelectListItem> Category { get; set; }
}
