using MySqlX.XDevAPI.Relational;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ModuleModel;
using RegistaMaster.Domain.DTOModels.Entities.ProjectNoteModel;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistaMaster.Persistance.RegistaMasterContextes;

namespace RegistaMaster.Infasctructure.Repositories
{
   public class ModuleRepository : Repository, IModuleRepository
   {
      private readonly IUnitOfWork _unitOfWork;
      private readonly SessionModel _session;
      private readonly RegistaMasterContext _context;
      public ModuleRepository(RegistaMasterContext context, SessionModel session, IUnitOfWork uow) : base(context, session)
      {
         _context = context;
         _session = session;
         _unitOfWork = uow;
      }

      public async Task<string> CreateModule(Module model)
      {
         try
         {
            await _unitOfWork.Repository.Add(model);
            await _unitOfWork.SaveChanges();
            return "1";
         }
         catch (Exception ex)
         {
            throw ex;
         }
      }
      public string DeleteModule(int ID)
      {
         var module = GetNonDeletedAndActive<Module>(t => t.ID == ID);
         DeleteRange(module.ToList());
         Delete<Module>(ID);
         return "1";
      }

      public async Task<IQueryable<ModuleDTO>> GetModule()
      {
         try
         {
            return GetNonDeletedAndActive<Module>(t => t.ObjectStatus == ObjectStatus.NonDeleted).Select(s => new ModuleDTO()
            {
               ID = s.ID,
               Name = s.Name,
               Description = s.Description,
               ProjectID = s.ProjectID,               
            });
         }
         catch (Exception ex)
         {
            throw ex;
         }


      }

      public async Task<List<ResponsibleDevextremeSelectListHelper>> GetProject()
      {
         try
         {
            List<ResponsibleDevextremeSelectListHelper> ResponsibleHelpers = new List<ResponsibleDevextremeSelectListHelper>();
            var model = context.Projects
                .Where(t => t.Status == Status.Active && t.ObjectStatus == ObjectStatus.NonDeleted);
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

      public async Task<string> UpdateModule(Module model)
      {
         try
         {
            Update(model);
            await _unitOfWork.SaveChanges();
            return "1";
         }
         catch (Exception ex)
         {
            throw ex;
         }
      }

      public async Task<string> DeleteModuleWithProjectID(int ID)
      {
         var module = GetNonDeletedAndActive<Module>(t => t.ProjectID == ID);
         await DeleteRange(module.ToList());
         return "1";
      }

    public async Task<string> UpdateModule(ModuleDTO model)
    {
      var module = await GetById<Module>(model.ID);
      module.Name = model.Name;
      module.Description = model.Description;
      module.ProjectID = model.ProjectID;
      Update(module);
      await _unitOfWork.SaveChanges();
      return "1";
    }


  }
}
