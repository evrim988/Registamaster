using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegistaMaster.Persistance.Migrations
{
    public partial class _1003 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Version",
                table: "Requests");

            migrationBuilder.AddColumn<int>(
                name: "VersionID",
                table: "Requests",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Requests_VersionID",
                table: "Requests",
                column: "VersionID");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Versions_VersionID",
                table: "Requests",
                column: "VersionID",
                principalTable: "Versions",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_Versions_VersionID",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_VersionID",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "VersionID",
                table: "Requests");

            migrationBuilder.AddColumn<string>(
                name: "Version",
                table: "Requests",
                type: "longtext",
                nullable: true);
        }
    }
}
