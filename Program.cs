using MesPortal;
using MesPortal.Extensions;
using MesPortal.Models;
using MesPortal.Services;
using MesPortal.Utilities;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Hosting.Internal;
using Syncfusion.Blazor;
using Syncfusion.Licensing;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

#region Host & HttpClient Services

var applicationSettingsSection = builder.Configuration.GetSection("ApplicationSettings");
var host = new HostingEnvironment
{
	EnvironmentName = builder.HostEnvironment.Environment,
	ApplicationName = builder.HostEnvironment.BaseAddress
};

var setting = builder.Services.Configure<ApplicationSettings>(options => {
	applicationSettingsSection.Bind(host);
});
setting.AddMesPortalServices(applicationSettingsSection.Get<ApplicationSettings>());
builder.Services.AddSingleton<IHostEnvironment>(host);

builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<BaseObjectService>();
builder.Services.AddScoped<AppAuthenticationStateProvider>();
builder.Services.AddScoped<AuthenticationStateProvider>(sp => sp.GetRequiredService<AppAuthenticationStateProvider>());
builder.Services.AddAuthorizationCore();
#endregion

#region Syncfusion

SyncfusionLicenseProvider.RegisterLicense(
"MzA2NTE4M0AzMjM0MmUzMDJlMzBheS9wQ0NRWGp1VDBQVHN1c2dGZHBtekJKMjhIM1JrQW51K2tQcUxscW44PQ==");
builder.Services.AddSyncfusionBlazor(options => {
	options.Animation = GlobalAnimationMode.Enable;
	options.EnableRtl = false;
	options.EnableRippleEffect = true;
});

#endregion
var app = builder.Build();
Console.WriteLine("Client App start");
await app.RunAsync();
Console.WriteLine("Client App close");
