const express = require("express");
let server = express();
var path = require("path");
var db = require("./meetings.json");
var bodyParser = require("body-parser");

let port = process.argv[2];
// argv[0] = node
// argv[1] = express.js
// argv[0] = 1. argument... //in diesem fall der Port, usw

const BASE_URI = "http://localhost:${port}";
server.use(bodyParser.json());

var dateLogger = function (req, res, next) {	//wird immer getriggert, wenn eine getanfrage kommt
	console.log(Date.now());					//atm noch datum
	next();										//damit nicht hiernach abgebrochen wird
};

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
		}
	});
	res.json({
		__links: {
			self: { href: "${BASE_URI}" },
			returnRange: { href: "${BASE_URI}/returnRange" },			//definiert die URL, die angesprochen werden kann "localhost:8080/returnRange"
			addNewMeeting: { href: "${BASE_URI}/addNewMeeting" },		//TODO:
			addNewObjectToMeeting: { href: "${BASE_URI}/addNewObjectToMeeting" },	//TODO:
			removeMeeting: { href: "${BASE_URI}/removeMeeting" },	//TODO:
			editMeeting: { href: "${BASE_URI}/editMeeting" },
		}
	});
});

server.get("/editMeeting", (request, response) => {
	let id = Object.keys(db.meetings).length + 1;	//increasing
	let name = request.query.name;	//name of the meeting
	let date = request.query.date;	//YYYY-MM-DD
	let latitude = request.query.latitude;
	let longitude = request.query.longitude;
	let location = request.query.location;
	let objects = request.query.objects;

	let objectToEdit = {
		id: id,
		name: name,
		date: date,
		location: location,
		coordinates: {
			latitude, longitude
		},
		objects: []
	};
	for (let index = 0; index < objects.length; index++) {
		objectToEdit.objects.push = objects[index];
	}
	db[id] = objectToEdit;	//
});

server.get("/addNewMeeting", (request, response) => {
	//Attributes for the object:
	let id = request.query.id;	//increasing
	let name = request.query.name;	//name of the meeting
	let date = request.query.date;	//YYYY-MM-DD
	let latitude = request.query.latitude;
	let coordinates = request.query.coordinates;
	let longitude = request.query.longitude;
	let location = request.query.location;
	let objects = request.query.objects;

	let objectToAdd = {
		id: id,
		name: name,
		date: date,
		location: location,
		coordinates: {
			latitude, longitude
		},
		objects: objects
	};
	db.meetings[id] = objectToAdd;	//Y U WORK!?
});

server.get("/returnRange", (request, response) => {
	let start = request.query.start;			//nimmt sich den wert der id "start" in der url
	let end = request.query.end;				//nimmt sich den wert der id "end" in der url
	// if (end > Object.keys(db.meetings).length - 1) {	//checkt, ob der end-wert die tatsächliche Größe des Arrays nicht pbersteigt
	// 	end = Object.keys(db.meetings).length - 1;		//wenn doch,: gleichsetzen --> kein memory flood durch http://localhost:8080/returnRange?start=0&end=999999999
	// }
	var responseArray = [];						//neues leeres Array erstellen, das letztendlich an den client zurückgegeben wird
	let controlString = "";						//neuen leeren ControlString definieren
	for (let index = start; index <= end; index++) {	//For loop läuft von start bis end
		responseArray.push(db.meetings[index]);			//füllt das responseArray mit den entsprechenden meetings.json's
	}
	let responseString = JSON.stringify(responseArray);	//zum übnertragen wird das JSON Array in einen String umgewandelt, mit JSON.parse(string) kann es zurückgewandelt werden
	// response.send(responseString);				//Als response wird der responseString gewählt
	response.json(responseArray);				//Alternativ das responseArray
});
//send size ob meetings.json object to client:
server.get("/returnArraySize", (request, response) => {
	let arraySize = Object.keys(db.meetings).length;
	response.send("" + arraySize);	//WTF, express can't send numbers -.-
});
