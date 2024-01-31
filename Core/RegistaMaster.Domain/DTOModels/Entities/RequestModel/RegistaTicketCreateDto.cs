using RegistaMaster.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Domain.DTOModels.Entities.RequestModel
{
    public class RegistaTicketCreateDto
    {
        public int ID { get; set; }

        [DisplayName("Bildirim Türü")]
        public string TicketType { get; set; }

        [DisplayName("Bildirim Başlığı")]
        public string TicketTitle { get; set; }

        [DisplayName("Bildirim Açıklama")]
        public string TicketContent { get; set; }


        [DisplayName("Görüntü")]
        public string? Image { get; set; }

        [DisplayName("Sayfa Yolu")]
        public string PageUrl { get; set; }


    }
}
