using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.ModuleModel;
using RegistaMaster.Domain.DTOModels.Entities.VersionModel;
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

  public async Task<string> AddVersion(VersionDTO model)
  {
    try
    {
      var olderVersion = GetVersionName(model.ProjectID);
      if (olderVersion != 0)
      {
        if (model.IsNewVersion)
        {
          model.Name = "V" + (olderVersion + 0.1).ToString(".#").Replace(',', '.');
          if (!model.Name.Contains('.'))
            model.Name += ".0";
        }
        else
          model.Name = "V" + olderVersion.ToString(".#").Replace(',', '.');
      }
      
      await _uow.Repository.Add(new Version()
      {
        Name = model.Name,
        Date = DateTime.Now,
        Description = model.Description,
        DatabaseChange = model.DatabaseChange,
        ProjectID = model.ProjectID,
      });
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

  public async Task<IQueryable<VersionDTO>> GetList()
  {
    var model = GetNonDeletedAndActive<Version>(t => t.ObjectStatus == ObjectStatus.NonDeleted && t.Status == Status.Active).Select(s => new VersionDTO()
    {
      ID = s.ID,
      Name = s.Name,
      Date = s.Date,
      ProjectID = s.ProjectID,
      Description = s.Description,
      DatabaseChange = s.DatabaseChange,
    });
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
    var versions = GetNonDeletedAndActive<Version>(t => t.ProjectID == ID);
    if (versions.Count() != 0)
    {
      var version = versions.OrderBy(t => t.ID).Last();
      var versionName = version.Name.Replace('.', ',').Replace("V", "");
      return Convert.ToDouble(versionName);
    }
    return 0;
  }

  public async Task<string> UpdateVersion(VersionDTO model)
  {
    try
    {
      var olderVersion = GetVersionName(model.ProjectID);
      if (olderVersion != 0)
      {
        if (model.IsNewVersion)
        {
          model.Name = "V" + (olderVersion + 0.1).ToString(".#").Replace(',', '.');
          if (!model.Name.Contains('.'))
            model.Name += ".0";
        }
        else
          model.Name = "V" + olderVersion.ToString(".#").Replace(',', '.');
      }
      var version = await GetById<Version>(model.ID);
      version.Name = model.Name;
      version.Description = model.Description;
      version.ProjectID = model.ProjectID;
      version.Date = model.Date;
      version.DatabaseChange = model.DatabaseChange;
      Update(version);
      await _uow.SaveChanges();
      return "1";
    }
    catch (Exception e)
    {

      throw e;
    }
    
  }
}
