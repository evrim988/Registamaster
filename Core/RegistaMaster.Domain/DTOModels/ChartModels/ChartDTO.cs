using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Domain.DTOModels.ChartModels
{
    public class ChartDTO
    {
        public int RequestOpen { get; set; }
        public int RequestStart { get; set; }
        public int RequestClosed { get; set; }
        public int RequestCancel { get; set; }
        public int ActionNotStarted { get; set; }
        public int ActionContinued { get; set; }
        public int ActionCompleted { get; set; }
        public int ActionCancel { get; set; }
        public UserChartDTO UserChartDTO { get; set; }
    }
}
