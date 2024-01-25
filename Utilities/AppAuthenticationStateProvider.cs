using Microsoft.AspNetCore.Components.Authorization;
using System.Security.Claims;

namespace MesPortal.Utilities
{
	 public class AppAuthenticationStateProvider:AuthenticationStateProvider
	 {
		  public int GetAuthenticationStateAsyncRan { get; set; } = 0;
		  public ClaimsPrincipal principal = new ClaimsPrincipal();
		  public AppAuthenticationStateProvider()
    {
       
    }


		  public override async Task<AuthenticationState> GetAuthenticationStateAsync()
		  {
				GetAuthenticationStateAsyncRan++;
				 principal = new ClaimsPrincipal();

				principal = new(new ClaimsIdentity(new Claim[]
				{
					 new (ClaimTypes.Name,"Phan Tin Tuong"),
					 new (ClaimTypes.Hash,"admin123")
				}));
				return new(principal);
		  }

		  public async Task LoginAsync(string username, string password)
		  {
				

				

				principal = new(new ClaimsIdentity(new Claim[]
				{
					 new (ClaimTypes.Name,username),
					 new (ClaimTypes.Hash,password)
				}, "hello"));
				NotifyAuthenticationStateChanged(Task.FromResult(new AuthenticationState(principal))); 
		  }

		  public string  GetInfo()
		  {


			

				Claim  nameClaim = principal.FindFirst(ClaimTypes.Name);
				return nameClaim.Value;
		  }
	 }
}
