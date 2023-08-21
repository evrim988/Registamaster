using System.ComponentModel.DataAnnotations;

namespace RegistaMaster.Domain.Enums;

public enum TaskStatus
{
    [Display(Name = "Başlamadı")]
    NotStart = 0,

    [Display(Name = "Başladı")]
    Start = 1,

    [Display(Name = "Devam Ediyor")]
    Continued = 2,

    [Display(Name = "İptal/Reddedildi")]
    Cancel = 3,
}
