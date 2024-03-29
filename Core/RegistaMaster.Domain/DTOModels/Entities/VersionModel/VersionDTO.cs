namespace RegistaMaster.Domain.DTOModels.Entities.VersionModel
{
  public class VersionDTO
  {
    public int ID { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public DateTime Date { get; set; }
    public bool DatabaseChange { get; set; }
    public bool IsNewVersion { get; set; }
    public int ProjectID { get; set; }
  }
}
