function GetFilesJson() {
	 return new Promise((resolve, reject) => {
		  fetch("MAT_LEAD_TIME.json")
				.then(response => response.json())
				.then(data => {
					
					return resolve(data)
				})
				.catch(error => {
					 console.log(error)
					 return reject(error)
				});
	 });
}

function GetStartEndPoint() {

	const result = $(".station-card").map((index, item) => {
		const width = $(item).width();
		const height = $(item).height();
		const yAxis = $(item).offset().top;
		const xAxis = $(item).offset().left;

		return {x: width + xAxis, y: yAxis + height / 2, w: width, h: height}
	})

	for (let i = 0; i < result.length; i++) {
		if (i + 1 === result.length) return
		else DrawLine(result[i], result[i + 1], $(".station-card")[i], $(".station-card")[i + 1])
	}

}


function getHourByNumber(date) {
	let time = new Date(date)
	let hour = +time.getHours()
	let minutes = Math.round((+time.getMinutes() / 60) * 100) / 100
	return hour + minutes
}

function timeRender(date) {
	let time = new Date(date)
	return time.getHours() + ":" + time.getMinutes()
}

function scheduleTask(callback, interval) {
	return setInterval(callback, interval);
}

function stopScheduledTask(taskId) {
	clearInterval(taskId);
}
