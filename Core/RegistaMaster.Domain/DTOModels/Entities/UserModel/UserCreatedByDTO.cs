namespace RegistaMaster.Domain.DTOModels.Entities.UserModel
{
   public class UserCreatedByDTO
   {
      public int ID { get; set; }
      public string Name { get; set; }
      public string Surname { get; set; }
      public string Fullname => Name + " " + Surname;
   }
}
