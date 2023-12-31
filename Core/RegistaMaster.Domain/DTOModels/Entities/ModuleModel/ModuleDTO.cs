﻿using System.ComponentModel;

namespace RegistaMaster.Domain.DTOModels.Entities.ModuleModel;

public class ModuleDTO
{
    [DisplayName("Modül Adı")]
    public string Name { get; set; }

    [DisplayName("Modül Açıklaması")]
    public string Description { get; set; }
    public string Key { get; set; }
}
