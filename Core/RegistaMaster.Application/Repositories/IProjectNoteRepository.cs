using Microsoft.AspNetCore.Mvc.Rendering;
using RegistaMaster.Domain.DTOModels.Entities.ProjectNoteModel;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using RegistaMaster.Domain.Entities;

namespace RegistaMaster.Application.Repositories;

public interface IProjectNoteRepository : IRepository
{
  Task<string> ProjectNoteAdd(ProjectNote projectNote);
  Task<string> UpdateProjectNote(ProjectNoteDTO model);
  void Delete(int id);
  Task<IQueryable<ProjectNoteDTO>> GetList();
  Task<List<ResponsibleDevextremeSelectListHelper>> GetProject();
  Task<string> DeleteNoteWithProjectID(int ID);
  List<SelectListItem> CreatedBySelectList();
  Task<string> GetProjectNotes(int ID);
  Task<string> CheckRequest(int ID);


}
