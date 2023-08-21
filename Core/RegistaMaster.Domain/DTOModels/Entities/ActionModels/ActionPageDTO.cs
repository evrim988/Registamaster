using RegistaMaster.Domain.Enums;

namespace RegistaMaster.Domain.DTOModels.Entities.ActionModels;

public class ActionPageDTO
{
    public int ID { get; set; }
    public string Reponsible { get; set; }
    public DateTime OpeningDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Description { get; set; }
    public ActionStatus ActionStatus { get; set; }
    public int RequestID { get; set; }
}
