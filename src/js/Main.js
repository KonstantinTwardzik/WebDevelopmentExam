// IIFE as start of the js-part thats needed in the webapplication
var Lists = require("./Lists");
var Maps = require("./Maps");
var Mockdata = require("./Mockdata");
var dbSize;
var leftCurrentPage;
var leftAllPages;
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
	let deleteBtn = document.createElement("i");
	deleteBtn.id = "leftDeleteBtn";
	deleteBtn.className = "material-icons";
	deleteBtn.innerHTML = "delete_forever";

	let addBtn = document.createElement("i");
	addBtn.id = "leftAddBtn";
	addBtn.className = "material-icons";
	addBtn.innerHTML = "add";

	let prevPageBtn = document.createElement("i");
	prevPageBtn.id = "leftPrevPageBtnDisabled";
	prevPageBtn.className = "material-icons";
	prevPageBtn.innerHTML = "keyboard_arrow_left";

	let nextPageBtn = document.createElement("i");
	nextPageBtn.id = "leftNextPageBtn";
	nextPageBtn.className = "material-icons";
	nextPageBtn.innerHTML = "keyboard_arrow_right";

	let pageIndicator = document.createElement("p");
	pageIndicator.id = "leftPageIndicator";

	let menubar = document.createElement("section");
	menubar.className = "menubar";
	menubar.id = "menubar";
	menubar.appendChild(deleteBtn);
	menubar.appendChild(addBtn);
	menubar.appendChild(prevPageBtn);
	menubar.appendChild(pageIndicator);
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

//TODO: calculate those two variables:
let start = 14;	// Dummywert
let end = 17;	// Dummywert

// let pagesize = require("./Lists").pagesize;

window.onresize = function () {
	updateLists();
	//THOMAS:
	let request = new XMLHttpRequest();
	request.addEventListener("error", error => { console.error(error.toString()); });
	request.addEventListener("load", () => { if (request.status === 200) { console.log("asdf"); } });
	//TODO: insert calculated start and end variable here:
	request.open("GET", "http://localhost:8080/returnRange?start=" + start + "&end=" + end);	//übergibt parameter start = pagesize und end = 5
	request.setRequestHeader("Accept", "application/json");
	request.responseType = "json";
	request.send();
	//:THOMAS
};

let updateLists = function () {
	//redraw all lists
	ListObject.clearLists();
	ListObject.fillLeftList(leftList, leftCurrentPage, data);
	ListObject.fillRightList(rightList, curMeeting);

	//calculate how many pages there are
	let currentPageSize = ListObject.calculateListSize();
	leftAllPages = Math.ceil(dbSize / currentPageSize);

	//redraw which page is selected
	let leftPageIndicator = document.getElementById("leftPageIndicator");
	leftPageIndicator.innerHTML = leftCurrentPage + " of " + leftAllPages;

	//mark selected item (if it is visible)
	if (curMeeting.getId() >= (leftCurrentPage - 1) * currentPageSize && curMeeting.getId() <= leftCurrentPage * currentPageSize) {
		let active = document.getElementById(curMeeting.getId());
		active.className = "active";
	}

	//if the leftAllPages size is smaller then the leftCurrentPage
	if (leftAllPages < leftCurrentPage) {
		prevPage();
	}

	//if the leftCurrentPage gets smaller then the leftAllPage
	if (leftCurrentPage === (leftAllPages - 1) && document.getElementById("leftNextPageBtnDisabled")) {
		let leftNextPageListener = document.getElementById("leftNextPageBtnDisabled");
		leftNextPageListener.addEventListener("click", nextPage);
		leftNextPageListener.id = "leftNextPageBtn";
	}
};

let updateCurMeeting = function (target) {
	curMeeting = data[parseInt(target)];
};

let nextPage = function () {
	leftCurrentPage++;
	if (leftCurrentPage === 2) {
		let leftPrevPageListener = document.getElementById("leftPrevPageBtnDisabled");
		leftPrevPageListener.addEventListener("click", prevPage);
		leftPrevPageListener.id = "leftPrevPageBtn";
	}
	if (leftCurrentPage === leftAllPages) {
		let leftNextPageListener = document.getElementById("leftNextPageBtn");
		leftNextPageListener.removeEventListener("click", nextPage);
		leftNextPageListener.id = "leftNextPageBtnDisabled";
	}
	updateLists();
};

let prevPage = function () {
	leftCurrentPage--;
	if (leftCurrentPage === 1) {
		let leftPrevPageListener = document.getElementById("leftPrevPageBtn");
		leftPrevPageListener.removeEventListener("click", prevPage);
		leftPrevPageListener.id = "leftPrevPageBtnDisabled";
	}
	if (leftCurrentPage === (leftAllPages - 1)) {
		let leftNextPageListener = document.getElementById("leftNextPageBtnDisabled");
		leftNextPageListener.addEventListener("click", nextPage);
		leftNextPageListener.id = "leftNextPageBtn";
	}
	updateLists();
};

// Initiates all Click-handlers
let initHandlers = function () {
	let listListener = document.getElementById("leftList");
	listListener.addEventListener("click", event => updateRightList(event.target.id));

	let leftNextPageListener = document.getElementById("leftNextPageBtn");
	leftNextPageListener.addEventListener("click", nextPage);
};

// IIFE as start
(function () {
	map = new Maps.Maps();
	ListObject = new Lists.Lists();
	data = new Mockdata.Mockdata();
	dbSize = 30;
	leftCurrentPage = 1;
	curMeeting = data[0];
	initView();
	updateLists();
	initHandlers();
})();
