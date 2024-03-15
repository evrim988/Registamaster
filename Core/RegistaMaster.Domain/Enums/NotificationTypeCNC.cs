using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Domain.Enums
{
    public enum NotificationTypeCNC
    {
        [Display(Name = "Öneri")]
        Suggestion = 0,
        [Display(Name = "Hata")]
        Error = 1,
    }
}
