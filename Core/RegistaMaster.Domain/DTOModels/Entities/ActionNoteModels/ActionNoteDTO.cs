using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Domain.DTOModels.Entities.ActionNoteModels
{
  public class ActionNoteDTO
  {
    public int ID { get; set; }
    public int ActionID { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
  }
}
