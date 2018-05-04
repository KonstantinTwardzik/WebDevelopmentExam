// IIFE as start of the js-part thats needed in the webapplication

var Meeting = require("./Meeting");

var meetingList;

let initView = function () {
	let main = document.getElementById("main");
	let listSec = document.createElement("section");
	let detailSec = document.createElement("section");
	let logo = document.createElement("img");
	let leftArrow = document.createElement("img");
	let rightArrow = document.createElement("img");
	let list = document.createElement("ul");
	let menubar = document.createElement("section");

	listSec.classList.add("list");
	detailSec.classList.add("detail");
	menubar.classList.add("menubar");
	logo.id = "logo";
	logo.src = "comet_logo.svg";
	logo.alt = "logo_comet";
	leftArrow.src = "angle-left.svg";
	rightArrow.src = "angle-right.svg";
	leftArrow.classList.add("icon");
	rightArrow.classList.add("icon");
	fillList(list);
	menubar.appendChild(leftArrow);
	menubar.appendChild(rightArrow);

	main.appendChild(listSec);
	main.appendChild(detailSec);
	listSec.appendChild(logo);
	listSec.appendChild(list);
	listSec.appendChild(menubar);
};

let fillList = function (list) {
	for (let index = 1; index <= 5; index++) {
		let meeting = meetingList[index - 1];
		let listElement = document.createElement("li");
		let title = document.createElement("p");

		title.innerHTML = meeting.getName();
		listElement.appendChild(title);
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

