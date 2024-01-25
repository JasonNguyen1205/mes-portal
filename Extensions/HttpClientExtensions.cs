using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace LineControl.Extensions
{
	public static class HttpClientExtensions
	{
		public static async Task<T> PostAsync<T>(this HttpClient? httpClient,
			string url,
			object data)
		{
			var options = new JsonSerializerOptions
			{
				PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
				DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
				NumberHandling = JsonNumberHandling.AllowNamedFloatingPointLiterals
			};
			// Serialize the request object to JSON
			string requestBody = JsonSerializer.Serialize(data, options);

			var request = new HttpRequestMessage(HttpMethod.Post, url);

			request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
			var response = await httpClient.SendAsync(request);
			string responseBody = await response.Content.ReadAsStringAsync();
			Console.WriteLine(responseBody);

			var result = JsonSerializer.Deserialize<T>(responseBody, options);
			if (result != null)
			{
				return result;
			}
			return default!;
		}
	}
}
