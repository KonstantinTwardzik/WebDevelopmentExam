// IIFE as start of the js-part thats needed in the webapplication
var Lists = require("./Lists");
var Maps = require("./Maps");
var Meeting = require("./Meeting");
var dbSize;
var leftCurrentPage;
var rightCurrentPage;
var leftAllPages;
var rightAllPages;
var leftList;
var rightList;
var curMeeting;
var ListObject;
var data;
var map;
let displayingItems;
let arraySize;
let currentArraySize;

let initView = function () {
	let main = document.getElementById("main");
	let mapWrapper = document.createElement("section");
	let mapSec = map.updateMap(curMeeting);
	let leftList = createLeftList();
	let rightList = createRightList();

	// needed for correct gmaps-integration
	mapWrapper.id = "mapWrapper";

	mapWrapper.appendChild(mapSec);
	main.appendChild(mapWrapper);
	main.appendChild(leftList);
	main.appendChild(rightList);
};

let createLeftList = function () {
	let logoWrapper = document.createElement("div");
	logoWrapper.id = "logoWrapper";

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

	logoWrapper.appendChild(logo);
	leftListSec.appendChild(logoWrapper);
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
	prevPageBtn.id = "rightPrevPageBtnDisabled";
	prevPageBtn.className = "material-icons";
	prevPageBtn.innerHTML = "keyboard_arrow_left";

	let nextPageBtn = document.createElement("i");
	nextPageBtn.id = "rightNextPageBtn";
	nextPageBtn.className = "material-icons";
	nextPageBtn.innerHTML = "keyboard_arrow_right";

	let editBtn = document.createElement("i");
	editBtn.id = "rightEditBtn";
	editBtn.className = ("material-icons");
	editBtn.innerHTML = "mode_edit";

	let pageIndicator = document.createElement("p");
	pageIndicator.id = "rightPageIndicator";

	let menubar = document.createElement("section");
	menubar.className = "menubar";
	menubar.id = "menubar";
	menubar.appendChild(editBtn);
	menubar.appendChild(prevPageBtn);
	menubar.appendChild(pageIndicator);
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

let createDialogue = function (fill) {
	let main = document.getElementById("main");

	let plane = document.createElement("section");
	plane.id = "plane";

	let window = document.createElement("section");
	window.id = "window";

	let toolbar = document.createElement("section");
	toolbar.id = "toolbar";

	let header = document.createElement("section");
	header.id = "header";

	let title = document.createElement("p");
	title.id = "title";
	title.innerHTML = "Titel:";

	let titleDiv = document.createElement("div");
	titleDiv.id = "titleDiv";

	let titleTF = document.createElement("input");
	titleTF.id = "titleTF";
	titleTF.className = "input";

	let date = document.createElement("p");
	date.id = "date";
	date.innerHTML = "Datum: (yyyy-mm-dd)";

	let dateDiv = document.createElement("div");
	dateDiv.id = "dateDiv";

	let dateTF = document.createElement("input");
	dateTF.id = "dateTF";
	dateTF.className = "input";

	let location = document.createElement("p");
	location.id = "location";
	location.innerHTML = "Ort:";

	let locationDiv = document.createElement("div");
	locationDiv.id = "locationDiv";

	let locationTF = document.createElement("input");
	locationTF.id = "locationTF";
	locationTF.className = "input";

	let latitude = document.createElement("p");
	latitude.id = "latitude";
	latitude.innerHTML = "Breitengrad:";

	let latitudeDiv = document.createElement("div");
	latitudeDiv.id = "latitudeDiv";

	let latitudeTF = document.createElement("input");
	latitudeTF.id = "latitudeTF";
	latitudeTF.className = "input";

	let longitude = document.createElement("p");
	longitude.id = "longitude";
	longitude.innerHTML = "Längengrad:";

	let longitudeDiv = document.createElement("div");
	longitudeDiv.id = "longitudeDiv";

	let longitudeTF = document.createElement("input");
	longitudeTF.id = "longitudeTF";
	longitudeTF.className = "input";

	let okBtn = document.createElement("p");
	okBtn.className = "button";
	okBtn.id = "okBtn";
	okBtn.innerHTML = "Ok";

	let cancelBtn = document.createElement("p");
	cancelBtn.className = "button";
	cancelBtn.id = "cancelBtn";
	cancelBtn.innerHTML = "Abbrechen";

	let listDiv = document.createElement("div");
	listDiv.id = "listDiv";

	let list = document.createElement("ol");
	list.id = "objectList";
	ListObject.fillPopupList(list);

	listDiv.appendChild(list);
	window.appendChild(listDiv);

	header.appendChild(title);
	titleDiv.appendChild(titleTF);
	header.appendChild(titleDiv);

	header.appendChild(date);
	dateDiv.appendChild(dateTF);
	header.appendChild(dateDiv);

	header.appendChild(location);
	locationDiv.appendChild(locationTF);
	header.appendChild(locationDiv);

	header.appendChild(latitude);
	latitudeDiv.appendChild(latitudeTF);
	header.appendChild(latitudeDiv);

	header.appendChild(longitude);
	longitudeDiv.appendChild(longitudeTF);
	header.appendChild(longitudeDiv);

	toolbar.appendChild(cancelBtn);
	toolbar.appendChild(okBtn);

	window.appendChild(header);
	window.appendChild(toolbar);

	main.appendChild(plane);
	main.appendChild(window);

	plane.addEventListener("click", closeDialogue);
	cancelBtn.addEventListener("click", closeDialogue);
	if (fill) {
		okBtn.addEventListener("click", editExistingMeeting);
	}
	else {
		okBtn.addEventListener("click", addNewMeeting);
	}

	if (fill) {
		titleTF.value = curMeeting.getName();
		dateTF.value = curMeeting.getDate();
		locationTF.value = curMeeting.getLocation();
		let coordinates = curMeeting.getCoordinates();
		latitudeTF.value = coordinates[0];
		longitudeTF.value = coordinates[1];
		let objects = curMeeting.getObjects();
		for (let i = 0; i < objects.length; i++) {
			let lE = document.getElementById("popupListElement" + i);
			lE.value = objects[i];
		}
	}
};

let showFilledDialogue = function () {
	createDialogue(true);
};

let showEmptyDialogue = function () {
	createDialogue(false);
};

let updateRightList = function (target) {
	updateCurMeeting(target);
	updateLists();

	let mapWrapper = document.getElementById("mapWrapper");
	mapWrapper.replaceChild(map.updateMap(curMeeting), document.getElementById("map"));

	let MeetingTitle = document.getElementById("MeetingTitle");
	MeetingTitle.innerHTML = curMeeting.getName();

	let MeetingTimeLoc = document.getElementById("MeetingTimeLoc");
	MeetingTimeLoc.innerHTML = curMeeting.getDate() + ", " + curMeeting.getLocation();
};

//THOMAS:
function makeRequest(method, url) {
	return new Promise(function (resolve, reject) {
		let request = new XMLHttpRequest();
		request.open(method, url);
		request.onreadystatechange = function () {
			if (this.readyState === 4) {
				resolve(request.response);
			}
			else if ((this.status < 200 && this.status >= 300)) {
				reject({
					status: this.status,
					statusText: request.statusText
				});
			}
		};
		request.onerror = function () {
			reject({
				status: this.status,
				statusText: request.statusText
			});
		};
		request.send();
	});
}

function initiateData() {
	let start = 0;
	let end = 99;
	makeRequest("GET", "http://localhost:8080/returnRange?start=" + start + "&end=" + end)
		.then(function (value) {	//value is the json string from start to end
			displayingItems = JSON.parse(value);	//value must me JSON.parsed to be an object
			data = createMeetingList();
			curMeeting = data[0];
			initView();
			updateLists();
			initHandlers();
			currentArraySize = 100;
		})
		.catch(function (err) {
			console.error("updateDataError: ", err.statusText);
		});
}

function addNewMeeting() {
	//zugriff auf die werte über .value, also z.b title.value
	let id = dbSize; // bei id gilt das nicht
	let title = document.getElementById("titleTF");
	let date = document.getElementById("dateTF");
	let location = document.getElementById("locationTF");
	let latitude = document.getElementById("latitudeTF");
	let longitude = document.getElementById("longitudeTF");
	let coordinates = [latitude.value, longitude.value];
	let objects = [];
	console.log(id + ", " + title.value + ", " + date.value + ", " + location.value + ", " + coordinates[0] + ", " + coordinates[1]);
	for (let i = 0; i < 99; i++) {
		let object = document.getElementById("popupListElement" + i);
		if (object.value !== "") {
			objects.push(object.value);
		}
	}
	// dann serverseitig hinzufügen
	makeRequest("GET", "http://localhost:8080/addNewMeeting?id=" + id + "&name=" + title.value + "&date=" + date.value + "&location="
		+ location.value + "&latitude=" + latitude.value + "&longitude=" + longitude.value + "&coordinates=" + coordinates + "&objects=" + objects)
		.then(function (value) {	//value = db.meetings
			dbSize++;
			closeDialogue();
			//TODO: update database with value HERE
		});
}

function editExistingMeeting() {
	//zugriff auf die werte über .value, also z.b title.value
	let id = document.getElementById(curMeeting.getId()); 	//TODO: add currently seleted id here.
	let title = document.getElementById("titleTF");
	let date = document.getElementById("dateTF");
	let location = document.getElementById("locationTF");
	let latitude = document.getElementById("latitudeTF");
	let longitude = document.getElementById("longitudeTF");
	let coordinates = [latitude.value, longitude.value];
	let objects = [];

	console.log(id + ", " + title.value + ", " + date.value + ", " + location.value + ", " + coordinates[0] + ", " + coordinates[1]);
	for (let i = 0; i < 99; i++) {
		let object = document.getElementById("popupListElement" + i);
		if (object.value !== "") {
			objects.push(object.value);
		}
	}
	makeRequest("GET", "http://localhost:8080/editMeeting?id=" + id + "&name=" + title.value + "&date=" + date.value + "&location="
		+ location.value + "&latitude=" + latitude.value + "&longitude=" + longitude.value + "&coordinates=" + coordinates + "&objects=" + objects)
		.then(function (value) {	//value = db.meetings
			closeDialogue();
			//TODO: update database with value HERE
		});
}

function loadData() {
	let start = currentArraySize;
	currentArraySize += 99;
	let end = currentArraySize;
	++currentArraySize;
	makeRequest("GET", "http://localhost:8080/returnRange?start=" + start + "&end=" + end)
		.then(function (value) {	//value is the json string from start to end
			displayingItems = JSON.parse(value);	//value must me JSON.parsed to be an object
			addEntriesToMeetingList();
		})
		.catch(function (err) {
			console.error("updateDataError: ", err.statusText);
		});
}

//THOMAS:
function getArraySize() {
	// getFeed().then(data => vm.feed = data);
	makeRequest("GET", "http://localhost:8080/returnArraySize")	//get the actual Array Size for paginating the left lis
		.then((value) => {					//its actually a string but it works
			dbSize = value;		//assign value to a variable
		})
		.catch(function (err) {
			console.error("returnArraySize Error: ", err.statusText);
		});
	// console.log("arraySize: " + arraySize);		//at first it's undefined, but after a bit, it will be assigned with the right value
	// dbSize = arraySize;								// overrides the initial dummyvalue of 30 with the actual database size
	// console.log("dbSize: " + dbSize);			//control log
	// console.log("returnsize: " + arraySize);
	return arraySize;
}

// Pagination on window-resize
window.onresize = function () {
	while (ListObject.getCurrentPageSize() * leftCurrentPage > currentArraySize - 20) {
		loadData();
	}
	updateLists();
};

let updateLists = function () {
	//redraw all lists
	ListObject.clearLists();
	ListObject.fillLeftList(leftList, leftCurrentPage, data);
	ListObject.fillRightList(rightList, rightCurrentPage, curMeeting);

	//calculate how many pages there are
	let currentPageSize = ListObject.getCurrentPageSize();
	let minimum = 1;
	leftAllPages = Math.max(minimum, Math.ceil(dbSize / currentPageSize));
	rightAllPages = Math.max(minimum, Math.ceil(curMeeting.getObjects().length / currentPageSize));

	//redraw which page is selected
	let leftPageIndicator = document.getElementById("leftPageIndicator");
	leftPageIndicator.innerHTML = leftCurrentPage + " of " + leftAllPages;
	let rightPageIndicator = document.getElementById("rightPageIndicator");
	rightPageIndicator.innerHTML = rightCurrentPage + " of " + rightAllPages;

	//mark selected item (if it is visible)
	if (document.getElementById(curMeeting.getId())) {
		let active = document.getElementById(curMeeting.getId());
		active.className = "active";
	}

	//if the leftAllPage = 1 disable next Page Btn - same for rightList
	if (leftAllPages === 1 && document.getElementById("leftNextPageBtn")) {
		let leftNextPageListener = document.getElementById("leftNextPageBtn");
		leftNextPageListener.removeEventListener("click", leftNextPage);
		leftNextPageListener.id = "leftNextPageBtnDisabled";
	}
	if (rightAllPages === 1 && document.getElementById("rightNextPageBtn")) {
		let rightNextPageListener = document.getElementById("rightNextPageBtn");
		rightNextPageListener.removeEventListener("click", rightNextPage);
		rightNextPageListener.id = "rightNextPageBtnDisabled";
	}

	//if the leftAllPages size is smaller then the leftCurrentPage - same for rightList
	if (leftAllPages < leftCurrentPage) {
		leftPrevPage();
	}
	if (rightAllPages < rightCurrentPage) {
		rightPrevPage();
	}

	//if the leftCurrentPage gets smaller then the leftAllPage - same for rightList
	if (leftCurrentPage !== leftAllPages && document.getElementById("leftNextPageBtnDisabled")) {
		let leftNextPageListener = document.getElementById("leftNextPageBtnDisabled");
		leftNextPageListener.addEventListener("click", leftNextPage);
		leftNextPageListener.id = "leftNextPageBtn";
	}
	if (rightCurrentPage !== rightAllPages && document.getElementById("rightNextPageBtnDisabled")) {
		let rightNextPageListener = document.getElementById("rightNextPageBtnDisabled");
		rightNextPageListener.addEventListener("click", rightNextPage);
		rightNextPageListener.id = "rightNextPageBtn";
	}
};

let updateCurMeeting = function (target) {
	curMeeting = data[parseInt(target)];
};

let leftNextPage = function () {
	leftCurrentPage++;
	if (leftCurrentPage === 2 && document.getElementById("leftPrevPageBtnDisabled")) {
		let leftPrevPageListener = document.getElementById("leftPrevPageBtnDisabled");
		leftPrevPageListener.addEventListener("click", leftPrevPage);
		leftPrevPageListener.id = "leftPrevPageBtn";
	}
	if (leftCurrentPage === leftAllPages && document.getElementById("leftNextPageBtn")) {
		let leftNextPageListener = document.getElementById("leftNextPageBtn");
		leftNextPageListener.removeEventListener("click", leftNextPage);
		leftNextPageListener.id = "leftNextPageBtnDisabled";
	}
	if (ListObject.getCurrentPageSize() * leftCurrentPage > currentArraySize - 20) {
		loadData();
		console.log("ausgeführt");
	}
	updateLists();
};

let leftPrevPage = function () {
	leftCurrentPage--;
	if (leftCurrentPage === 1 && document.getElementById("leftPrevPageBtn")) {
		let leftPrevPageListener = document.getElementById("leftPrevPageBtn");
		leftPrevPageListener.removeEventListener("click", leftPrevPage);
		leftPrevPageListener.id = "leftPrevPageBtnDisabled";
	}
	if (leftCurrentPage === (leftAllPages - 1) && document.getElementById("leftNextPageBtnDisabled")) {
		let leftNextPageListener = document.getElementById("leftNextPageBtnDisabled");
		leftNextPageListener.addEventListener("click", leftNextPage);
		leftNextPageListener.id = "leftNextPageBtn";
	}
	updateLists();
};

let rightNextPage = function () {
	rightCurrentPage++;
	if (rightCurrentPage === 2 && document.getElementById("rightPrevPageBtnDisabled")) {
		let rightPrevPageListener = document.getElementById("rightPrevPageBtnDisabled");
		rightPrevPageListener.addEventListener("click", rightPrevPage);
		rightPrevPageListener.id = "rightPrevPageBtn";
	}
	if (rightCurrentPage === rightAllPages && document.getElementById("rightNextPageBtn")) {
		let rightNextPageListener = document.getElementById("rightNextPageBtn");
		rightNextPageListener.removeEventListener("click", rightNextPage);
		rightNextPageListener.id = "rightNextPageBtnDisabled";
	}
	updateLists();
};

let rightPrevPage = function () {
	rightCurrentPage--;
	if (rightCurrentPage === 1 && document.getElementById("rightPrevPageBtn")) {
		let rightPrevPageListener = document.getElementById("rightPrevPageBtn");
		rightPrevPageListener.removeEventListener("click", rightPrevPage);
		rightPrevPageListener.id = "rightPrevPageBtnDisabled";
	}
	if (rightCurrentPage === (rightAllPages - 1) && document.getElementById("rightNextPageBtnDisabled")) {
		let rightNextPageListener = document.getElementById("rightNextPageBtnDisabled");
		rightNextPageListener.addEventListener("click", rightNextPage);
		rightNextPageListener.id = "rightNextPageBtn";
	}
	updateLists();
};

let closeDialogue = function () {
	let main = document.getElementById("main");
	let deletableItem = document.getElementById("window");

	main.removeChild(deletableItem);

	deletableItem = document.getElementById("plane");

	main.removeChild(deletableItem);
};

// Initiates most of the click-handlers
let initHandlers = function () {
	let listListener = document.getElementById("leftList");
	listListener.addEventListener("click", event => updateRightList(event.target.id));

	let leftNextPageListener = document.getElementById("leftNextPageBtn");
	leftNextPageListener.addEventListener("click", leftNextPage);

	if (rightCurrentPage < curMeeting.objects.length) {
		let rightNextPageListener = document.getElementById("rightNextPageBtn");
		rightNextPageListener.addEventListener("click", rightNextPage);
	}

	let newMeetingListener = document.getElementById("leftAddBtn");
	newMeetingListener.addEventListener("click", showEmptyDialogue);

	let editMeetingListener = document.getElementById("rightEditBtn");
	editMeetingListener.addEventListener("click", showFilledDialogue);
};

let createMeetingList = function () {
	let serverItems = displayingItems;
	let meetingList = [];
	let meeting;
	for (let i = 0; i < serverItems.length; i++) {
		meeting = new Meeting.Meeting(serverItems[i].id, serverItems[i].name, serverItems[i].date, serverItems[i].location, serverItems[i].coordinates, serverItems[i].objects);
		meetingList.push(meeting);
	}
	return meetingList;
};

let addEntriesToMeetingList = function () {
	let serverItems = displayingItems;
	let meeting;
	for (let i = 0; i < serverItems.length; i++) {
		meeting = new Meeting.Meeting(serverItems[i].id, serverItems[i].name, serverItems[i].date, serverItems[i].location, serverItems[i].coordinates, serverItems[i].objects);
		data.push(meeting);
	}
};

// IIFE as start
(function () {
	leftCurrentPage = 1;
	rightCurrentPage = 1;
	getArraySize();
	map = new Maps.Maps();
	ListObject = new Lists.Lists();
	initiateData();
})();
