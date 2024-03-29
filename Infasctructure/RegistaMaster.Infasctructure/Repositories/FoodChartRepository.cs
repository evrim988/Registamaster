using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.ChartModels;
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

  public async Task<List<MonthDTO>> GetChart(int year)
  {
    var chart = new FoodChartDTO();
    var food = GetNonDeletedAndActive<FoodChart>(t => t.Date.Year == year);
    for (int month = 1; month <= 12; month++)
    {
      var monthFood = food.Where(t => t.Date.Month == month).ToList();
      foreach (var item in monthFood)
      {
        switch (month)
        {
          case 1: chart.January += item.PersonNumber; break;
          case 2: chart.February += item.PersonNumber; break;
          case 3: chart.March += item.PersonNumber; break;
          case 4: chart.April += item.PersonNumber; break;
          case 5: chart.May += item.PersonNumber; break;
          case 6: chart.June += item.PersonNumber; break;
          case 7: chart.July += item.PersonNumber; break;
          case 8: chart.August += item.PersonNumber; break;
          case 9: chart.September += item.PersonNumber; break;
          case 10: chart.October += item.PersonNumber; break;
          case 11: chart.November += item.PersonNumber; break;
          case 12: chart.December += item.PersonNumber; break;
        }
      }
    }
    List<MonthDTO> monthDTOs = new List<MonthDTO>();
    monthDTOs.Add(new MonthDTO()
    {
      MonthName = "Ocak",
      Count = chart.January
    });
    monthDTOs.Add(new MonthDTO()
    {
      MonthName = "Şubat",
      Count = chart.February
    }); 
    monthDTOs.Add(new MonthDTO()
    {
      MonthName = "MART",
      Count = chart.March
    });
    monthDTOs.Add(new MonthDTO()
    {
      MonthName = "NİSAN",
      Count = chart.April
    }); monthDTOs.Add(new MonthDTO()
    {
      MonthName = "MAYIS",
      Count = chart.May
    }); monthDTOs.Add(new MonthDTO()
    {
      MonthName = "HAZİRAN",
      Count = chart.June
    }); monthDTOs.Add(new MonthDTO()
    {
      MonthName = "TEMMUZ",
      Count = chart.July
    }); monthDTOs.Add(new MonthDTO()
    {
      MonthName = "AĞUSTOS",
      Count = chart.August
    }); monthDTOs.Add(new MonthDTO()
    {
      MonthName = "EYLÜL",
      Count = chart.September
    });
    monthDTOs.Add(new MonthDTO()
    {
      MonthName = "EKİM",
      Count = chart.October
    }); monthDTOs.Add(new MonthDTO()
    {
      MonthName = "KASIM",
      Count = chart.November
    });
    monthDTOs.Add(new MonthDTO()
    {
      MonthName = "ARALIK",
      Count = chart.December
    });
    return monthDTOs;
  }
  
}


