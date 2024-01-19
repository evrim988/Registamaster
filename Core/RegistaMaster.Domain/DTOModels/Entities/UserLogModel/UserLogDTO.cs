using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Domain.DTOModels.Entities.UserLogModel
{
    public class UserLogDTO
    {
        public string ProjectKey { get; set; }
        public string NameSurname { get; set; }
        public DateTime LoginDate { get; set; }
        public int? ClientID { get; set; }
        public int? MemberID { get; set; }
    }
}
