// IIFE as start of the js-part thats needed in the webapplication
var List = require("./Lists");
var Meeting = require("./Meeting");
var detailObjectList;
var list;
var currentObject;
var ListObject;
var Mockdata;

let initView = function () {
	let main = document.getElementById("main");
	let leftList = createLeftList();
	let rightList = createRightList();

	main.appendChild(leftList);
	main.appendChild(rightList);

	//First pagination
	window.onresize();
};

let createLeftList = function () {
	let logo = document.createElement("img");
	logo.id = "logo";
	logo.src = "comet_logo.svg";
	logo.alt = "logo_comet";

	list = document.createElement("ul");
	list.id = "list";

	let menubar = createMenuBar();

	let listSec = document.createElement("section");
	listSec.classList.add("listSec");
	listSec.appendChild(logo);
	listSec.appendChild(list);
	listSec.appendChild(menubar);

	return listSec;
};

let createMenuBar = function () {
	let prevPageBtn = document.createElement("i");
	prevPageBtn.classList.add("material-icons");
	prevPageBtn.innerHTML = "keyboard_arrow_left";

	let nextPageBtn = document.createElement("i");
	nextPageBtn.classList.add("material-icons");
	nextPageBtn.innerHTML = "keyboard_arrow_right";

	let addBtn = document.createElement("i");
	addBtn.classList.add("material-icons");
	addBtn.innerHTML = "add";

	let deleteBtn = document.createElement("i");
	deleteBtn.classList.add("material-icons");
	deleteBtn.innerHTML = "delete_forever";

	let menubar = document.createElement("section");
	menubar.classList.add("menubar");
	menubar.id = "menubar";
	menubar.appendChild(deleteBtn);
	menubar.appendChild(addBtn);
	menubar.appendChild(prevPageBtn);
	menubar.appendChild(nextPageBtn);

	return menubar;
};

let createRightList = function () {
	let mapSec = document.createElement("section");
	mapSec.setAttribute("id", "map");

	let detailView = createDetailView(currentObject);

	let detailSec = document.createElement("section");
	detailSec.appendChild(mapSec);
	detailSec.appendChild(detailView);
	detailSec.classList.add("detailSec");

	return detailSec;
};

let createDetailView = function (object) {
	currentObject = object;

	detailObjectList = document.createElement("ul");
	detailObjectList.id = ("detailObjectList");

	let detailObjectsCon = document.createElement("section");
	detailObjectsCon.className = ("detailObjectsCon");
	detailObjectsCon.appendChild(detailObjectList);

	let detailTitle = document.createElement("h1");
	detailTitle.innerHTML = object.getName();

	let detailDate = document.createElement("p");
	detailDate.innerHTML = object.getDate();

	let detailLocation = document.createElement("p");
	detailLocation.innerHTML = object.getLocation();

	let editBtn = document.createElement("i");
	editBtn.className = ("material-icons");
	editBtn.innerHTML = "mode_edit";

	let detailMenubar = createMenuBar();
	detailMenubar.classList.add("menubar");

	let detailHeadingCon = document.createElement("section");
	detailHeadingCon.className = ("detailHeadingCon");
	detailHeadingCon.appendChild(detailDate);
	detailHeadingCon.appendChild(detailLocation);
	detailHeadingCon.appendChild(editBtn);

	let details = document.createElement("section");
	details.className = ("details");
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

// Pagination on windo-resize
window.onresize = function () {
	let size = ListObject.calculateListSize();
	let detailSize = ListObject.calculateDetailListSize();
	ListObject.clearLists();
	ListObject.fillList(list, size, Mockdata);
	ListObject.fillDetailList(detailObjectList, detailSize, currentObject);
};

// IIFE as start
(function () {
	ListObject = new List.Lists();
	Mockdata = createMockData();
	currentObject = Mockdata[0];
	initView();
})();

