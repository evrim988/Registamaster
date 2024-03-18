using RegistaMaster.Domain.DTOModels.ChartModels;
using RegistaMaster.Domain.DTOModels.Entities.ActionModels;
using RegistaMaster.Domain.Enums;

namespace RegistaMaster.Application.Repositories;

public interface IHomeRepository : IRepository
{
    public Task<IQueryable<Domain.Entities.Task>> GetTaskHome();
    public Task<IQueryable<Domain.Entities.Action>> GetActionHome();
    public Task<List<ActionDTO>> GetActionDtoHome();
    public Task<ChartDTO> AdminChart();
    public Task<List<UserChartDTO>> AdminChartUserActions();
    public Task<ChartDTO> TeamLeaderChart(int ID);
    public Task<UserChartDTO> DeveloperChart(int ID);
}
