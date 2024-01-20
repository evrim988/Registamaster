using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegistaMaster.Persistance.Migrations
{
    public partial class _1010 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectNotes_Projects_ProjectID",
                table: "ProjectNotes");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectID",
                table: "ProjectNotes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectNotes_Projects_ProjectID",
                table: "ProjectNotes",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectNotes_Projects_ProjectID",
                table: "ProjectNotes");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectID",
                table: "ProjectNotes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectNotes_Projects_ProjectID",
                table: "ProjectNotes",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
