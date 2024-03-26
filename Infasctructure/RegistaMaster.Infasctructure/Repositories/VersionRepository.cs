using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistaMaster.Persistance.RegistaMasterContextes;
using System.Globalization;
using Version = RegistaMaster.Domain.Entities.Version;

namespace RegistaMaster.Infasctructure.Repositories;

public class VersionRepository : Repository, IVersionRepository
{
   private readonly IUnitOfWork _uow;
   private readonly SessionModel _session;
   private readonly RegistaMasterContext _context;
   public VersionRepository(RegistaMasterContext context, SessionModel session, IUnitOfWork uow) : base(context, session)
   {
      _uow = uow;
      _session = session;
      _context = context;
   }

   public async Task<string> AddVersion(Domain.Entities.Version model)
   {
      try
      {
         model.Date = DateTime.Now;
         await _uow.Repository.Add(model);
         await _uow.SaveChanges();
         return "1";
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }


   public string DeleteVersion(int ID)
   {
      var version = GetNonDeletedAndActive<Version>(t => t.ID == ID);
      DeleteRange(version.ToList());
      Delete<Version>(ID);
      return "1";
   }

   public async Task<IQueryable<Version>> GetList()
   {
      var model = GetNonDeletedAndActive<Version>(t => t.ObjectStatus == ObjectStatus.NonDeleted && t.Status == Status.Active);
      return model;
   }

   public async Task<string> UpdateVersion(Version model)
   {
      Update(model);
      await _uow.SaveChanges();
      return "1";
   }

   public async Task<string> DeleteVersionWithProjectID(int ID)
   {
      var version = GetNonDeletedAndActive<Version>(t => t.ProjectID == ID);
      await DeleteRange(version.ToList());
      return "1";
   }

   public double GetVersionName(int ID)
   {
      var version = GetNonDeletedAndActive<Version>(t => t.ProjectID == ID).OrderBy(t => t.ID).Last();
      var versionName = version.Name.Replace('.', ',').Replace("V", "");
      return Convert.ToDouble(versionName);
   }
}
