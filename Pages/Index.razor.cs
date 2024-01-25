
using MesPortal.Components;
using MesPortal.Models;
using MesPortal.Services;
using MesPortal.Services.Interfaces;
using MesPortal.Utilities;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Newtonsoft.Json;
using System.Net.Http.Json;
using System.Text.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace MesPortal.Pages
{
	public partial class Index : ComponentBase
	{

		  [Inject]
		   IJSRuntime JSRuntime { get; set; }

		  public List<OrderDetail> Orders { get; set; }
		  readonly HttpClient _httpClient = new HttpClient();
		  public BaseModal baseModal = new BaseModal();

		  public string InputValue { get; set; }
		  public string MaterialId { get; set; }
		  public string GetStateCss (int number)
		  {
				return number == 0 ? "color:black" : "color:#fbbf1b";
		  }


		  private async Task ReadJsonFile()
		  {
				var data = await JSRuntime.InvokeAsync<OrderDetail[]>("GetFilesJson");
			

		  }

		  

		  protected async override Task OnInitializedAsync()
		  {
				//var rs = await _httpClient.GetAsync("https://localhost:7004/api/test");
				//Orders = await rs.Content.ReadFromJsonAsync<List<OrderDetail>>();
				//Console.WriteLine("data " + Orders.Count());
				string supplierNo =  this._appAuthenticationStateProvider.GetInfo();
				Orders = await JSRuntime.InvokeAsync<List<OrderDetail>>("GetFilesJson");

				Orders= Orders.Where(o=>o.SUPPLIER_NO== supplierNo).ToList();
				

		
			
		  }

		  public void UpdateLeadTime()
		  {
				Console.WriteLine("hello1 " + InputValue +" "+MaterialId);

				var find = Orders.Where(o => o.MATERIAL == MaterialId).FirstOrDefault();
				find.MODIFIED = 1;
				find.LEAD_TIME = Convert.ToInt32(InputValue);
		  }



		  
	 }
}
