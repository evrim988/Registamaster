using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RegistaMaster.Persistance.RegistaMasterContextes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RegistaMaster.Infasctructure.Registiration
{
    public static class Registiration
    {
        public static void AddDatabase(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<RegistaMasterContext>(options =>
            {
                //options.UseMySQL(connectionString);
                options.UseNpgsql(connectionString);
            });
        }
    }
}
