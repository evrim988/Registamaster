using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegistaMaster.Persistance.Migrations
{
    public partial class init_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_Modules_ModuleID",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_ModuleID",
                table: "Requests");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Requests_ModuleID",
                table: "Requests",
                column: "ModuleID");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Modules_ModuleID",
                table: "Requests",
                column: "ModuleID",
                principalTable: "Modules",
                principalColumn: "ID");
        }
    }
}
