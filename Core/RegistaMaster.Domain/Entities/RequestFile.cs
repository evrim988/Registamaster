namespace RegistaMaster.Domain.Entities
{
  public class RequestFile : BaseEntitiy
  {
    public string FileName { get; set; }
    public string FileURL { get; set; }
    public int RequestID { get; set; }
  }
}
