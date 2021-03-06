const express = require("express");
let server = express();
var db = require("./meetings.json");
var bodyParser = require("body-parser");
const fs = require("fs");

// argv[0] = node
// argv[1] = express.js
// argv[2] = 1. argument... //in diesem fall der Port, usw
let port = process.argv[2];

const BASE_URI = "http://localhost:${port}";
server.use(bodyParser.json());
//use everything that is in client folder
server.use(express.static("../client"));
//if port is set in call, then listen on this port, else listen per default on port 8080
if (port) {
	server.listen(port, () => console.log("listening on port " + port));
}
else {
	server.listen(8080, () => console.log("listening on port 8080"));
}

//define URLs that are callable:
server.get("", (req, res) => {
	res.send({
		__links: {
			returnArraySize: { href: BASE_URI + "/returnArraySize" },
		}
	});
	res.json({
		__links: {
			returnRange: { href: BASE_URI + "/returnRange" },
		}
	});
});

server.post("", (req, res) => {
	res.json({
		__links: {
			addNewMeeting: { href: BASE_URI + "/addNewMeeting" },
		}
	});
});

server.put("", (req, res) => {
	res.json({
		__links: {
			editMeeting: { href: BASE_URI + "/editMeeting" },
		}
	});
});

server.delete("", (req, res) => {
	res.json({
		__links: {
			deleteMeeting: { href: BASE_URI + "/deleteMeeting" },
		}
	});
});

//delete an object from database
server.delete("/deleteMeeting", (request, response) => {
	let id = parseInt(request.query.id);
	let start = 0;
	let end = parseInt(request.query.end);
	//check if end is greater than the actual dbSize.
	if (end > Object.keys(db.meetings).length - 1) {
		//sets equal for getting rid of memory flood by http://localhost:8080/returnRange?start=0&end=999999999
		end = Object.keys(db.meetings).length - 1;
	}
	//same here for start variable
	if (start > Object.keys(db.meetings).length - 1) {
		start = Object.keys(db.meetings).length - 1;
	}
	//checks if there is actuallly an object to delete. If not, send 404
	if (start === end) {
		response.sendStatus(404);
		return;
	}
	//iterate through whole db and find object with appropriate id
	for (let i = 0; i < db.meetings.length; i++) {
		if (parseInt(db.meetings[i].id) === id) {
			//splice by 1 (delete) the meeting on index i
			db.meetings.splice(i, 1);
			makePersistent();
			var responseArray = [];
			for (let index = start; index < end; index++) {
				responseArray.push(db.meetings[index]);
			}
			response.json(responseArray);
			return;
		}
	}
	//in case the return statement is not reached, send 404
	response.sendStatus(404);
});

server.put("/editMeeting", (request, response) => {
	//getting attributes for the new created object
	let id = parseInt(request.query.id);
	let name = request.query.name;
	let date = request.query.date;
	let coordinates = [];
	//parseFloat doesn't work on coordinates -> separating
	coordinates[0] = parseFloat(request.query.coordinates.split(",")[0]);
	coordinates[1] = parseFloat(request.query.coordinates.split(",")[1]);
	let location = request.query.location;
	//same here as for coordinates
	let objects = request.query.objects.split(",");
	//creates objectToAdd
	let objectToAdd = {
		id: id,
		name: name,
		date: date,
		location: location,
		coordinates: coordinates,
		objects: objects
	};
	//overwrites old meeting with the just created one
	for (let i = 0; i < db.meetings.length; i++) {
		if (parseInt(db.meetings[i].id) === id) {
			db.meetings[i] = objectToAdd;
		}
	}
	makePersistent();
	response.json(objectToAdd);
});

function makePersistent() {
	//overwrites the existing db with the edited one to be persistent on server side
	fs.writeFile("./meetings.json", JSON.stringify(db), (err) => {
		if (err) {
			console.log("The file hasn't been saved!");
			throw err;
		}
	});
}

server.post("/addNewMeeting", (request, response) => {
	//always add a new meeting to the end of the JSON data with the consecutive id
	let id = parseInt(db.meetings[db.meetings.length - 1].id + 1);
	let name = request.query.name;
	let date = request.query.date;
	let coordinates = [];
	coordinates[0] = parseFloat(request.query.coordinates.split(",")[0]);
	coordinates[1] = parseFloat(request.query.coordinates.split(",")[1]);
	let location = request.query.location;
	let objects = request.query.objects.split(",");

	//create objectToAdd
	let objectToAdd = {
		id: id,
		name: name,
		date: date,
		location: location,
		coordinates: coordinates,
		objects: objects
	};
	db.meetings[db.meetings.length] = objectToAdd;
	makePersistent();
	//sends the new size of the JSON Data back to the server for furter calculations
	response.send("" + (db.meetings.length));
});

server.get("/returnRange", (request, response) => {
	let start = parseInt(request.query.start);
	let end = parseInt(request.query.end);
	// //memory flood coverage
	if (end > Object.keys(db.meetings).length - 1) {
		end = Object.keys(db.meetings).length - 1;
	}
	//if start value is already greater than the actual JSON data size, return and do nothing
	if (start > Object.keys(db.meetings).length - 1) {
		return;
	}
	//pretty much the same as it is in edit
	var responseArray = [];
	for (let i = start; i <= end; i++) {
		responseArray.push(db.meetings[i]);
	}
	makePersistent();
	response.json(responseArray);
});

//send size ob meetings.json object to client:
server.get("/returnArraySize", (request, response) => {
	let arraySize = db.meetings.length;
	response.send("" + arraySize);
});
