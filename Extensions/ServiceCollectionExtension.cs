using LineControl.Models;
using LineControl.Services;
using LineControl.Services.Interfaces;

namespace LineControl.Extensions
{
	 public static class ServiceCollectionExtension
	 {
		  public static IServiceCollection AddLineControlServices(this IServiceCollection services,
			  ApplicationSettings? applicationSettings)
		  {



				Action<HttpClient> clientConfigurator = void (client) =>
					client.BaseAddress = new Uri(applicationSettings.BaseAddress);
				services.AddHttpClient<IHttpClientFactory>("Client", clientConfigurator);
				services.AddScoped(_ => new HttpClient
				{ BaseAddress = new Uri(applicationSettings.BaseAddress) });
				//services.AddScoped<ILineService>(sp => new LineService(new HttpClient
				//{ BaseAddress = new Uri(applicationSettings.BaseAddress) }));



				//services.AddScoped<IOrderService>(sp => new OrderService(new HttpClient
				//{ BaseAddress = new Uri(applicationSettings.BaseAddress) }));

				//services.AddScoped<IProdLineLayoutService>(sp => new ProdLineLayoutService(new HttpClient
				//{ BaseAddress = new Uri(applicationSettings.BaseAddress) }));

				//services.AddScoped<IWiEventService>(sp => new WiEventService(new HttpClient
				//{ BaseAddress = new Uri(applicationSettings.BaseAddress) }));

				services.AddLogging(logging => logging.SetMinimumLevel(LogLevel.Warning));
				return services;
		  }
	 }
}
