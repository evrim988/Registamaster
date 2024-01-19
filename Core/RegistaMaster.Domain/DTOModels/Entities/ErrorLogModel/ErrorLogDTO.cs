using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Domain.DTOModels.Entities.ErrorLog
{
    public class ErrorLogDTO
    {
        public string ProjectKey { get; set; }
        public string NameSurname { get; set; }
        public DateTime ErrorDate { get; set; }
        public string ErrorDesc { get; set; }
        public int ClientID { get; set; }
        public int MemberID { get; set; }
    }
}
