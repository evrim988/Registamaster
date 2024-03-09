using RegistaMaster.Infasctructure.Registiration;
using RegistaMaster.Infasctructure.Repositories;
var builder = WebApplication.CreateBuilder();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(150);
});
// Add services to the container.
builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();
string connString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDatabase(connString);
builder.Services.MyRepository();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseSession();
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
