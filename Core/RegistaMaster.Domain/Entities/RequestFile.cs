namespace RegistaMaster.Domain.Entities
{
  public class RequestFile : BaseEntitiy
  {
    public string FileURL { get; set; }
    public int RequestID { get; set; }
    public Request Request { get; set; }
  }
}
