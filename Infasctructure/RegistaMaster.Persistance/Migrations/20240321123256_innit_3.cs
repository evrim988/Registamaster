using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegistaMaster.Persistance.Migrations
{
    public partial class innit_3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DatabaseChangeStatus",
                table: "Versions");

            migrationBuilder.AddColumn<bool>(
                name: "DatabaseChange",
                table: "Versions",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DatabaseChange",
                table: "Versions");

            migrationBuilder.AddColumn<int>(
                name: "DatabaseChangeStatus",
                table: "Versions",
                type: "integer",
                nullable: true);
        }
    }
}
