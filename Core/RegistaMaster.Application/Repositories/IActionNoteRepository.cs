using RegistaMaster.Domain.DTOModels.Entities.ActionNoteModels;
using RegistaMaster.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Application.Repositories
{
  public interface IActionNoteRepository : IRepository
  {
    IQueryable<ActionNoteDTO> GetList(int ID);
    Task<string> AddActionNote(ActionNote model);
    Task<string> ActionNoteUpdate(ActionNote model);
    string Delete(int ID);
  }
}
