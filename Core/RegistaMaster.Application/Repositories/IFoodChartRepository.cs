using Microsoft.AspNetCore.Http;
using RegistaMaster.Domain.DTOModels.ChartModels;
using RegistaMaster.Domain.DTOModels.Entities.ActionNoteModels;
using RegistaMaster.Domain.DTOModels.Entities.FoodCharts;
using RegistaMaster.Domain.Entities;

namespace RegistaMaster.Application.Repositories;

public interface IFoodChartRepository:IRepository
{
  IQueryable<FoodChartsDTO> GetList();
  Task<string> AddFoodChart(string values);
  Task<string> UpdateFoodChart(int key, string values);
  Task<string> DeleteFoodChart(int ID);
  Task<List<MonthDTO>> GetChart(int year);
  Task<string> AddFoodChartsFromExcel(Stream fileStream);
  Task<int> CheckRecordForDate(DateTime date);
  Task<string> UploadExcel(IFormFile file);
}
