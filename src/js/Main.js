// IIFE as start of the js-part thats needed in the webapplication

var Meeting = require("./Meeting");
var list;
var detailObjectList;
var currentObject;

let initView = function () {
	let main = document.getElementById("main");
	let listSec = document.createElement("section");
	let detailSec = document.createElement("section");
	let logo = document.createElement("img");
	let prevPageBtn = document.createElement("i");
	let nextPageBtn = document.createElement("i");
	let addBtn = document.createElement("i");
	let deleteBtn = document.createElement("i");
	list = document.createElement("ul");
	let menubar = document.createElement("section");
	let mapSec = document.createElement("section");

	listSec.classList.add("listSec");
	detailSec.classList.add("detailSec");
	menubar.classList.add("menubar");
	menubar.id = "menubar";
	list.id = "list";
	logo.id = "logo";
	logo.src = "comet_logo.svg";
	logo.alt = "logo_comet";
	deleteBtn.classList.add("material-icons");
	addBtn.classList.add("material-icons");
	prevPageBtn.classList.add("material-icons");
	nextPageBtn.classList.add("material-icons");
	deleteBtn.innerHTML = "delete_forever";
	addBtn.innerHTML = "add";
	prevPageBtn.innerHTML = "keyboard_arrow_left";
	nextPageBtn.innerHTML = "keyboard_arrow_right";
	mapSec.setAttribute("id", "map");
	menubar.appendChild(deleteBtn);
	menubar.appendChild(addBtn);
	menubar.appendChild(prevPageBtn);
	menubar.appendChild(nextPageBtn);

	main.appendChild(listSec);
	main.appendChild(detailSec);
	listSec.appendChild(logo);
	listSec.appendChild(list);
	listSec.appendChild(menubar);
	detailSec.appendChild(initDetailView(createMockData()[0]));
	detailSec.appendChild(mapSec);

	let size = calculateListSize();
	fillList(list, size);
	fillDetailList(detailObjectList, calculateDetailListSize(), currentObject);
};

window.onresize = function (event) {
	let size = calculateListSize();
	let detailSize = calculateDetailListSize();
	clearLists();
	fillList(list, size);
	fillDetailList(detailObjectList, detailSize, currentObject);
};

let calculateListSize = function () {
	let windowHeight = window.innerHeight;
	let logoHeight = document.getElementById("logo").offsetHeight;
	let NavBarHeight = document.getElementById("menubar").offsetHeight;
	let listSize = (windowHeight - (logoHeight + NavBarHeight)) / 51;
	return listSize - 1;
};

let calculateDetailListSize = function () {
	let windowHeight = window.innerHeight;
	let listSize = (windowHeight - 130) / 51;
	return listSize - 1;
};

let fillList = function (list, size) {
	let mockData = createMockData();
	for (let index = 1; index <= size; index++) {
		let meeting = mockData[index - 1];
		let listElement = document.createElement("li");
		let title = document.createElement("p");

		listElement.id = "listElement" + index;
		title.innerHTML = meeting.getName();
		listElement.appendChild(title);
		list.appendChild(listElement);
	}
};

let fillDetailList = function (list, size, object) {
	for (let index = 1; index <= size; index++) {
		let detailListElement = document.createElement("li");
		let detailObject = document.createElement("p");

		detailObject.innerHTML += object.getObjects()[index];
		detailListElement.id = "detailListElement" + index;

		if (index % 2 <= 0) {
			detailListElement.className = ("even");
		}
		else {
			detailListElement.className = ("uneven");
		}

		detailListElement.appendChild(detailObject);
		list.appendChild(detailListElement);
	}
};

let clearLists = function () {
	let list = document.getElementById("list");
	let length = list.childElementCount;
	for (let index = 0; index < length; ++index) {
		let listElement = document.getElementById("listElement" + (index + 1));
		list.removeChild(listElement);
	}

	let detailObjectList = document.getElementById("detailObjectList");
	let detailLength = detailObjectList.childElementCount;
	for (let index = 0; index < detailLength; ++index) {
		let detailListElement = document.getElementById("detailListElement" + (index + 1));
		detailObjectList.removeChild(detailListElement);
	}
};

let initDetailView = function (object) {
	currentObject = object;
	let details = document.createElement("section");
	let detailHeadingCon = document.createElement("section");
	let detailObjectsCon = document.createElement("section");
	let detailTitle = document.createElement("h1");
	let detailDate = document.createElement("p");
	let detailLocation = document.createElement("p");
	let editBtn = document.createElement("i");
	detailObjectList = document.createElement("ul");
	let detailMenubar = document.createElement("section");
	let detailPrevPageBtn = document.createElement("i");
	let detailNextPageBtn = document.createElement("i");
	let detailAddBtn = document.createElement("i");
	let detailDeleteBtn = document.createElement("i");

	details.className = ("details");
	detailHeadingCon.className = ("detailHeadingCon");
	detailObjectsCon.className = ("detailObjectsCon");
	editBtn.className = ("material-icons");
	detailMenubar.classList.add("menubar");
	detailDeleteBtn.classList.add("material-icons");
	detailAddBtn.classList.add("material-icons");
	detailPrevPageBtn.classList.add("material-icons");
	detailNextPageBtn.classList.add("material-icons");
	detailObjectList.id = ("detailObjectList");

	detailDeleteBtn.innerHTML = "delete_forever";
	detailAddBtn.innerHTML = "add";
	detailPrevPageBtn.innerHTML = "keyboard_arrow_left";
	detailNextPageBtn.innerHTML = "keyboard_arrow_right";

	detailTitle.innerHTML = object.getName();
	detailDate.innerHTML = object.getDate();
	detailLocation.innerHTML = object.getLocation();
	editBtn.innerHTML = "mode_edit";

	detailMenubar.appendChild(detailDeleteBtn);
	detailMenubar.appendChild(detailAddBtn);
	detailMenubar.appendChild(detailPrevPageBtn);
	detailMenubar.appendChild(detailNextPageBtn);
	detailHeadingCon.appendChild(detailDate);
	detailHeadingCon.appendChild(detailLocation);
	detailHeadingCon.appendChild(editBtn);
	detailObjectsCon.appendChild(detailObjectList);
	details.appendChild(detailTitle);
	details.appendChild(detailHeadingCon);
	details.appendChild(detailObjectsCon);
	details.appendChild(detailMenubar);

	return details;
};

let createMockData = function () {
	let meetingList;
	let meeting1 = new Meeting.Meeting("Trierer Clubtreffen April", "20.04.2018", "Trier", ["Komet1", "Komet2", "Asteroid2", "Komet1", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2"]);
	let meeting2 = new Meeting.Meeting("Sondertreffen", "26.06.2018", "Konz", ["Asteroid1", "Asteroid2"]);
	let meeting3 = new Meeting.Meeting("Trierer Clubtreffen Oktober", "12.10.2018", "Konz", ["Komet2", "Komet3"]);
	let meeting4 = new Meeting.Meeting("Sondertreffen", "18.11.2018", "Saarbrücken", ["Asteroid1", "Komet1", "Komet2"]);
	let meeting5 = new Meeting.Meeting("Trierer Clubtreffen Dezember", "03.12.2018", "Trier", ["Komet1", "Asteroid2"]);
	meetingList = [meeting1, meeting2, meeting3, meeting4, meeting5, meeting1, meeting2, meeting3, meeting4, meeting5, meeting1, meeting2, meeting3, meeting2, meeting3, meeting4, meeting5, meeting1, meeting2, meeting3, meeting4, meeting5, meeting1];
	return meetingList;
};

(function () {
	createMockData();
	initView();
})();

