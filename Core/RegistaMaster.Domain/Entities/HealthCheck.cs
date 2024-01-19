using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Domain.Entities
{
    public class HealthCheck : BaseEntitiy
    {
        [DisplayName("Durum")]
        public string RequestStatus { get; set; }
        [DisplayName("Proje")]
        public string ProjectKey { get; set; }
        [DisplayName("Açıklama")]
        public string RequestDesc { get; set; }
        [DisplayName("Tarih")]
        public DateTime RequestDate { get; set; }
    }
}
