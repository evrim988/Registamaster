using System.ComponentModel.DataAnnotations;

namespace RegistaMaster.Domain.Enums;

public enum DatabaseChangeStatus
{
    [Display(Name = "Evet")]
    yes = 0,

    [Display(Name = "Hayır")]
    no = 1,
}
