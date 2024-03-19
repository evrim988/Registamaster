using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Domain.DTOModels.Entities.ProjectModel
{
    public class ProjectDTO
    {
        public int ID { get; set; }
        public string ProjectName { get; set; }
        public string? ProjectDescription { get; set; }

    }
}
