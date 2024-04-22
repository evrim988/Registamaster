using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ProjectNoteModel;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistaMaster.Persistance.RegistaMasterContextes;

namespace RegistaMaster.Infasctructure.Repositories;

public class ProjectNoteRepository : Repository, IProjectNoteRepository
{
  private readonly IUnitOfWork _uow;
  private readonly SessionModel _session;
  private readonly RegistaMasterContext _context;
  public ProjectNoteRepository(RegistaMasterContext context, SessionModel session, IUnitOfWork uow) : base(context, session)
  {
    _context = context;
    _uow = uow;
    _session = session;
  }

  public async Task<string> ProjectNoteAdd(ProjectNote model)
  {
    try
    {
      model.Date = DateTime.Now;
      await _uow.Repository.Add(model);
      await _uow.SaveChanges();
      return "1";
    }
    catch (Exception e)
    {

      throw e;
    }
  }

  public void Delete(int id)
  {
    var project = GetNonDeletedAndActive<ProjectNote>(t => t.ID == id);
    DeleteRange(project.ToList());
    Delete<ProjectNote>(id);
  }

  public async Task<IQueryable<ProjectNoteDTO>> GetList()
  {
    try
    {
      return GetNonDeletedAndActive<ProjectNote>(t => t.ObjectStatus == ObjectStatus.NonDeleted).Select(s => new ProjectNoteDTO()
      {
        ID = s.ID,
        Date = s.Date,
        Description = s.Description,
      });
    }
    catch (Exception ex)
    {
      throw ex;
    }

  }
  public async Task<string> UpdateProjectNote(ProjectNoteDTO model)
  {
    var note = await GetById<ProjectNote>(model.ID);
    note.NoteType = model.NoteType;
    note.Description = model.Description;
    Update(note);
    await _uow.SaveChanges();
    return "1";
  }
  public async Task<List<ResponsibleDevextremeSelectListHelper>> GetProject()
  {
    try
    {
      List<ResponsibleDevextremeSelectListHelper> ResponsibleHelpers = new List<ResponsibleDevextremeSelectListHelper>();
      var model = _context.Projects
          .Where(t => true);
      foreach (var item in model)
      {
        ResponsibleDevextremeSelectListHelper helper = new ResponsibleDevextremeSelectListHelper()
        {
          ID = item.ID,
          Name = item.ProjectName,
        };
        ResponsibleHelpers.Add(helper);
      }
      return ResponsibleHelpers;
    }
    catch (Exception e)
    {
      throw e;
    }
  }

  public async Task<string> DeleteNoteWithProjectID(int ID)
  {
    var project = GetNonDeletedAndActive<ProjectNote>(t => t.ProjectID == ID);
    await DeleteRange(project.ToList());
    return "1";
  }

  public List<SelectListItem> CreatedBySelectList()
  {
    var list = GetNonDeletedAndActive<User>(t => true).Select(user => new SelectListItem
    {
      Value = user.ID.ToString(),
      Text = user.Fullname,
    }).ToList();

    return list;
  }
  public async Task<string> GetProjectNotes(int ID)
  {
    try
    {
      var notes = GetNonDeletedAndActive<ProjectNote>(t => t.ProjectID == ID).Select(p => new ProjectNoteDTO
      {
        Date = p.CreatedOn,
        Description = p.Description,
        ID = p.ID,
        NoteType = p.NoteType,
        CreatedBy = p.CreatedBy,
      });

      return JsonConvert.SerializeObject(notes);
    }
    catch (Exception ex)
    {

      throw ex;
    }
  }
  public async Task<string> CheckRequest(int ID)
  {
    try
    {
      if (_uow.Repository.GetNonDeletedAndActive<Request>(t => t.ProjectID == ID && t.RequestStatus != RequestStatus.Closed).Count() != 0)
        return "-1";
      return "1";
    }
    catch (Exception e)
    {
      throw e;
    }
  }
}
