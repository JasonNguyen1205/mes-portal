using System.Timers;
using Timer=System.Timers.Timer;

namespace MesPortal.Helper
{
	public class TimeInterval
	{
		readonly Action _callback;
		readonly int _duration;
		Timer _timer;
		public TimeInterval(Action callback, int duration)
		{
			_callback = callback;
			_duration = duration;
		}
		public void Start()
		{
			_timer = new Timer(_duration);
			_timer.Elapsed += (s, e) => Callback(e);
			_timer.Start();

		}

		public void Stop()
		{
			_timer.Stop();
		}
		void Callback(ElapsedEventArgs e)
		{
			_callback.Invoke();

		}
	}
}
