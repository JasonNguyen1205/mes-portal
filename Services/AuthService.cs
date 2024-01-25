using System.Security.Claims;

namespace MesPortal.Services
{
	 public class AuthService
	 {


		  public ClaimsPrincipal Login(string username,string password)
		  {

				return new(new ClaimsIdentity(new Claim[]
				{
					 new (ClaimTypes.Name,username),
					 new (ClaimTypes.Hash,password),
				}));
		  }

		
	 }
}
