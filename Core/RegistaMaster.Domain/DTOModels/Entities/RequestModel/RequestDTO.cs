using RegistaMaster.Domain.Enums;

namespace RegistaMaster.Domain.DTOModels.Entities.RequestModel;

public class RequestDTO
{
    public string RequestName { get; set; }
    public string Description { get; set; }
    public int CustomerID { get; set; }
    public string CustomerName { get; set; }
    public int ProjectID { get; set; }
    public CategoryStatus CategoryStatus { get; set; }
}
