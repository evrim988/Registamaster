using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.FoodCharts;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistaMaster.Persistance.RegistaMasterContextes;

namespace RegistaMaster.Infasctructure.Repositories;

public class FoodChartRepository : Repository, IFoodChartRepository
{
  private readonly RegistaMasterContext _context;
  private readonly SessionModel _session;
  private readonly IUnitOfWork _uow;

  public FoodChartRepository(RegistaMasterContext context, SessionModel session, IUnitOfWork uow) : base(context, session)
  {
    _context = context;
    _session = session;
    _uow = uow;
  }

  public async Task<string> AddFoodChart(FoodChart model)
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

  public void Delete(int ID)
  {
    try
    {
      var foodChart = GetNonDeletedAndActive<FoodChart>(t => t.ID == ID);
      DeleteRange(foodChart.ToList());
      Delete<FoodChart>(ID);
    }
    catch (Exception e)
    {

      throw e;
    }
  }

  public IQueryable<FoodChartsDTO> GetList()
  {
    try
    {
      return GetQueryable<FoodChart>(t => t.ObjectStatus == ObjectStatus.NonDeleted).Select(s => new FoodChartsDTO()
      {
        ID = s.ID,
        Date = s.Date,
        PersonNumber = s.PersonNumber
      });
    }
    catch (Exception e)
    {
      throw e;
    } 
  }

  public async Task<string> UpdateFoodChart(FoodChart model)
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
}


