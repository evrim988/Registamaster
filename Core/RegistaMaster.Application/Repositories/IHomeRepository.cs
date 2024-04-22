using RegistaMaster.Domain.DTOModels.ChartModels;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using Action = RegistaMaster.Domain.Entities.Action;

namespace RegistaMaster.Application.Repositories;

public interface IHomeRepository : IRepository
{
    Task<List<ActionDTO>> GetActionDtoHome();
    Task<ChartDTO> AdminChart();
    Task<List<UserChartDTO>> AdminChartUserActions();
    Task<ChartDTO> TeamLeaderChart(int ID);
    Task<UserChartDTO> DeveloperChart(int ID);
}
