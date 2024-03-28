using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Domain.Entities
{
  public class UserLog : BaseEntitiy
  {
    [DisplayName("Ad ve Soyad")]
    public string NameSurname { get; set; }

    [DisplayName("Giriş Yapılan Tarih")]
    public DateTime LoginDate { get; set; }

    [DisplayName("Müşteri ID")]
    public int? ClientID { get; set; }

    [DisplayName("Kullanıcı ID")]
    public int? MemberID { get; set; }

    public int ProjectID { get; set; }
    public Project Project { get; set; }
  }
}
