using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.DTOModels.Entities.RequestModel;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistPackets.FileService.Models;


namespace RegistaMaster.Application.Repositories;

public interface IRequestRepository : IRepository
{
  Task<Request> RequestAdd(Request request);
  Task<Request> UpdateRequest(RequestGridDTO request);
  void Delete(int id);
  Task<List<RequestGridDTO>> GetList();
  Task<List<ResponsibleDevextremeSelectListHelper>> GetProject();
  Task<List<ResponsibleDevextremeSelectListHelper>> GetCustomer();
  Task<List<ResponsibleDevextremeSelectListHelper>> GetModuleSelect();
  Task<List<ResponsibleDevextremeSelectListHelper>> GetVersionSelect();
  Task<List<ActionDTO>> GetActionDetail(int RequestId);
  Task<List<RequestGridDTO>> GetListWithFiles();
  Task<string> ActionStatusChangeUpdate(int ID, ActionStatus actionStatus);
  Task<List<SelectListItem>> NotificationTypeSelectList();
  Task<List<SelectListItem>> CategorySelectList();
  Task<List<SelectListItem>> GetProjectSelect();
  Task<List<SelectListItem>> GetModule();
  Task<List<SelectListItem>> GetModuleList(int ID);
  Task<List<SelectListItem>> GetVersion();
  Task<List<SelectListItem>> ResponsibleSelectList();
  Task<List<SelectListItem>> GetVersionList(int ID);
  Task<string> CompleteRequest(int ID);
  Task<string> AddRequestFiles(List<IFormFile> files, int ID);
  Task<string> DeleteRequestFiles(List<string> fileIDs);
  Task<string> DeleteFilesWithRequestID(int ID);
  Task<string> RequestDeleteWithActions(int ID);
}
