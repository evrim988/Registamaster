using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RegistaMaster.Api.Extensions;
using RegistaMaster.Infasctructure.Registiration;
using RegistaMaster.Infasctructure.Repositories;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
string connString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDatabase(connString);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSession();
builder.Services.MyRepository();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSwaggerGen();
//Auth
var issur = builder.Configuration["JwtConfig:Issuer"];
var audience = builder.Configuration["JwtConfig:Audience"];
var signingKey = builder.Configuration["JwtConfig:SigningKey"];
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = issur,
        ValidAudience = audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey))
    };
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseSession();
app.UseLog();
app.UseHttpsRedirection();
app.UseAuthentication(); // Önce
app.UseAuthorization();

app.MapControllers();

app.Run();
