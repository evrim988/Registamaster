using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Domain.DTOModels.Entities.HealthChecksModel
{
    public class HealthCheckDTO
    {
        public string Status { get; set; }
        public string ProjectKey { get; set; }
        public string RequestDesc { get; set; }
        public DateTime RequestDate { get; set; }
    }
}
