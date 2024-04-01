using RegistaMaster.Domain.DTOModels.ChartModels;
using RegistaMaster.Domain.DTOModels.Entities.ActionNoteModels;
using RegistaMaster.Domain.DTOModels.Entities.FoodCharts;
using RegistaMaster.Domain.Entities;

namespace RegistaMaster.Application.Repositories;

public interface IFoodChartRepository:IRepository
{
  IQueryable<FoodChartsDTO> GetList();
  public Task<string> AddFoodChart(FoodChart model);
  public Task<string> UpdateFoodChart(FoodChart model);
  public void Delete(int ID);
  public  Task<List<MonthDTO>> GetChart(int year);
  public Task<string> AddFoodChartsFromExcel(Stream fileStream);
  public Task<int> CheckRecordForDate(DateTime date);
}
