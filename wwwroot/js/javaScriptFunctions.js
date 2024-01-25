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

function stationRender(width, elWidth, elHeigth, gap, numEl) {
	//caculator variable
	let num = Math.round(Math.floor(width / (elWidth + gap)));

	let height = (elHeigth + gap) * Math.round(numEl / num);

	const svg = $('#chart-container');

	svg.attr('width', width).attr('height', height)

	let newDataList = data.map((item, index) => {
		const size = reverseList(index, num, elHeigth, elWidth, gap);
		return {
			x: size.x,
			y: size.y,
			details: item,
			xAxis: size.x + elWidth / 2,
			yAxis: size.y + elHeigth / 2,
		};
	});

	/**
	 * Tạo các khung phần tử
	 */
	const rectList = newDataList.map((item, index) => {
		const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		const widthHeight = reverseList(index, num, elHeigth, elWidth, gap);

		const attributes = {
			x: item.x,
			y: item.y,
			width: elWidth,
			height: elHeigth,
			fill: 'rgb(24, 24, 24)',
			stroke: !item.details.CHECK_TOOL ? '#1d4ed8' : '#fbbf24',
			'stroke-width': 2,
			rx: 10,
		};

		return $(rect).attr(attributes).css('z-index', 100);
	});

	/**
	 * Tạo các đường nối phần tử
	 */

	const lineList = newDataList.map((item, index) => {
		const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

		const attributes = {
			x1: newDataList[index]?.xAxis,
			y1: newDataList[index]?.yAxis,
			x2: newDataList[index + 1]?.xAxis,
			y2: newDataList[index + 1]?.yAxis,
			stroke: 'blue',
			'stroke-width': 0.5,
		};

		if (newDataList.length != index + 1) {
			return $(line).attr(attributes).css('z-index', 50);
		}
	});

	const animationLineList = newDataList.map((item, index) => {
		const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

		const attributes = {
			r: 4,

			fill: 'blue',
			cx: newDataList[index]?.xAxis,
			cy: newDataList[index]?.yAxis,
			stroke: 'blue',
			'stroke-width': 0.5,
		};
		return $(circle).attr(attributes);
	});

	/**
	 * render
	 */
	svg.append(lineList);

	svg.append(animationLineList);
	svg.append(rectList);

	//$('circle').each((index, item) => {
	//    setInterval(() => {
	//        moveCircle(item, index, newDataList);
	//    }, rand());
	//});

	/**
	 * Tạo các nội dung của phần tử
	 */

	const contentList = newDataList.map((item, index) => {
		const content = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');

		const attributes = {
			x: item?.x,
			y: item?.y,
			width: elWidth,
			height: elHeigth,
			'backgroud-color': 'white',
			color: 'white',
		};

		const icon_1 = '<i class="fa fa-cubes fa-xl" style="color: #a5f3fc" ></i>';
		const icon_2 = '<i class="fa fa-cogs fa-xl" style="color: #fbbf24" ></i>';

		const stationName = $('<small></small>')
			.css('position', 'absolute')
			.css('top', 8)
			.css('left', 8)
			.css('font-size', 10)
			.css('color', '#cbd5e1')
			.text(item.details.CHECK_WI ? "WI" : "");

		const frame = $('<div>')
			.css('width', '100%')
			.css('height', elHeigth)
			.css('display', 'flex')
			.css('flex-direction', 'row')
			.css('justify-content', 'center')
			.css('align-items', 'center')
			.css('text-align', 'center')
			.css('position', 'relative')
			.append(
				`<div>${!item?.details?.CHECK_TOOL ? icon_1 : icon_2
				}<div style="margin-top:10px">Station ${item.details.Position}</div><div style="font-size:12px"> ${item.details.STATION_NAME}</div></div>`
			)
			.append(stationName);

		return $(content)
			.attr(attributes)

			.append(frame);
	});
	svg.append(contentList);

	// text cetner
	//$('text').each((index, item) => {
	//    const xAxis = $(item).attr('x');
	//    const yAxis = $(item).attr('y');
	//    const w = item?.getBBox()?.width;
	//    const h = item?.getBBox()?.height;
	//    const attributes = {
	//        x: +xAxis - Math.round(+w / 2),
	//        y: +yAxis + 10,
	//        fill: 'white',
	//    };
	//    $(item).attr(attributes);
	//});

	const iconH = document.createElementNS('http://www.w3.org/2000/svg', 'use');
	const a = {
		x: 0,
		y: 0,
		width: 100,
		height: 100,
		href: '#gfg',
	};
	$(iconH).attr(a).css({color: 'red'});
	svg.append(iconH);

	/**
	 * xử lý phần xuống dòng đảo chiều
	 */
	function reverseList(index, num, elHeigth, elWidth, gap) {
		const row = Math.floor(index / num) + 1;

		if (row % 2 != 0) {
			return {x: (index % num) * (elWidth + gap), y: Math.floor(index / num) * (elHeigth + gap)};
		} else {
			return {
				x: (Math.abs((index % num) + 1 - num) % num) * (elWidth + gap),
				y: Math.floor(index / num) * (elHeigth + gap),
			};
		}
	}

	/**
	 * xử lý phần animation point
	 */

	//function moveCircle(item, index, newDataList) {
	//    $(item).animate(
	//        {
	//            cx: newDataList[index + 1]?.xAxis,
	//            cy: newDataList[index + 1]?.yAxis,
	//        },
	//        {
	//            duration: rand(),
	//            complete: function () {
	//                $(item).css({cx: '', cy: ''});
	//            },
	//        }
	//    );
	//}

	function rand() {
		return Math.floor(Math.random() * (10000 - 2000 + 1) + 2000);
	}
}


