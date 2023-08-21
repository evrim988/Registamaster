namespace RegistaMaster.Domain.DTOModels.SecurityModels;

public class SessionModel
{
    public int ID { get; set; }

    public string Name { get; set; }

    public string Surname { get; set; }

    public string FullName => Name + " " + Surname;

    public string Image { get; set; }

    public int CustomerID { get; set; }
}
