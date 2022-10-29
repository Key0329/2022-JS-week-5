let data = [
	{
		"id": 0,
		"name": "肥宅心碎賞櫻3日",
		"imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
		"area": "高雄",
		"description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
		"group": 87,
		"price": 1400,
		"rate": 10
	},
	{
		"id": 1,
		"name": "貓空纜車雙程票",
		"imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
		"area": "台北",
		"description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
		"group": 99,
		"price": 240,
		"rate": 2
	},
	{
		"id": 2,
		"name": "台中谷關溫泉會1日",
		"imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
		"area": "台中",
		"description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
		"group": 20,
		"price": 1765,
		"rate": 7
	}
];

// -------------------------------- 初始渲染 ------------------------------------

const ticketCardArea = document.querySelector('.ticketCard-area');

function render(arr) {
	let str = "";
	arr.forEach(item => {
		str +=
			`
		<li class="col-4 mb-10">
			<div class="ticketCard h-100 d-flex flex-column">
				<div class="ticketCard-img position-relative flex-grow-0">
					<img src= "${item.imgUrl}">
					<p class="ticketCard-region py-2 px-5 bg-secondary text-white position-absolute rounded-end">${item.area}</p>
					<p class="ticketCard-rate py-1 px-2 bg-primary text-white position-absolute rounded-end">${item.rate}</p>
				</div>
				<div class="ticketCard-body d-flex flex-column justify-content-between bg-white pt-5 px-5 pb-4 flex-grow-1">
					<div>
						<h2 class="h3 pb-1 border-bottom border-primary text-primary mb-4">${item.name}</h2>
						<p class="ticketCard-body-text text-wrap">${item.description}</p>
					</div>
					<div class="d-flex justify-content-between">
						<p class="text-primary d-flex align-items-center"><span class="ticketCard-icon material-symbols-outlined me-2">error</span>剩下最後 ${item.group} 組</p>
						<div class="d-flex align-items-center text-primary">
							<p class="me-1">TWD</p>
							<p class="fs-2 roboto">$${item.price}</p>
						</div>
					</div>
				</div>
			</div>
		</li>
		`
	})

	ticketCardArea.innerHTML = str;
}

render(data);

// -------------------------------- 篩選區域 ------------------------------------

const areaSearch = document.querySelector('.search-region');
const searchResult = document.querySelector('.search-result');

function areaSelector(arr) {

	areaSearch.addEventListener("change", function (e) {
		// console.log(e.target.value);
		let newData = [];

		if (e.target.value === "全部地區") {
			newData = arr;
		} else {
			newData = arr.filter(item => item.area === e.target.value);
			// console.log(newData);
		}
		render(newData);
		searchResult.innerHTML = `本次搜尋共 ${newData.length} 筆資料`;

	})

}

areaSelector(data);

// -------------------------------- 新增套票 ------------------------------------

// {
// 	"id": 2,
// 	"name": "台中谷關溫泉會1日",
// 	"imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
// 	"area": "台中",
// 	"description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
// 	"group": 20,
// 	"price": 1765,
// 	"rate": 7
// }

const addTicketBtn = document.querySelector('.addBtn');
const ticketName = document.querySelector('#ticketName');
const ticketPicture = document.querySelector('#ticketPicture');
const ticketRegion = document.querySelector('#ticketRegion');
const ticketNum = document.querySelector('#ticketNum');
const ticketRate = document.querySelector('#ticketRate');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketDescription = document.querySelector('#ticketDescription');


function addTicket(arr) {

	addTicketBtn.addEventListener('click', (e) => {
		e.preventDefault();
		// console.log(e.target);

		const typeLength = ticketDescription.value.length;

		if (typeLength > 100) {
			return alert('最多不超過 100 字');
		}
		if (ticketRate.value < 0 || ticketRate.value > 10) {
			return alert('星級區間為 1-10 分');
		}

		let newTicket = {
			"id": arr.length,
			"name": ticketName.value,
			"imgUrl": ticketPicture.value,
			"area": ticketRegion.value,
			"description": ticketDescription.value,
			"group": ticketNum.value,
			"price": ticketPrice.value,
			"rate": ticketRate.value
		};

		arr.push(newTicket);

		render(arr);

		searchResult.innerHTML = `本次搜尋共 ${arr.length} 筆資料`;

		Swal.fire({
			icon: 'success',
			title: '新增套票成功',
			showConfirmButton: false,
			timer: 1500
		})
	})

}

addTicket(data);