function stationRenderInvoke() {
	console.log(($("#station").width()), "hello")
	const width = $("#station").width() - 50;
	stationRender(width, 150, 100, 50, data.length);
}


function countUpInvoke() {
	let each = $('.counter').each(function () {
		const $this = $(this), countTo = $this.attr('data-count');

		$({countNum: "HDASKL" + $this.text()}).animate({
				countNum: countTo
			},

			{

				duration: 8000,
				easing: 'linear',
				step: function () {
					$this.text(Math.floor(this.countNum));
				},
				complete: function () {
					$this.text(this.countNum);
					//alert('finished');
				}

			});


	});

}


function timeLineRender() {
	console.log("arguments", arguments)
	const timeList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

	const timeLineList = [...arguments[0]]

	const svg = $('#timeline');
	const width = 1500;
	const height = 70;
	const timeLineHeight = 15;

	svg.attr('width', width).attr('height', height);

	const groupTimeList = timeList?.map((item, index) => {
		const content = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
		const widthHour = Math.floor(width / 24);
		const stationName = $('<small></small>')
			.css('font-size', 10)
			.css('color', '#cbd5e1')
			.text(index + ':00');
		const attributes = {
			x: index * widthHour,

			width: widthHour,
			height: height,
			'backgroud-color': 'red',
			color: 'red',
		};
		const frame = $('<div>');
		if (index + 1 == timeList.length) {
			frame
				.css('width', widthHour - 3)
				.css('height', height - 2)
				.css('text-align', 'center')
				.css('border', '1px solid #1a253d');
			frame.append(stationName);
		} else {
			frame
				.css('width', widthHour)
				.css('height', height - 2)
				.css('text-align', 'center')
				.css('border', '1px solid #1a253d');
			frame.append(stationName);
		}
		return $(content).attr(attributes).append(frame);
	});

	svg.append(groupTimeList);

	const timeListListRender = timeLineList?.map((item, index) => {
		console.log("item", getHourByNumber(item.endEvent), getHourByNumber(item.startEvent))
		const content = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
		const widthHour = Math.floor(width / 24);
		const stationName = $('<div></div>')
			.css('font-size', 12)
			.css('background-color', 'red')
			.css('display', 'flex')
			.css('height', timeLineHeight)
			.css('border-radius', 3)
			.css('justify-content', ' space-between');
		const text = $(`<small>${timeRender(item.startEvent)}</small><small>${timeRender(item.endEvent)}</small>`);
		stationName.append(text);
		const attributes = {
			x: getHourByNumber(item.startEvent) * widthHour,
			y: height / 2 - timeLineHeight / 4,
			height: 30,

			width: widthHour * (getHourByNumber(item.endEvent) - getHourByNumber(item.startEvent)),
			stroke: 'blue',
			'stroke-width': 20,
		};
		$(content).attr(attributes);

		return $(content).append(stationName);
	});
	svg.append(timeListListRender);


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
