using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
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
                return "";
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
            return "";
        }

        public async Task<IQueryable<Module>> GetModule()
        {
            var model = GetNonDeletedAndActive<Module>(t => true);
            return model;
        }

        public async Task<List<ResponsibleDevextremeSelectListHelper>> GetProject()
        {
            try
            {
                List<ResponsibleDevextremeSelectListHelper> ResponsibleHelpers = new List<ResponsibleDevextremeSelectListHelper>();
                var model = context.Projects
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

        public async Task<string> UpdateModule(Module model)
        {
            try
            {
                Update(model);
                await _unitOfWork.SaveChanges();
                return "";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
