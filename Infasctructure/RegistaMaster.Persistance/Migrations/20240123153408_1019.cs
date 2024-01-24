using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegistaMaster.Persistance.Migrations
{
    public partial class _1019 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_Actions_ActionID1",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_ActionID1",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "ActionID",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "ActionID1",
                table: "Requests");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ActionID",
                table: "Requests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ActionID1",
                table: "Requests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Requests_ActionID1",
                table: "Requests",
                column: "ActionID1");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Actions_ActionID1",
                table: "Requests",
                column: "ActionID1",
                principalTable: "Actions",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
