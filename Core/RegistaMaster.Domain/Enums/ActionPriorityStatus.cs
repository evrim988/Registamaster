using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Domain.Enums
{
    public enum ActionPriorityStatus
    {
        [Display(Name = "Öncelik Belirtilmedi")]
        NotSpecified = 0,
        [Display(Name = "1")]
        Priority1 = 1,
        [Display(Name = "2")]
        Priority2 = 2,
        [Display(Name = "3")]
        Priority3 = 3
    }
}
