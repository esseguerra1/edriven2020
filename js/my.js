const itm1 = document.getElementById("itm1")
const itm2 = document.getElementById("itm2")
const itm3 = document.getElementById("itm3")
const itm4 = document.getElementById("itm4")

const totals = {
	totals1: document.querySelector("#subtotal1"),
	totals2: document.querySelector("#subtotal2"),
	totals3: document.querySelector("#subtotal3"),
	totals4: document.querySelector("#subtotal4"),
};

let foods = [];
let foodimg = [];
let storageData = [];
const request = "https://www.themealdb.com/api/json/v1/1/filter.php?a=American";

function popSel1() {
	for (food of foods) {
		let option = document.createElement('option')
		option.value = food
		option.innerHTML = food
		itm1.appendChild(option)
	}
}
function popSel2() {
	for (food of foods) {
		let option = document.createElement('option')
		option.value = food
		option.innerHTML = food
		itm2.appendChild(option)
	}
}
function popSel3() {
	for (food of foods) {
		let option = document.createElement('option')
		option.value = food
		option.innerHTML = food
		itm3.appendChild(option)
	}
}
function popSel4() {
	for (food of foods) {
		let option = document.createElement('option')
		option.value = food
		option.innerHTML = food
		itm4.appendChild(option)
	}
}

const getData = async () => {
	const response = await fetch(request);
	const jsondata = response.json();
	return jsondata;
};
getData()
	.then((value) => {
		let arrfoods = value.meals;
		for (food of arrfoods) {
			foods.push(food.strMeal);
			foodimg.push(food.strMealThumb);
		}
		popSel1()
		popSel2()
		popSel3()
		popSel4()
	})
	.catch((err) => {
		console.log(err);
		window.location.reload();
	});

