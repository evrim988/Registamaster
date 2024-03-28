using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Domain.DTOModels.Entities.ProjectNoteModel
{
  public class ProjectNoteDTO
  {
    public int ID { get; set; }
    public DateTime? Date { get; set; }
    public string? NoteType { get; set; }
    public string? Description { get; set; }
    public int CreatedBy { get; set; }
  }
}
