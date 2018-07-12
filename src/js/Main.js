// IIFE as start of the js-part thats needed in the webapplication
let Lists = require("./Lists");
let Maps = require("./Maps");
let Meeting = require("./Meeting");
let List;
let Map;
let leftCurrentPage = 1;
let rightCurrentPage = 1;
let leftAllPages;
let rightAllPages;
let leftList;
let rightList;
let allMeetingSizeServer;
let meetingList = [];
let currentMeetingListSize;
let meetingListPointer = 0;
let curMeeting;
let PORT = window.location.port;

// Create Logic & Views
function initView() {
	// initiates foundation of page
	let main = document.getElementById("main");
	let mapWrapper = document.createElement("section");
	let mapSec = Map.createMap(curMeeting);
	let leftList = createLeftList();
	let rightList = createRightList();

	// needed for correct gmaps-integration
	mapWrapper.id = "mapWrapper";

	// builds foundation of page
	mapWrapper.appendChild(mapSec);
	main.appendChild(mapWrapper);
	main.appendChild(leftList);
	main.appendChild(rightList);
}

function initEventListener() {
	window.addEventListener("resize", onResize);

	let listListener = document.getElementById("leftList");
	listListener.addEventListener("click", event => updateCurrentMeeting(event.target.id));

	if (leftCurrentPage < leftAllPages) {
		let leftNextPageListener = document.getElementById("leftNextPageBtn");
		leftNextPageListener.addEventListener("click", leftNextPage);
	}

	let newMeetingListener = document.getElementById("leftAddBtn");
	newMeetingListener.addEventListener("click", showAddDialog);

	let editMeetingListener = document.getElementById("rightEditBtn");
	editMeetingListener.addEventListener("click", showEditDialog);

	let removeMeetingListener = document.getElementById("leftDeleteBtn");
	if (allMeetingSizeServer > 1) {
		removeMeetingListener.addEventListener("click", deleteMeeting);
	}
	else {
		removeMeetingListener.id = "leftDeleteBtnDisabled";
	}

	let printMeetingListener = document.getElementById("rightPrintBtn");
	printMeetingListener.addEventListener("click", printMeeting);

	if (rightCurrentPage < rightAllPages) {
		let rightNextPageListener = document.getElementById("rightNextPageBtn");
		rightNextPageListener.addEventListener("click", rightNextPage);
	}
}

function createLeftList() {
	let logoWrapper = document.createElement("div");
	logoWrapper.id = "logoWrapper";

	let logo = document.createElement("img");
	logo.id = "logo";
	logo.src = "comet_logo.svg";
	logo.alt = "comet_logo";

	let leftListSec = document.createElement("section");
	leftListSec.className = "listSec";
	leftListSec.id = "leftListSec";

	leftList = document.createElement("ul");
	leftList.id = "leftList";

	let menubar = createLeftMenuBar();
	logoWrapper.appendChild(logo);
	leftListSec.appendChild(logoWrapper);
	leftListSec.appendChild(leftList);
	leftListSec.appendChild(menubar);

	return leftListSec;
}

function createLeftMenuBar() {
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
}

function createRightList() {
	let rightHeader = document.createElement("section");
	rightHeader.id = "rightHeader";

	let MeetingTitle = document.createElement("h1");
	MeetingTitle.id = "MeetingTitle";
	MeetingTitle.innerHTML = curMeeting.getName();

	let MeetingTimeLoc = document.createElement("p");
	MeetingTimeLoc.id = "MeetingTimeLoc";
	MeetingTimeLoc.innerHTML = curMeeting.getDate() + ", " + curMeeting.getLocation();

	let rightListSec = document.createElement("section");
	rightListSec.className = "listSec";
	rightListSec.id = "rightListSec";

	rightList = document.createElement("ul");
	rightList.id = "rightList";

	let rightListMenubar = createRightMenuBar();
	rightListMenubar.className = "menubar";

	rightHeader.appendChild(MeetingTitle);
	rightHeader.appendChild(MeetingTimeLoc);
	rightListSec.appendChild(rightHeader);
	rightListSec.appendChild(rightList);
	rightListSec.appendChild(rightListMenubar);

	return rightListSec;
}

