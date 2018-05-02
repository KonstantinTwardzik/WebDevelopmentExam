// IIFE as start of the js-part thats needed in the webapplication

var Meeting = require("./Meeting");

var meetingList;

let initView = function () {
	let main = document.getElementById("main");
	let menuSec = document.createElement("section");
	let listSec = document.createElement("section");
	let logo = document.createElement("img");
	let list = document.createElement("ul");

	menuSec.classList.add("navigation");
	listSec.classList.add("list");
	logo.id = "logo";
	logo.src = "comet_logo.svg";
	logo.alt = "logo_comet";
	fillList(list);

	main.appendChild(menuSec);
	main.appendChild(listSec);
	menuSec.appendChild(logo);
	listSec.appendChild(list);
};

let fillList = function (list) {
	for (let index = 1; index <= 5; index++) {
		let meeting = meetingList[index - 1];
		let listElement = document.createElement("li");
		let eventSec = document.createElement("section");
		let heading = document.createElement("h1");
		let date = document.createElement("p");
		let location = document.createElement("p");
		let objects = document.createElement("p");

		heading.innerHTML = meeting.getName();
		eventSec.classList.add("event");
		date.innerHTML = "Date: " + meeting.getDate();
		location.innerHTML = "Location: " + meeting.getLocation();
		objects.innerHTML = "Objects: ";

		let objectList = meeting.getObjects();
		for (let i = 0; i < objectList.length; ++i) {
			if (i >= objectList.length - 1) {
				objects.innerHTML += objectList[i];
			}
			else {
				objects.innerHTML += objectList[i] + ", ";
			}
		}

		eventSec.appendChild(heading);
		eventSec.appendChild(date);
		eventSec.appendChild(location);
		eventSec.appendChild(objects);
		listElement.appendChild(eventSec);
		list.appendChild(listElement);
	}
};

let createMockData = function () {
	let meeting1 = new Meeting.Meeting("Trierer Clubtreffen April", "20.04.2018", "Trier", ["Komet1", "Komet2", "Asteroid1", "Asteroid2"]);
	let meeting2 = new Meeting.Meeting("Sondertreffen", "26.06.2018", "Konz", ["Asteroid1", "Asteroid2"]);
	let meeting3 = new Meeting.Meeting("Trierer Clubtreffen Oktober", "12.10.2018", "Konz", ["Komet2", "Komet3"]);
	let meeting4 = new Meeting.Meeting("Sondertreffen", "18.11.2018", "Saarbrücken", ["Asteroid1", "Komet1", "Komet2"]);
	let meeting5 = new Meeting.Meeting("Trierer Clubtreffen Dezember", "03.12.2018", "Trier", ["Komet1", "Asteroid2"]);
	meetingList = [meeting1, meeting2, meeting3, meeting4, meeting5];
};

(function () {
	createMockData();
	initView();
})();

