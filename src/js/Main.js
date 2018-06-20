// IIFE as start of the js-part thats needed in the webapplication
var Lists = require("./Lists");
var Meeting = require("./Meeting");
var Maps = require("./Maps");
var leftList;
var rightList;
var curMeeting;
var ListObject;
var data;
var map;

let initView = function () {
	let main = document.getElementById("main");
	let mapSec = map.updateMap(curMeeting);
	let leftList = createLeftList();

	let rightList = createRightList();

	main.appendChild(mapSec);
	main.appendChild(leftList);
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

	let MeetingTitle = document.createElement("h1");
	MeetingTitle.id = "MeetingTitle";
	MeetingTitle.innerHTML = curMeeting.getName();

	let MeetingTimeLoc = document.createElement("p");
	MeetingTimeLoc.id = "MeetingTimeLoc";
	MeetingTimeLoc.innerHTML = curMeeting.getDate() + ", " + curMeeting.getLocation();

	let rightListMenubar = createRightMenuBar();
	rightListMenubar.className = "menubar";

	let rightHeader = document.createElement("section");
	rightHeader.id = "rightHeader";
	rightHeader.appendChild(MeetingTitle);
	rightHeader.appendChild(MeetingTimeLoc);

	let rightListSec = document.createElement("section");
	rightListSec.className = "listSec";
	rightListSec.id = "rightListSec";
	rightListSec.appendChild(rightHeader);
	rightListSec.appendChild(rightList);
	rightListSec.appendChild(rightListMenubar);

	return rightListSec;
};

let updateRightList = function (target) {
	updateCurMeeting(target);
	updateLists();

	let main = document.getElementById("main");
	main.replaceChild(map.updateMap(curMeeting), document.getElementById("map"));

	let MeetingTitle = document.getElementById("MeetingTitle");
	MeetingTitle.innerHTML = curMeeting.getName();

	let MeetingTimeLoc = document.getElementById("MeetingTimeLoc");
	MeetingTimeLoc.innerHTML = curMeeting.getDate() + ", " + curMeeting.getLocation();
};

// Pagination on window-resize
window.onresize = function () {
	updateLists();
};

let updateLists = function () {
	//Erstellt Listen neu
	ListObject.clearLists();
	ListObject.fillLeftList(leftList, data);
	ListObject.fillRightList(rightList, curMeeting);

	//Markiert ausgewähltes Objekt in linker Liste
	if (ListObject.calculateListSize() >= curMeeting.getId()) {
		let active = document.getElementById(curMeeting.getId());
		active.className = "active";
	}
};

let initHandlers = function () {
	let listListener = document.getElementById("leftList");
	listListener.addEventListener("click", event => updateRightList(event.target.id));
};

let updateCurMeeting = function (target) {
	curMeeting = data[parseInt(target)];
};

let createMockData = function () {
	let meetingList;
	let meeting1 = new Meeting.Meeting("Trierer Clubtreffen April", "20.04.2018", "Trier", ["Komet1", "Komet2", "Asteroid2", "Komet1", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2"], 0, { lat: 52.521918, lng: 13.413215 });
	let meeting2 = new Meeting.Meeting("Sondertreffen", "26.06.2018", "Konz", ["Asteroid1", "Asteroid2"], 1, { lat: 49.749992, lng: 6.6371433 });
	let meeting3 = new Meeting.Meeting("Trierer Clubtreffen Oktober", "12.10.2018", "Konz", ["Komet2", "Komet3"], 2, { lat: 48.856614, lng: 2.3522219 });
	let meeting4 = new Meeting.Meeting("Sondertreffen", "18.11.2018", "Saarbrücken", ["Asteroid1", "Komet1", "Komet2"], 3, { lat: 49.749992, lng: 6.6371433 });
	let meeting5 = new Meeting.Meeting("Trierer Clubtreffen Dezember", "03.12.2018", "Trier", ["Komet1", "Asteroid2"], 4, { lat: 52.521918, lng: 13.413215 });
	let meeting6 = new Meeting.Meeting("Trierer Clubtreffen April", "20.04.2018", "Trier", ["Komet1", "Komet2", "Asteroid2", "Komet1", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2"], 5, { lat: 48.856614, lng: 2.3522219 });
	let meeting7 = new Meeting.Meeting("Sondertreffen", "26.06.2018", "Konz", ["Asteroid1", "Asteroid2"], 6, { lat: 48.856614, lng: 2.3522219 });
	let meeting8 = new Meeting.Meeting("Trierer Clubtreffen Oktober", "12.10.2018", "Konz", ["Komet2", "Komet3"], 7, { lat: 52.521918, lng: 13.413215 });
	let meeting9 = new Meeting.Meeting("Sondertreffen", "18.11.2018", "Saarbrücken", ["Asteroid1", "Komet1", "Komet2"], 8, { lat: 49.749992, lng: 6.6371433 });
	let meeting10 = new Meeting.Meeting("Trierer Clubtreffen Dezember", "03.12.2018", "Trier", ["Komet1", "Asteroid2"], 9, { lat: 52.521918, lng: 13.413215 });
	let meeting11 = new Meeting.Meeting("Trierer Clubtreffen April", "20.04.2018", "Trier", ["Komet1", "Komet2", "Asteroid2", "Komet1", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2"], 10, { lat: 6.6371433, lng: 49.749992 });
	let meeting12 = new Meeting.Meeting("Sondertreffen", "26.06.2018", "Konz", ["Asteroid1", "Asteroid2"], 11, { lat: 48.856614, lng: 2.3522219 });
	let meeting13 = new Meeting.Meeting("Trierer Clubtreffen Oktober", "12.10.2018", "Konz", ["Komet2", "Komet3"], 12, { lat: 49.749992, lng: 6.6371433 });
	let meeting14 = new Meeting.Meeting("Sondertreffen", "18.11.2018", "Saarbrücken", ["Asteroid1", "Komet1", "Komet2"], 13, { lat: 52.521918, lng: 13.413215 });
	let meeting15 = new Meeting.Meeting("Trierer Clubtreffen Dezember", "03.12.2018", "Trier", ["Komet1", "Asteroid2"], 14, { lat: 49.749992, lng: 6.6371433 });
	meetingList = [meeting1, meeting2, meeting3, meeting4, meeting5, meeting6, meeting7, meeting8, meeting9, meeting10, meeting11, meeting12, meeting13, meeting14, meeting15];
	return meetingList;
};

// IIFE as start
(function () {
	map = new Maps.Maps();
	ListObject = new Lists.Lists();
	data = createMockData();
	curMeeting = data[0];
	initView();
	window.onresize();
	initHandlers();
})();

