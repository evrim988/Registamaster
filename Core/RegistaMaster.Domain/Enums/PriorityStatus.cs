using System.ComponentModel.DataAnnotations;

namespace RegistaMaster.Domain.Enums;

public enum PriorityStatus
{
    [Display(Name = "Düşük")]
    low = 0,
    [Display(Name = "Orta")]
    middle = 1,
    [Display(Name = "Yüksek")]
    high = 2,
}
