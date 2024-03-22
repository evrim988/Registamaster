using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ActionNoteModels;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Persistance.RegistaMasterContextes;

namespace RegistaMaster.Infasctructure.Repositories;

public class ActionNoteRepository:Repository, IActionNoteRepository
{
  private readonly RegistaMasterContext _context;
  private readonly SessionModel _session;
  private readonly IUnitOfWork _uow;

  public ActionNoteRepository(RegistaMasterContext context,  IUnitOfWork uow, SessionModel session) :base(context,session)
  {
    _context = context;
    _session = session;
    _uow = uow;
  }

  public async Task<string> ActionNoteUpdate(ActionNote model)
  {
    try
    {
      Update(model);
      await _uow.SaveChanges();
      return "1";
    }
    catch (Exception e) 
    {

      throw e;
    }
  }

  public async Task<string> AddActionNote(ActionNote model)
  {
    try
    {
      await _uow.Repository.Add(model);
      await _uow.SaveChanges();
      return "1";
    }
    catch (Exception e)
    {

      throw e;
    }
  }

  public string Delete(int ID)
  {
    var actionNote = GetNonDeletedAndActive<ActionNote>(t => t.ID == ID);
    DeleteRange(actionNote.ToList());
    Delete<ActionNote>(ID);
    return "1";
  }

  public IQueryable<ActionNoteDTO> GetList(int ID)
  {
    try
    {
      return GetNonDeletedAndActive<ActionNote>(t =>t.ActionID==ID).Select(s => new ActionNoteDTO()
      {
        ID = s.ID,
        Title = s.Title,
        ActionID = s.ActionID,
        Description = s.Description,
      });
    }
    catch (Exception e)
    {

      throw e;
    }
  }
}
