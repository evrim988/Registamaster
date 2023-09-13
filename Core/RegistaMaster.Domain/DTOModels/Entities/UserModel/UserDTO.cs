using RegistaMaster.Domain.Enums;

namespace RegistaMaster.Domain.DTOModels.Entities.UserModel
{
    public class UserDTO
    {
        public string Name { get; set; }    
        public string Surname { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public AuthorizationStatus AuthorizationStatus { get; set; }
    }
}
