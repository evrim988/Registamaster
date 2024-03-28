﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using RegistaMaster.Persistance.RegistaMasterContextes;

#nullable disable

namespace RegistaMaster.Persistance.Migrations
{
    [DbContext(typeof(RegistaMasterContext))]
    partial class RegistaMasterContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.21")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("RegistaMaster.Domain.Entities.Action", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<string>("ActionDescription")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("ActionPriorityStatus")
                        .HasColumnType("integer");

                    b.Property<int>("ActionStatus")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CompleteDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastModifiedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("ObjectStatus")
                        .HasColumnType("integer");

                    b.Property<DateTime>("OpeningDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("RequestID")
                        .HasColumnType("integer");

                    b.Property<int>("RequestStatus")
                        .HasColumnType("integer");

                    b.Property<int>("ResponsibleID")
                        .HasColumnType("integer");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("RequestID");

                    b.HasIndex("ResponsibleID");

                    b.ToTable("Actions");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.ActionNote", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<int>("ActionID")
                        .HasColumnType("integer");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastModifiedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("ObjectStatus")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("ActionID");

                    b.ToTable("ActionNotes");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.Customer", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<string>("Address")
                        .HasMaxLength(600)
                        .HasColumnType("character varying(600)");

                    b.Property<string>("ApiKey")
                        .HasColumnType("text");

                    b.Property<string>("ContactEmail")
                        .HasColumnType("text");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int?>("CustomerDescriptionID")
                        .HasColumnType("integer");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("EmailHost")
                        .HasColumnType("text");

                    b.Property<string>("EmailPassword")
                        .HasColumnType("text");

                    b.Property<string>("EmailPort")
                        .HasColumnType("text");

                    b.Property<bool>("EnableSsl")
                        .HasColumnType("boolean");

                    b.Property<string>("LastModifiedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("character varying(150)");

                    b.Property<int>("ObjectStatus")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.ErrorLog", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<int>("ClientID")
                        .HasColumnType("integer");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("ErrorDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("ErrorDesc")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastModifiedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("MemberID")
                        .HasColumnType("integer");

                    b.Property<string>("NameSurname")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("ObjectStatus")
                        .HasColumnType("integer");

                    b.Property<int>("ProjectID")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("ProjectID");

                    b.ToTable("ErrorLogs");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.HealthCheck", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<int>("CreatedBy")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastModifiedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("ObjectStatus")
                        .HasColumnType("integer");

                    b.Property<int>("ProjectID")
                        .HasColumnType("integer");

                    b.Property<DateTime>("RequestDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("RequestDesc")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("RequestStatus")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("ProjectID");

                    b.ToTable("HealthChecks");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.Module", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<int>("CreatedBy")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Key")
                        .HasColumnType("text");

                    b.Property<string>("LastModifiedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("ObjectStatus")
                        .HasColumnType("integer");

                    b.Property<int>("ProjectID")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("ProjectID");

                    b.ToTable("Modules");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.Project", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<int>("CreatedBy")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastModifiedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("ObjectStatus")
                        .HasColumnType("integer");

                    b.Property<string>("ProjectDescription")
                        .HasColumnType("text");

                    b.Property<Guid>("ProjectGuid")
                        .HasColumnType("uuid");

                    b.Property<string>("ProjectName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.ProjectNote", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<string>("AddUserNote")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int?>("CustomerID")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastModifiedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("NoteType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("ObjectStatus")
                        .HasColumnType("integer");

                    b.Property<int?>("ProjectID")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("CustomerID");

                    b.HasIndex("ProjectID");

                    b.ToTable("ProjectNotes");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.Request", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<string>("Category")
                        .HasColumnType("text");

                    b.Property<int?>("CategoryID")
                        .HasColumnType("integer");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int?>("CustomerID")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("LastModifiedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int?>("ModuleID")
                        .HasColumnType("integer");

                    b.Property<int>("NotificationID")
                        .HasColumnType("integer");

                    b.Property<string>("NotificationType")
                        .HasColumnType("text");

                    b.Property<int>("NotificationTypeCNC")
                        .HasColumnType("integer");

                    b.Property<int?>("NotificationTypeID")
                        .HasColumnType("integer");

                    b.Property<int>("ObjectStatus")
                        .HasColumnType("integer");

                    b.Property<string>("PageURL")
                        .HasColumnType("text");

                    b.Property<string>("PictureURL")
                        .HasColumnType("text");

                    b.Property<DateTime>("PlanedEndDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("ProjectID")
                        .HasColumnType("integer");

                    b.Property<int>("RequestStatus")
                        .HasColumnType("integer");

                    b.Property<string>("RequestSubject")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<int?>("VersionID")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("CustomerID");

                    b.HasIndex("ModuleID");

                    b.HasIndex("ProjectID");

                    b.HasIndex("VersionID");

                    b.ToTable("Requests");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.Task", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<int>("CreatedBy")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("CustomerID")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Image")
                        .HasColumnType("text");

                    b.Property<string>("LastModifiedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("ObjectStatus")
                        .HasColumnType("integer");

                    b.Property<DateTime>("PlanedEnd")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("PlanedStart")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("PriorityStatus")
                        .HasColumnType("integer");

                    b.Property<int>("RequestID")
                        .HasColumnType("integer");

                    b.Property<int>("ResponsibleID")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<int>("TaskStatus")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("CustomerID");

                    b.HasIndex("RequestID");

                    b.ToTable("Tasks");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<int>("AuthorizationStatus")
                        .HasColumnType("integer");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("CustomerID")
                        .HasColumnType("integer");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("Image")
                        .HasColumnType("text");

                    b.Property<string>("LastModifiedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("character varying(150)");

                    b.Property<int>("ObjectStatus")
                        .HasColumnType("integer");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("character varying(150)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("CustomerID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.UserLog", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<int?>("ClientID")
                        .HasColumnType("integer");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastModifiedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("LoginDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int?>("MemberID")
                        .HasColumnType("integer");

                    b.Property<string>("NameSurname")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("ObjectStatus")
                        .HasColumnType("integer");

                    b.Property<int>("ProjectID")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("ProjectID");

                    b.ToTable("UserLogs");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.Version", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<int>("CreatedBy")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<bool>("DatabaseChange")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("LastModifiedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedOn")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("ObjectStatus")
                        .HasColumnType("integer");

                    b.Property<int>("ProjectID")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("ProjectID");

                    b.ToTable("Versions");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.Action", b =>
                {
                    b.HasOne("RegistaMaster.Domain.Entities.Request", "Request")
                        .WithMany("Actions")
                        .HasForeignKey("RequestID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RegistaMaster.Domain.Entities.User", "Responsible")
                        .WithMany()
                        .HasForeignKey("ResponsibleID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Request");

                    b.Navigation("Responsible");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.ActionNote", b =>
                {
                    b.HasOne("RegistaMaster.Domain.Entities.Action", "Action")
                        .WithMany("ActionNotes")
                        .HasForeignKey("ActionID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Action");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.ErrorLog", b =>
                {
                    b.HasOne("RegistaMaster.Domain.Entities.Project", "Project")
                        .WithMany()
                        .HasForeignKey("ProjectID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.HealthCheck", b =>
                {
                    b.HasOne("RegistaMaster.Domain.Entities.Project", "Project")
                        .WithMany()
                        .HasForeignKey("ProjectID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.Module", b =>
                {
                    b.HasOne("RegistaMaster.Domain.Entities.Project", "Project")
                        .WithMany()
                        .HasForeignKey("ProjectID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.ProjectNote", b =>
                {
                    b.HasOne("RegistaMaster.Domain.Entities.Customer", null)
                        .WithMany("ProjectNotes")
                        .HasForeignKey("CustomerID");

                    b.HasOne("RegistaMaster.Domain.Entities.Project", "Project")
                        .WithMany("ProjectNotes")
                        .HasForeignKey("ProjectID");

                    b.Navigation("Project");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.Request", b =>
                {
                    b.HasOne("RegistaMaster.Domain.Entities.Customer", null)
                        .WithMany("Requests")
                        .HasForeignKey("CustomerID");

                    b.HasOne("RegistaMaster.Domain.Entities.Module", "Module")
                        .WithMany()
                        .HasForeignKey("ModuleID");

                    b.HasOne("RegistaMaster.Domain.Entities.Project", "Project")
                        .WithMany("Requests")
                        .HasForeignKey("ProjectID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RegistaMaster.Domain.Entities.Version", "Version")
                        .WithMany()
                        .HasForeignKey("VersionID");

                    b.Navigation("Module");

                    b.Navigation("Project");

                    b.Navigation("Version");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.Task", b =>
                {
                    b.HasOne("RegistaMaster.Domain.Entities.Customer", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RegistaMaster.Domain.Entities.Request", "Request")
                        .WithMany("Tasks")
                        .HasForeignKey("RequestID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");

                    b.Navigation("Request");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.User", b =>
                {
                    b.HasOne("RegistaMaster.Domain.Entities.Customer", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.UserLog", b =>
                {
                    b.HasOne("RegistaMaster.Domain.Entities.Project", "Project")
                        .WithMany()
                        .HasForeignKey("ProjectID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.Version", b =>
                {
                    b.HasOne("RegistaMaster.Domain.Entities.Project", "Project")
                        .WithMany()
                        .HasForeignKey("ProjectID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.Action", b =>
                {
                    b.Navigation("ActionNotes");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.Customer", b =>
                {
                    b.Navigation("ProjectNotes");

                    b.Navigation("Requests");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.Project", b =>
                {
                    b.Navigation("ProjectNotes");

                    b.Navigation("Requests");
                });

            modelBuilder.Entity("RegistaMaster.Domain.Entities.Request", b =>
                {
                    b.Navigation("Actions");

                    b.Navigation("Tasks");
                });
#pragma warning restore 612, 618
        }
    }
}
