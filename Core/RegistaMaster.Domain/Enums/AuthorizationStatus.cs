using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Domain.Enums
{
    public enum AuthorizationStatus
    {
        [Display(Name = "Admin")]
        Admin = 0,
        [Display(Name = "Ekip Lideri")]
        TeamsLeader = 1,
        [Display(Name = "Developer")]
        Developer=2
    }
}