class Data {
	constructor(elems) {
		this.elems = elems;
		this.data =
			localStorage.getItem("order") != null
				? JSON.parse(localStorage.getItem("order")) : {
					data: [],
				};
		if(this.data == null){
			this.data = {
				data : []
			}
		}
		console.log(this.data)
	}
	crData(user, id) {
		const items = this.AllItems();
		const username = user == null ? null : user.toString();
		const orderNumber = id;
		const total = this.Sum(items);
		const currentOrder = {
			fullname: username,
			ornumber: orderNumber,
			total: total,
			items: items,
		};
		this.data.data.push(currentOrder);
		return this.data;
	}
	Sum = (items) => {
		let total = 0;
		for (let k = 0; k < items.length; k++) {
			total += parseFloat(items[k].iprice) * parseFloat(items[k].iqty);
		}
		return total;
	};
	AllItems = () => {
		let allItems = [];
		for (let i = 0; i < this.elems.length; i++) {
			const currentElement = this.elems[i];
			let itemInfo = {};
			const keys = ["iprice", "iname", "iqty"];
			for (let j = 0; j < currentElement.length; j++) {
				const value = currentElement[j].value.toString()
				itemInfo[keys[j]] = value;
				if (j === 1) {
					const index = foods.findIndex((item) => item === value);
					itemInfo.iimg = foodimg[index];
				}
			}
			allItems.push(itemInfo);
		}
		return allItems;
	};
}
const costs = document.querySelectorAll(".cost");
const qty = document.querySelectorAll(".qty");
const createId = (id) => {
	let findId = id.toString().split(" ")[0];
	findId = findId.toString().slice(findId.length - 1, findId.length);
	return findId;
};
window.onload = () => {
	costs.forEach((cost) => {
		cost.addEventListener("change", (event) => {
			const qtyElement = document.getElementById(`qty${createId(cost.id)}`);
			const price = parseFloat(cost.value) * parseFloat(qtyElement.value);
			const subTotalItem = totals[`totals${createId(cost.id)}`];
			subTotalItem.value = price.toString();
		});
	});
	qty.forEach((iqty) => {
		iqty.addEventListener("change", (event) => {
			const priceElement = document.getElementById(`price${createId(iqty.id)}`);
			const price = parseFloat(iqty.value) * parseFloat(priceElement.value);
			const subTotalItem = totals[`totals${createId(iqty.id)}`];
			subTotalItem.value = price.toString();
		});
	});
};
const createIndex = (data) => {
	const arr = [];
	const keys = Object.keys(data);
	for (let i = 0; i < keys.length; i++) {
		const currentSubTotal = data[keys[i]];
		if (currentSubTotal.value.toString() != "") {
			arr.push(i + 1);
		}
	}
	return arr;
};
const searchIndex = (index) => {
	const keys = ["price", "iitem", "qty"];
	const elems = [];
	for (let j = 0; j < keys.length; j++) {
		const currentKey = keys[j];
		elems.push(document.getElementById(`${currentKey}${index}`));
	}
	return elems;
};
const newOrderModal = document.getElementById("myModal");
function closeModal() {
	newOrderModal.style.display = "none";
}
function showModal() {
	newOrderModal.style.display = "block";
}
const savedData = () => {
	const id = document.querySelector("#orNum").value;
	const username = document.querySelector("#cName");
	const user = username.value == "" ? null : username.value;
	const enteredIndexes = createIndex(totals);
	let searchelems = [];
	for (let i = 0; i < enteredIndexes.length; i++) {
		searchelems.push(searchIndex(enteredIndexes[i]));
	}
	const data = new Data(searchelems).crData(user, id);
	localStorage.setItem("order", JSON.stringify(data));
	reloadTable();
	closeModal();
	window.location.reload()
};
document.querySelector("#save").addEventListener("click", savedData);
const showOrderModal = document.getElementById('viewModal');
const showOrderModalBody = document.getElementById('viewModalBody');
const showOrderModalClose = document.getElementById('viewModalClose');
showOrderModalClose.addEventListener('click', () => {
	showOrderModal.style.display = "none";
});
window.addEventListener('click', (event) => {
	if (event.target == showOrderModal) {
		showOrderModal.style.display = "none";
	}
});
function cbr() {
	return document.createElement('br');
}
function createROI(value) {
	const input = document.createElement('input');
	input.value = value;
	input.setAttribute('type', 'text');
	input.setAttribute('disabled', true);
	input.setAttribute('readonly', true);
	return input;
}
function createVOH(record) {
	showOrderModalBody.appendChild(createROI(record.ornumber));
	showOrderModalBody.appendChild(cbr());
  if (record.fullname == null){
    record.fullname = "Not Specified"
  }
	showOrderModalBody.appendChild(createROI(record.fullname));
	showOrderModalBody.appendChild(cbr());
}
function createVOIH() {
	const h2 = document.createElement('h2');
	h2.innerHTML = 'Items';
	showOrderModalBody.appendChild(h2);
}
function createThumb(src) {
	const img = document.createElement('img');
	img.setAttribute('src', src);
	return img;
}
function createContentName(value) {
	const h4 = document.createElement('h5');
	h4.innerHTML = value;
	return h4;
}
function createContentDetail(label, value) {
	const h5 = document.createElement('h5');
	h5.innerHTML = `${label}: ${value}`;
	return h5;
}
function createItemContent(data) {
	const td = document.createElement('td');
	td.appendChild(createThumb(data.iimg));
	td.appendChild(createContentName(data.iname));
	td.appendChild(createContentDetail('Price', data.iprice));
	td.appendChild(createContentDetail('Quantity', data.iqty));
	return td;
}
function createEmptyContent() {
	const h3 = document.createElement('h3');
	h3.innerHTML = 'No Items';
	showOrderModalBody.appendChild(h3);
}
function createOrderContent(items) {
	createVOIH();
	if (items && items.length) {
		const table = document.createElement('table');
		const tr = document.createElement('tr');

		items.forEach((item) => {
			tr.appendChild(createItemContent(item))
		});
		table.appendChild(tr);
		showOrderModalBody.appendChild(table);
	} else {
		createEmptyContent();
	}
}
function showOrder(index) {
	showOrderModalBody.innerHTML = '';
	const records = JSON.parse(localStorage.getItem('order'));
	const record = records.data[index];
	createVOH(record);
	createOrderContent(record.items);
	showOrderModal.style.display = "block";
}
function createButton(index) {
	const button = document.createElement('button');
	button.innerHTML = 'View';
    button.setAttribute("id","viewButton")
	button.addEventListener('click', () => {
		showOrder(index);
	});
	return button;
}
function createCell(data) {
	const td = document.createElement('td');
	if(data == null){
		data = userNameData(data)
		td.classList.add('red')
	}
	td.innerHTML = data;
	return td;
}
const userNameData = (data) => {
	console.log(data)
	if(data == null){
		return "Not Specified"
	} else {
		return data
	}
}
function createRow(order, index) {
	const tr = document.createElement('tr');
	tr.appendChild(createCell(index + 1));
	tr.appendChild(createCell(order.ornumber));
	tr.appendChild(createCell(order.fullname));
	tr.appendChild(createCell("₱" + order.total + ".00"));
	tr.appendChild(createButton(index));
	return tr;
}
function createHeadCell(data) {
	const th = document.createElement('th');
	th.innerHTML = data;
	return th;
}
function createHeader() {
	const tr = document.createElement('tr');
	tr.appendChild(createHeadCell('No. #'));
	tr.appendChild(createHeadCell('Order'));
	tr.appendChild(createHeadCell('Customer Name'));
	tr.appendChild(createHeadCell('Total'));
	tr.appendChild(createHeadCell('Actions'));
	return tr;
}
function createEmptyOrder() {
	const tr = document.createElement('tr');
	const td = createCell('No Records');
	td.setAttribute('colspan', '6');
	td.setAttribute('align', 'center');
	tr.appendChild(td);
	return tr;
}
function reloadTable() {
	const table = document.getElementById('myTable');
	table.innerHTML = '';
	table.appendChild(createHeader());
	const records = JSON.parse(localStorage.getItem('order'));
	if (records && records.data.length) {
		records.data.forEach((order, index) => {
			table.appendChild(createRow(order, index));
		});
	} else {
		table.appendChild(createEmptyOrder());
	}
}
reloadTable()
