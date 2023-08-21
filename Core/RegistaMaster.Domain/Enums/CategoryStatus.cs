using System.ComponentModel.DataAnnotations;

namespace RegistaMaster.Domain.Enums;

public enum CategoryStatus
{
    [Display(Name = "Sınıflandırılmamış")]
    Unclassified = 0,

    [Display(Name = "Yeni Fonksiyon")]
    NewFunction = 1,

    [Display(Name = "Hata Giderme")]
    Troubleshooting = 2,

    [Display(Name = "Veri Düzenleme")]
    DataEditing = 3,

    [Display(Name = "Uyumluluk")]
    Compatibility = 4,
}
