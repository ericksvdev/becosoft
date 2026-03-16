var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

#if DEBUG
builder.Services.AddSassCompiler();
#endif

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=ProductDetails}/{action=Detail}/{id?}");

app.Run();
