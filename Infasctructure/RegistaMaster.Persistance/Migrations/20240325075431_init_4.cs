using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegistaMaster.Persistance.Migrations
{
    public partial class init_4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FinishDate",
                table: "Actions");

            migrationBuilder.AddForeignKey(
                name: "FK_ActionNotes_Actions_ActionID",
                table: "ActionNotes",
                column: "ActionID",
                principalTable: "Actions",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActionNotes_Actions_ActionID",
                table: "ActionNotes");

            migrationBuilder.AddColumn<DateTime>(
                name: "FinishDate",
                table: "Actions",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
