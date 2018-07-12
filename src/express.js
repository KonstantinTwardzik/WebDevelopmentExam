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
//use everything that is in public folder
server.use(express.static(__dirname + "/public"));
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

//delete a object from database
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
	//iterate through whole db
	for (let i = 0; i < db.meetings.length; i++) {
		//find that one meeting with the id to look for
		if (parseInt(db.meetings[i].id) === id) {
			//splice by 1 (delete) the meeting in index i
			db.meetings.splice(i, 1);
			makePersistent();
			//create empty array for returning to client
			var responseArray = [];
			//fill that array with all meetings from start to end
			for (let index = start; index < end; index++) {
				responseArray.push(db.meetings[index]);
			}
			//sends the new created array as string to the server
			response.json(responseArray);
			//and returns
			return;
		}
	}
	//in case the return statement is not reached, send a 404
	response.sendStatus(404);
});

server.put("/editMeeting", (request, response) => {
	//getting attributes for the new created object
	let id = parseInt(request.query.id);
	let name = request.query.name;
	let date = request.query.date;
	let coordinates = [];
	//must be split into two separate values for longitude and langitude, separated by a comma
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
	//adds object on the right index
	for (let i = 0; i < db.meetings.length; i++) {
		if (parseInt(db.meetings[i].id) === id) {
			db.meetings[i] = objectToAdd;
		}
	}
	makePersistent();
	//sends the addedObject to the client
	response.json(objectToAdd);
});

function makePersistent() {
	//writes into ./meetings.json the JSON.stringified value of db to make the db persistent
	fs.writeFile("./meetings.json", JSON.stringify(db), (err) => {
		if (err) {
			console.log("The file has been saved!");
			throw err;
		}
	});
}

server.post("/addNewMeeting", (request, response) => {
	//pretty much the same as if is in editMeeting
	//always add a new meeting to the end of the JSON data
	//getting the last items id in db.meetings and add 1 for the next one that will be added now
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
