const express = require("express");
let server = express();
var path = require("path");
var db = require("./meetings.json");
var bodyParser = require("body-parser");
const fs = require("fs");

let port = process.argv[2];
// argv[0] = node
// argv[1] = express.js
// argv[0] = 1. argument... //in diesem fall der Port, usw

const BASE_URI = "http://localhost:${port}";
server.use(bodyParser.json());

// var dateLogger = function (req, res, next) {	//wird immer getriggert, wenn eine getanfrage kommt
// 	next();										//damit nicht hiernach abgebrochen wird
// };

server.use(express.static(__dirname + "/public"));	//nutze alles, was im ordern /public liegt

if (port) {
	server.listen(port, () => console.log("listening on port " + port));	//falls ein port als argument mit angegeben wurde, gib dies aus
}
else {
	server.listen(8080, () => console.log("listening on port 8080"));		//anderenfalls lausche auf port 8080
}

//URLs definieren:
server.get("", (req, res) => {
	res.send({
		__links: {
			returnArraySize: { href: "${BASE_URI}/returnArraySize" },
			deleteMeeting: { href: "${BASE_URI}/deleteMeeting" },
		}
	});
	res.json({
		__links: {
			self: { href: "${BASE_URI}" },
			returnRange: { href: "${BASE_URI}/returnRange" },			//definiert die URL, die angesprochen werden kann "localhost:8080/returnRange"
			addNewMeeting: { href: "${BASE_URI}/addNewMeeting" },
			addNewObjectToMeeting: { href: "${BASE_URI}/addNewObjectToMeeting" },
			removeMeeting: { href: "${BASE_URI}/removeMeeting" },
		}
	});
});

server.delete("/deleteMeeting", (request, response) => {
	let id = parseInt(request.query.id);
	let start = 0;
	let end = parseInt(request.query.end);
	if (end > Object.keys(db.meetings).length - 1) {	//checkt, ob der end-wert die tatsächliche Größe des Arrays nicht pbersteigt
		end = Object.keys(db.meetings).length - 1;		//wenn doch,: gleichsetzen --> kein memory flood durch http://localhost:8080/returnRange?start=0&end=999999999
	}
	if (start > Object.keys(db.meetings).length - 1) {	//checkt, ob der end-wert die tatsächliche Größe des Arrays nicht pbersteigt
		start = Object.keys(db.meetings).length - 1;		//wenn doch,: gleichsetzen --> kein memory flood durch http://localhost:8080/returnRange?start=0&end=999999999
	}
	if (start === end) {
		response.sendStatus(404);
		return;
	}

	for (let i = 0; i < db.meetings.length; i++) {
		if (parseInt(db.meetings[i].id) === id) {
			db.meetings.splice(i, 1);
			makePersistent();
			var responseArray = [];						//neues leeres Array erstellen, das letztendlich an den client zurückgegeben wird
			for (let index = start; index < end; index++) {	//For loop läuft von start bis end
				responseArray.push(db.meetings[index]);			//füllt das responseArray mit den entsprechenden meetings.json's
			}
			response.json(responseArray);
			return;
		}
	}
	response.sendStatus(404);
});

server.get("/editMeeting", (request, response) => {
	//Attributes for the object:
	let id = parseInt(request.query.id);
	let name = request.query.name;	//name of the meeting
	let date = request.query.date;	//YYYY-MM-DD
	let coordinates = [];
	coordinates[0] = parseFloat(request.query.coordinates.split(",")[0]);
	coordinates[1] = parseFloat(request.query.coordinates.split(",")[1]);
	let location = request.query.location;
	let objects = request.query.objects.split(",");

	let objectToAdd = {
		id: id,
		name: name,
		date: date,
		location: location,
		coordinates: coordinates,
		objects: objects
	};
	db.meetings[id] = objectToAdd;	//Y U WORK!?
	makePersistent();
	response.json(db.meetings[id]);
});

function makePersistent() {
	fs.writeFile("./meetings.json", JSON.stringify(db), (err) => {
		if (err) {
			console.log("The file has been saved!");
			throw err;
		}
	});
}

server.get("/addNewMeeting", (request, response) => {
	//Attributes for the object:
	let id = parseInt(db.meetings[db.meetings.length - 1].id + 1);
	let name = request.query.name;	//name of the meeting
	let date = request.query.date;	//YYYY-MM-DD
	let coordinates = [];
	coordinates[0] = parseFloat(request.query.coordinates.split(",")[0]);
	coordinates[1] = parseFloat(request.query.coordinates.split(",")[1]);
	let location = request.query.location;
	let objects = request.query.objects.split(",");

	let objectToAdd = {
		id: id,
		name: name,
		date: date,
		location: location,
		coordinates: coordinates,
		objects: objects
	};
	db.meetings[db.meetings.length] = objectToAdd;	//Y U WORK!?
	makePersistent();
	response.json(db.meetings);
});

server.get("/returnRange", (request, response) => {
	let start = parseInt(request.query.start);			//nimmt sich den wert der id "start" in der url
	let end = parseInt(request.query.end);				//nimmt sich den wert der id "end" in der url
	if (end > Object.keys(db.meetings).length - 1) {	//checkt, ob der end-wert die tatsächliche Größe des Arrays nicht pbersteigt
		end = Object.keys(db.meetings).length - 1;		//wenn doch,: gleichsetzen --> kein memory flood durch http://localhost:8080/returnRange?start=0&end=999999999
	}
	if (start > Object.keys(db.meetings).length - 1) {	//checkt, ob der end-wert die tatsächliche Größe des Arrays nicht pbersteigt
		return;		//wenn doch,: gleichsetzen --> kein memory flood durch http://localhost:8080/returnRange?start=0&end=999999999
	}
	var responseArray = [];						//neues leeres Array erstellen, das letztendlich an den client zurückgegeben wird
	for (let index = start; index <= end; index++) {	//For loop läuft von start bis end
		responseArray.push(db.meetings[index]);			//füllt das responseArray mit den entsprechenden meetings.json's
	}
	// response.send(responseString);				//Als response wird der responseString gewählt
	// Persitenz
	fs.writeFile("./meetings.json", JSON.stringify(db),
		//eslint-disable-next-line
		function (err) {
			//eslint-disable-next-line
			if (err) return console.error(err);
		});
	response.json(responseArray);				//Alternativ das responseArray
});

//send size ob meetings.json object to client:
server.get("/returnArraySize", (request, response) => {
	let arraySize = Object.keys(db.meetings).length;
	response.send("" + arraySize);	//WTF, express can't send numbers -.-
});
