using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Domain.Entities
{
  public class ErrorLog : BaseEntitiy
  {
    [DisplayName("Kullanıcı Adı ve Soyadı")]
    public string NameSurname { get; set; }
    [DisplayName("Hata Tarihi")]
    public DateTime ErrorDate { get; set; }
    [DisplayName("Hata Mesajı")]
    public string ErrorDesc { get; set; }
    [DisplayName("Müşteri")]
    public int ClientID { get; set; }
    [DisplayName("Kullanıcı")]
    public int MemberID { get; set; }
    public int ProjectID { get; set; }
    public Project Project { get; set; }
  }
}
