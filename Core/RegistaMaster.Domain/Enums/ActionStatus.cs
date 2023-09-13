using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace RegistaMaster.Domain.Enums;

public enum ActionStatus
{
    [Display(Name = "Başlamadı")]
    notStarted = 0,

    [Display(Name = "Başladı")]
    start = 1,

    [Display(Name = "Devam Ediyor")]
    Contiuned = 2,

    [Display(Name = "Tamamlandı")]
    Completed = 3,

    [Display(Name = "İptal/Reddedildi")]
    Cancel = 4
}
