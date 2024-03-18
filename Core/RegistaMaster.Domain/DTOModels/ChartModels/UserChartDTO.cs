using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Domain.DTOModels.ChartModels
{
    public class UserChartDTO
    {
        public string UserFullName { get; set; }
        public int NotStarted { get; set; }
        public int Continued { get; set; }
        public int Completed { get; set; }
        public int Cancel { get; set; }
    }
}