function createRightMenuBar() {
	let editBtn = document.createElement("i");
	editBtn.id = "rightEditBtn";
	editBtn.className = "material-icons";
	editBtn.innerHTML = "mode_edit";

	let printBtn = document.createElement("i");
	printBtn.id = "rightPrintBtn";
	printBtn.className = "material-icons";
	printBtn.innerHTML = "print";

	let prevPageBtn = document.createElement("i");
	prevPageBtn.id = "rightPrevPageBtnDisabled";
	prevPageBtn.className = "material-icons";
	prevPageBtn.innerHTML = "keyboard_arrow_left";

	let nextPageBtn = document.createElement("i");
	nextPageBtn.id = "rightNextPageBtn";
	nextPageBtn.className = "material-icons";
	nextPageBtn.innerHTML = "keyboard_arrow_right";

	let pageIndicator = document.createElement("p");
	pageIndicator.id = "rightPageIndicator";

	let menubar = document.createElement("section");
	menubar.className = "menubar";
	menubar.id = "menubar";

	menubar.appendChild(editBtn);
	menubar.appendChild(printBtn);
	menubar.appendChild(prevPageBtn);
	menubar.appendChild(pageIndicator);
	menubar.appendChild(nextPageBtn);

	return menubar;
}

// Logic
function updateCurrentMeeting(pointer) {
	curMeeting = meetingList[parseInt(pointer)];
	meetingListPointer = pointer;
	updateView();
}

function fillMeetingList(jsonArray) {
	let meeting;
	for (let i = 0; i < jsonArray.length; i++) {
		meeting = new Meeting.Meeting(jsonArray[i].id, jsonArray[i].name, jsonArray[i].date, jsonArray[i].location, jsonArray[i].coordinates, jsonArray[i].objects);
		meetingList.push(meeting);
	}
}

function deleteMeeting() {
	if (allMeetingSizeServer === 2) {
		let deleteBtn = document.getElementById("leftDeleteBtn");
		deleteBtn.id = "leftDeleteBtnDisabled";
		deleteBtn.removeEventListener("click", deleteMeeting);
		deleteMeetingServer();
	}
	else {
		deleteMeetingServer();
	}
}

function addMeeting() {
	addMeetingServer();
	let deleteBtn = document.getElementById("leftDeleteBtnDisabled");
	if (deleteBtn) {
		deleteBtn.id = "leftDeleteBtn";
		deleteBtn.addEventListener("click", deleteMeeting);
	}
}

// Add and Edit Dialog
function createAddAndEditDialog(fill) {
	let main = document.getElementById("main");

	let coverPlane = document.createElement("section");
	coverPlane.id = "coverPlane";

	let window = document.createElement("section");
	window.id = "window";

	let menubar = document.createElement("section");
	menubar.id = "dialogMenubar";

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
	date.innerHTML = "Datum: (dd.mm.yyyy)";

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
	List.fillPopupList(list);

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

	menubar.appendChild(cancelBtn);
	menubar.appendChild(okBtn);

	window.appendChild(header);
	window.appendChild(menubar);

	main.appendChild(coverPlane);
	main.appendChild(window);

	coverPlane.addEventListener("click", closeAddAndEditDialog);
	cancelBtn.addEventListener("click", closeAddAndEditDialog);

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
		okBtn.addEventListener("click", editMeetingServer);
	}
	else {
		okBtn.addEventListener("click", addMeeting);
	}
}

function closeAddAndEditDialog() {
	let main = document.getElementById("main");
	let deletableItem = document.getElementById("window");
	main.removeChild(deletableItem);
	deletableItem = document.getElementById("coverPlane");
	main.removeChild(deletableItem);
}

