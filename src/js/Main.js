// IIFE as start of the js-part thats needed in the webapplication
var List = require("./Lists");
var Meeting = require("./Meeting");
var leftList;
var rightList;
var currentObject;
var ListObject;
var Mockdata;

let initView = function () {
	let main = document.getElementById("main");
	let leftList = createLeftList();
	let mapSec = createMap();
	let rightList = createRightList();

	main.appendChild(leftList);
	main.appendChild(mapSec);
	main.appendChild(rightList);
};

let createLeftList = function () {
	let logo = document.createElement("img");
	logo.id = "logo";
	logo.src = "comet_logo.svg";
	logo.alt = "logo_comet";

	leftList = document.createElement("ul");
	leftList.id = "leftList";

	let menubar = createLeftMenuBar();

	let leftListSec = document.createElement("section");
	leftListSec.className = "listSec";
	leftListSec.id = "leftListSec";

	leftListSec.appendChild(logo);
	leftListSec.appendChild(leftList);
	leftListSec.appendChild(menubar);

	return leftListSec;
};

let createLeftMenuBar = function () {
	let prevPageBtn = document.createElement("i");
	prevPageBtn.className = "material-icons";
	prevPageBtn.innerHTML = "keyboard_arrow_left";

	let nextPageBtn = document.createElement("i");
	nextPageBtn.className = "material-icons";
	nextPageBtn.innerHTML = "keyboard_arrow_right";

	let addBtn = document.createElement("i");
	addBtn.className = "material-icons";
	addBtn.innerHTML = "add";

	let deleteBtn = document.createElement("i");
	deleteBtn.className = "material-icons";
	deleteBtn.innerHTML = "delete_forever";

	let menubar = document.createElement("section");
	menubar.className = "menubar";
	menubar.id = "menubar";
	menubar.appendChild(deleteBtn);
	menubar.appendChild(addBtn);
	menubar.appendChild(prevPageBtn);
	menubar.appendChild(nextPageBtn);

	return menubar;
};

let createRightMenuBar = function () {
	let prevPageBtn = document.createElement("i");
	prevPageBtn.className = "material-icons";
	prevPageBtn.innerHTML = "keyboard_arrow_left";

	let nextPageBtn = document.createElement("i");
	nextPageBtn.className = "material-icons";
	nextPageBtn.innerHTML = "keyboard_arrow_right";

	let editBtn = document.createElement("i");
	editBtn.className = ("material-icons");
	editBtn.innerHTML = "mode_edit";

	let menubar = document.createElement("section");
	menubar.className = "menubar";
	menubar.id = "menubar";
	menubar.appendChild(editBtn);
	menubar.appendChild(prevPageBtn);
	menubar.appendChild(nextPageBtn);

	return menubar;
};

let createRightList = function () {
	rightList = document.createElement("ul");
	rightList.id = "rightList";

	let detailTitle = document.createElement("h1");
	detailTitle.innerHTML = currentObject.getName();

	let detailTimeLoc = document.createElement("p");
	detailTimeLoc.innerHTML = currentObject.getDate() + ", " + currentObject.getLocation();

	let detailMenubar = createRightMenuBar();
	detailMenubar.className = "menubar";

	let rightHeader = document.createElement("section");
	rightHeader.id = "rightHeader";
	rightHeader.appendChild(detailTitle);
	rightHeader.appendChild(detailTimeLoc);

	let rightListSec = document.createElement("section");
	rightListSec.className = "listSec";
	rightListSec.id = "rightListSec";
	rightListSec.appendChild(rightHeader);
	rightListSec.appendChild(rightList);
	rightListSec.appendChild(detailMenubar);

	return rightListSec;
};

let createMap = function () {
	let mapSec = document.createElement("section");
	mapSec.id = "map";

	return mapSec;
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

// Pagination on window-resize
window.onresize = function () {
	let size = ListObject.calculateListSize();
	ListObject.clearLists();
	ListObject.fillList(leftList, size, Mockdata);
	ListObject.fillDetailList(rightList, size, currentObject);
};

// IIFE as start
(function () {
	ListObject = new List.Lists();
	Mockdata = createMockData();
	currentObject = Mockdata[0];
	initView();
	window.onresize();
})();

