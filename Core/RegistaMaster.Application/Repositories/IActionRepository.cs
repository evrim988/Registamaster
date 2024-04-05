using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.DTOModels.Entities.ActionNoteModels;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using Action = RegistaMaster.Domain.Entities.Action;

namespace RegistaMaster.Application.Repositories;

public interface IActionRepository : IRepository
{
  IQueryable<ActionDTO> GetList();
  Task<string> ActionUpdate(ActionDTO model);
  string Delete(int ID);
  Task<ActionPageDTO> GetAction(int ID);
  Task<List<SelectListItem>> ResponsiblehelperModelList();
  Task<List<ResponsibleDevextremeSelectListHelper>> GetRequest();
  Task<List<SelectListItem>> ActionProrityStatusList();
  List<ActionDTO> GetActionsByRequestID(int ID);
  Task<string> ChangeActionStatus(ActionPageDTO model);
  Task<string> ActionNoteUpdate(ActionNoteDTO model);
  Task<string> ActionDelete(int ID);
  Task<string> AddAction(Action model);
}