function validationCheck(date, title, location, latitude, longitude, objectlength) {
	let indicator = true;
	let dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;
	let textReg = /(^[a-z ä ö ü ß'-]+$)/i;
	let floatReg = /^[+-]?\d+(\.\d+)?$/;

	if (objectlength === 0) {
		alert("Mindestens ein zu beobachtendes Objekt einfügen.");
		indicator = false;
		return indicator;
	}
	if (!date.value.match(dateReg)) {
		alert("Datumsformat muss dd.mm.yyyy entsprechen.");
		indicator = false;
		return indicator;
	}
	if (!title.value.match(textReg) || !location.value.match(textReg)) {
		alert("Titel und Ort dürfen keine Zahlen oder Sonderzeichen enthalten.");
		indicator = false;
		return indicator;
	}
	if (!latitude.value.match(floatReg) || !longitude.value.match(floatReg)) {
		alert("Längen- und Breitengrad müssen Zahlen sein.");
		indicator = false;
		return indicator;
	}
	return indicator;
}

function showEditDialog() {
	createAddAndEditDialog(true);
}

function showAddDialog() {
	createAddAndEditDialog(false);
}

// Update Views functions
function updateView() {
	updateLeftView();
	updateRightView();
	Map.updateMap(curMeeting);
}

function updateLeftView() {
	updateLeftList();
	updateLeftMenubar();
}

function updateRightView() {
	let MeetingTitle = document.getElementById("MeetingTitle");
	MeetingTitle.innerHTML = curMeeting.getName();

	let MeetingTimeLoc = document.getElementById("MeetingTimeLoc");
	MeetingTimeLoc.innerHTML = curMeeting.getDate() + ", " + curMeeting.getLocation();

	updateRightList();
	updateRightMenubar();
}

function updateLists() {
	updateLeftList();
	updateRightList();
}

function updateLeftList() {
	List.clearLeftList();
	List.fillLeftList(leftList, leftCurrentPage, meetingList);
}

function updateRightList() {
	List.clearRightList();
	List.fillRightList(rightList, rightCurrentPage, curMeeting);
}

function updateMenubars() {
	updateLeftMenubar();
	updateRightMenubar();
}

//TODO:
function updateLeftMenubar() {
	//calculate how many pages there are
	let currentPageSize = List.getCurrentPageSize();
	leftAllPages = Math.max(1, Math.ceil(allMeetingSizeServer / currentPageSize));

	//redraw which page is selected
	let leftPageIndicator = document.getElementById("leftPageIndicator");
	leftPageIndicator.innerHTML = leftCurrentPage + " of " + leftAllPages;

	//if the leftAllPage = 1 disable nextPageBtn - same for rightList
	if (leftAllPages === 1 && document.getElementById("leftNextPageBtn")) {
		let leftNextPageListener = document.getElementById("leftNextPageBtn");
		leftNextPageListener.removeEventListener("click", leftNextPage);
		leftNextPageListener.id = "leftNextPageBtnDisabled";
	}

	//if the leftAllPages size is smaller then the leftCurrentPage, jump to previousPage - same for rightList
	if (leftAllPages < leftCurrentPage) {
		leftPrevPage();
	}

	//if the leftCurrentPage gets smaller then the leftAllPage, enable nextBtn - same for rightList
	if (leftCurrentPage !== leftAllPages && document.getElementById("leftNextPageBtnDisabled")) {
		let leftNextPageListener = document.getElementById("leftNextPageBtnDisabled");
		leftNextPageListener.addEventListener("click", leftNextPage);
		leftNextPageListener.id = "leftNextPageBtn";
	}

	//if the leftAllPage is as big as the leftCurrentPage disable nextBtn - same for rightList
	if (leftAllPages === leftCurrentPage && document.getElementById("leftNextPageBtn")) {
		let leftNextPageListener = document.getElementById("leftNextPageBtn");
		leftNextPageListener.removeEventListener("click", leftNextPage);
		leftNextPageListener.id = "leftNextPageBtnDisabled";
	}

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

	if (List.getCurrentPageSize() * leftCurrentPage > currentMeetingListSize - 20) {
		increaseMeetingList();
	}

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
	//mark selected item (if it is visible)
	if (document.getElementById(meetingListPointer)) {
		let active = document.getElementById("" + meetingListPointer);
		active.className = "active";
	}
}

//TODO:
function updateRightMenubar() {
	//calculate how many pages there are
	let currentPageSize = List.getCurrentPageSize();
	let minimum = 1;
	rightAllPages = Math.max(minimum, Math.ceil(curMeeting.getObjects().length / currentPageSize));

	//redraw which page is selected
	let rightPageIndicator = document.getElementById("rightPageIndicator");
	rightPageIndicator.innerHTML = rightCurrentPage + " of " + rightAllPages;

	//if the leftAllPage = 1 disable nextPageBtn - same for rightList
	if (rightAllPages === 1 && document.getElementById("rightNextPageBtn")) {
		let rightNextPageListener = document.getElementById("rightNextPageBtn");
		rightNextPageListener.removeEventListener("click", rightNextPage);
		rightNextPageListener.id = "rightNextPageBtnDisabled";
	}

	//if the rightAllPages size is smaller then the rightCurrentPage, jump to previousPage
	if (rightAllPages < rightCurrentPage) {
		rightPrevPage();
	}

	//if the leftCurrentPage gets smaller then the leftAllPage, enable nextBtn - same for rightList
	if (rightCurrentPage !== rightAllPages && document.getElementById("rightNextPageBtnDisabled")) {
		let rightNextPageListener = document.getElementById("rightNextPageBtnDisabled");
		rightNextPageListener.addEventListener("click", rightNextPage);
		rightNextPageListener.id = "rightNextPageBtn";
	}

	//if the leftAllPage is as big as the leftCurrentPage disable nextBtn - same for rightList
	if (rightAllPages === rightCurrentPage && document.getElementById("rightNextPageBtn")) {
		let rightNextPageListener = document.getElementById("rightNextPageBtn");
		rightNextPageListener.removeEventListener("click", rightNextPage);
		rightNextPageListener.id = "rightNextPageBtnDisabled";
	}

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
}

// Client-Server functions
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

function initMeetingsServer() {
	let start = 0;
	let end = 99;
	makeRequest("GET", "http://localhost:" + PORT + "/returnRange?start=" + start + "&end=" + end)
		.then(function (DatabaseSnippet) {	//value is the json string from start to end
			let jsonArray = JSON.parse(DatabaseSnippet);	//value must me JSON.parsed to be an object
			fillMeetingList(jsonArray);
			curMeeting = meetingList[0];
			initView();
			updateLists();
			updateMenubars();
			initEventListener();
			currentMeetingListSize = meetingList.length;
		})
		.catch(function (err) {
			console.error("initMeetingsServer: ", err.statusText);
		});
}

function addMeetingServer() {
	let title = document.getElementById("titleTF");
	let date = document.getElementById("dateTF");
	let location = document.getElementById("locationTF");
	let latitude = document.getElementById("latitudeTF");
	let longitude = document.getElementById("longitudeTF");
	let coordinates = [latitude.value, longitude.value];
	let objects = [];

	for (let i = 0; i < 99; i++) {
		let object = document.getElementById("popupListElement" + i);
		if (object.value !== "") {
			objects.push(object.value);
		}
	}

	if (validationCheck(date, title, location, latitude, longitude, objects.length)) {
		makeRequest("POST", "http://localhost:" + PORT + "/addNewMeeting?name=" + title.value + "&date=" + date.value + "&location="
			+ location.value + "&coordinates=" + coordinates + "&objects=" + objects)
			.then(function (newDbSize) {	//TODO: value change
				allMeetingSizeServer = parseInt(newDbSize);
				loadLastMeetingServer();
				closeAddAndEditDialog();
			})
			.catch(function (err) {
				console.error("addMeetingServer: ", err.statusText);
			});
	}
}

function editMeetingServer() {
	let id = curMeeting.getId();
	let title = document.getElementById("titleTF");
	let date = document.getElementById("dateTF");
	let location = document.getElementById("locationTF");
	let latitude = document.getElementById("latitudeTF");
	let longitude = document.getElementById("longitudeTF");
	let coordinates = [latitude.value, longitude.value];
	let objects = [];

	for (let i = 0; i < 99; i++) {
		let object = document.getElementById("popupListElement" + i);
		if (object.value !== "") {
			objects.push(object.value);
		}
	}

	if (validationCheck(date, title, location, latitude, longitude, objects.length)) {
		makeRequest("PUT", "http://localhost:" + PORT + "/editMeeting?id=" + id + "&name=" + title.value + "&date=" + date.value + "&location="
			+ location.value + "&coordinates=" + coordinates + "&objects=" + objects)
			.then(function (editedMeetingJson) {
				editedMeetingJson = JSON.parse(editedMeetingJson);
				let editedMeeting = new Meeting.Meeting(editedMeetingJson.id, editedMeetingJson.name, editedMeetingJson.date, editedMeetingJson.location, editedMeetingJson.coordinates, editedMeetingJson.objects);

				if (parseFloat(editedMeeting.coordinates[0]) !== parseFloat(curMeeting.getCoordinates()[0]) || parseFloat(editedMeeting.coordinates[1]) !== parseFloat(curMeeting.getCoordinates()[1])) {
					curMeeting = editedMeeting;
					Map.updateMap(curMeeting);
				}
				else {
					curMeeting = editedMeeting;
				}
				meetingList[meetingListPointer] = editedMeeting;
				updateCurrentMeeting(meetingListPointer);
				closeAddAndEditDialog();
			}).catch(function (err) {
				console.error("editMeetingServer: ", err.statusText);
			});
	}
}

function deleteMeetingServer() {
	makeRequest("DELETE", "http://localhost:" + PORT + "/deleteMeeting?id=" + curMeeting.getId() + "&end=" + (currentMeetingListSize))	//get the actual Array Size for paginating the left lis
		.then((newCompleteDb) => {
			meetingList.length = 0;
			let jsonArray = JSON.parse(newCompleteDb);	//db must me JSON.parsed to be an object
			fillMeetingList(jsonArray);
			if (parseInt(meetingListPointer) === parseInt(meetingList.length)) {
				--meetingListPointer;
			}
			allMeetingSizeServer--;
			updateCurrentMeeting(meetingListPointer);
		})
		.catch(function (err) {
			console.error("deleteMeetingServer: ", err.statusText);
		});
}

function increaseMeetingList() {
	let start = currentMeetingListSize;
	let end = 99 + start;
	currentMeetingListSize += 100;
	makeRequest("GET", "http://localhost:" + PORT + "/returnRange?start=" + start + "&end=" + end)
		.then(function (DatabaseSnippet) {	//value is the json string from start to end
			let jsonArray = JSON.parse(DatabaseSnippet);	//value must me JSON.parsed to be an object
			fillMeetingList(jsonArray);
		})
		.catch(function (err) {
			console.error("increaseMeetingListServer: ", err.statusText);
		});
}

function loadLastMeetingServer() {
	if ((meetingList.length + 1) === allMeetingSizeServer) {
		let start = meetingList.length;
		let end = allMeetingSizeServer;
		makeRequest("GET", "http://localhost:" + PORT + "/returnRange?start=" + start + "&end=" + end)
			.then(function (DatabaseSnippet) {	//value is the json string from start to end
				let jsonArray = JSON.parse(DatabaseSnippet);	//value must me JSON.parsed to be an object
				fillMeetingList(jsonArray);
				updateLists();
			})
			.catch(function (err) {
				console.error("loadLastMeetingServer: ", err.statusText);
			});
	}
}

function getAllMeetingsSize() {
	// getFeed().then(data => vm.feed = data);
	makeRequest("GET", "http://localhost:" + PORT + "/returnArraySize")	//get the actual Array Size for paginating the left lis
		.then((DatabaseSize) => {					//its actually a string but it works
			allMeetingSizeServer = DatabaseSize;		//assign value to a variable
		})
		.catch(function (err) {
			console.error("GetAllMeetingSize: ", err.statusText);
		});
}

// Paginating function
function leftNextPage() {
	leftCurrentPage++;
	updateLeftView();
}

function leftPrevPage() {
	leftCurrentPage--;
	updateLeftView();
}

function rightNextPage() {
	rightCurrentPage++;
	updateRightView();
}

function rightPrevPage() {
	rightCurrentPage--;
	updateRightView();
}

// Resizes function
function onResize() {
	//load data if necessary
	while (List.getCurrentPageSize() * leftCurrentPage > currentMeetingListSize - 20) {
		increaseMeetingList();
	}
	updateLists();
	updateMenubars();
}

// Printing function
function printMeeting() {
	hideAllViews();

	let leftListSec = document.getElementById("leftListSec");

	let mapWrapper = document.getElementById("mapWrapper");
	mapWrapper.id = "mapWrapperPrint";

	let logo = document.createElement("img");
	logo.id = "logoPrint";
	logo.src = "comet_logo.svg";
	logo.alt = "comet_logo";

	let main = document.getElementById("main");

	let site = document.createElement("section");
	site.className = "Print";

	let titleSection = document.createElement("section");
	titleSection.id = "titleSection";

	let title = document.createElement("h1");
	title.innerHTML = curMeeting.getName();

	let dateAndLocation = document.createElement("p");
	dateAndLocation.id = "dateAndLocation";
	dateAndLocation.innerHTML = curMeeting.getDate() + ", " + curMeeting.getLocation();

	let objectsSection = document.createElement("section");
	objectsSection.id = "objectsSection";

	let objects = curMeeting.getObjects();
	for (let index = 0; index < objects.length; index++) {
		let object = document.createElement("p");
		object.innerHTML = (index + 1) + ". " + objects[index];
		objectsSection.appendChild(object);
	}

	titleSection.appendChild(title);
	titleSection.appendChild(dateAndLocation);
	titleSection.appendChild(logo);
	site.appendChild(titleSection);
	site.appendChild(objectsSection);
	site.appendChild(mapWrapper);
	main.appendChild(site);

	Map.updateMap(curMeeting);

	setTimeout(() => {
		window.print();
		mapWrapper.id = "mapWrapper";
		main.insertBefore(mapWrapper, leftListSec);
		showAllViews();
		main.removeChild(site);
	}, 300);
}

function hideAllViews() {
	let leftList = document.getElementById("leftListSec");
	let rightList = document.getElementById("rightListSec");

	leftList.style.display = "none";
	rightList.style.display = "none";
}

function showAllViews() {
	let leftList = document.getElementById("leftListSec");
	let rightList = document.getElementById("rightListSec");

	leftList.style.display = "block";
	rightList.style.display = "block";
}

// IIFE as start
(function () {
	getAllMeetingsSize();
	Map = new Maps.Maps();
	List = new Lists.Lists();
	initMeetingsServer();
})();

//update menubars methoden aufräumen

//database with coordinates from -90 to +90
//favicon.ico won't be found if its not port 8080
//packages.json und files ordnen
//less aufräumen
//Firefox testen

//überfliessen der texte verhindern
//man hat nur 1 element fügt eins hinzu, bei seite neu laden - kaputt

