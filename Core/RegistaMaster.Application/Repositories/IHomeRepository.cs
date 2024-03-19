using RegistaMaster.Domain.DTOModels.ChartModels;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using Action = RegistaMaster.Domain.Entities.Action;

namespace RegistaMaster.Application.Repositories;

public interface IHomeRepository : IRepository
{
    public Task<IQueryable<Action>> GetActionHome();
    public Task<List<ActionDTO>> GetActionDtoHome();
    public Task<ChartDTO> AdminChart();
    public Task<List<UserChartDTO>> AdminChartUserActions();
    public Task<ChartDTO> TeamLeaderChart(int ID);
    public Task<UserChartDTO> DeveloperChart(int ID);
}
