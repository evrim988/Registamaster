using Microsoft.AspNetCore.Mvc.Rendering;
using RegistaMaster.Domain.Enums;

namespace RegistaMaster.Domain.DTOModels.Entities.ActionModels;

public class ActionDTO
{
    public int ID { get; set; }
    public string ActionDescription { get; set; }
    public int ResponsibleID { get; set; }
    public DateTime OpeningDate { get; set; }
    public DateTime EndDate { get; set; }
    public ActionStatus ActionStatus { get; set; }
    public string Description { get; set; }
    public string LastModifiedBy { get; set; }
    public List<SelectListItem> ResponsiblehelperModelList { get; set; }
}
