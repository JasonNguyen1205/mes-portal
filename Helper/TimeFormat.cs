namespace LineControl.Helper
{
	public class TimeFormat
	{
		public static string TimeTargetHandler(int qtyRemain, int pph)
		{
			try
			{
				if (pph == 1)
				{
					return "00:00:00";
				}
				double hour = qtyRemain * 1.0 / pph;

				var rs = TimeSpan.FromHours(hour);
				return $"{rs.Hours}:{rs.Minutes}:{rs.Seconds}";
			}
			catch (Exception)
			{

				return "00:00:00";
			}

		}
	}
}
