namespace RegistaMaster.Domain.Entities
{
  public class ActionNote : BaseEntitiy
  {
    public int ActionID { get; set; }
    public Action Action { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
  }
}
