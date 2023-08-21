using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace RegistaMaster.Domain.Entities
{
    public class User : BaseEntitiy
    {
        [DisplayName("İsim")]
        [MinLength(3, ErrorMessage = "{0} {1} karakterden küçük olamaz")]
        [MaxLength(150, ErrorMessage = "{0} {1} karakterden büyük olamaz")]
        public string Name { get; set; }

        [DisplayName("Soyisim")]
        [MinLength(3, ErrorMessage = "{0} {1} karakterden küçük olamaz")]
        [MaxLength(150, ErrorMessage = "{0} {1} karakterden büyük olamaz")]
        public string Surname { get; set; }

        [DisplayName("Kullanıcı Adı")]
        public string Username { get; set; }
        [NotMapped]
        public string Fullname => Name + " " + Surname;

        public string? Image { get; set; }

        [MinLength(3, ErrorMessage = "{0} {1} karakterden küçük olamaz")]
        [MaxLength(256, ErrorMessage = "{0} {1} karakterden büyük olamaz")]
        [EmailAddress(ErrorMessage = "Geçerli Mail Adresi giriniz")]
        public string Email { get; set; }
        public string Password { get; set; }
        public virtual Customer Customer { get; set; }
        public int CustomerID { get; set; }

    }
}
