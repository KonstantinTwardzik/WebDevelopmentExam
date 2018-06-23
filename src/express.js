const express = require("express");
let server = express();
var path = require("path");
var db = require("./meetings.json");
var bodyParser = require("body-parser");

let port = process.argv[2];
// argv[0] = node
// argv[1] = express.js
// argv[0] = 1. argument... //in diesem fall der Port

const BASE_URI = "http://localhost:${port}";
server.use(bodyParser.json());

var myLogger = function (req, res, next) {	//wird immer getriggert, wenn eine getanfrage kommt
	console.log(Date.now());				//atm noch datum
	next();									//damit nicht hiernach abgebrochen wird
};

server.use(express.static(__dirname + "/public"));	//nutze alles, was im ordern /public liegt

server.use(myLogger);		//wird immer getriggert, wenn eine getanfrage kommt

server.get("/json", (request, response) => {
	console.log("Hello World!");
	response.json({
		message: "Hello, World!",
		success: true
	});
});

server.get("/XXX", (request, response) => {
	response.sendStatus(404);
});

server.get("/a", (req, res) => {
	res.send("Hello World!");
});

if (port) {
	server.listen(port, () => console.log("listening on port " + port));	//falls ein port als argument mit angegeben wurde, gib dies aus
}
else {
	server.listen(8080, () => console.log("listening on port 8080"));		//anderenfalls lausche auf port 8080
}
//DIE MÜSSEN GESETZT WERDEN
var start;
var end;

start = 6;
end = 7;
//HIER MUSS DAS ZU HANDELNDE ZEUGS REIN
server.get("", (req, res) =>{
	res.send("Hello World!");
	res.json({
		__links: {
			self: { href: "${BASE_URI}" },
			customers: { href: "${BASE_URI}/returnRange" },			//definiert die URL, die angesprochen werden kann "localhost:8080/returnRange"
		}
	});
});

server.get("/returnRange", (request, response) => {
	let start = request.query.start;			//nimmt sich den wert der id "start" in der url
	let end = request.query.end;				//nimmt sich den wert der id "end" in der url
	if (end > Object.keys(db.meetings).length - 1) {	//checkt, ob der end-wert die tatsächliche Größe des Arrays nicht pbersteigt
		end = Object.keys(db.meetings).length - 1;		//wenn doch,: gleichsetzen
	}
	console.log("Start: " + start + " / Ende: " + end);	//Control log
	//
	var responseArray = [];						//neues leeres Array erstellen, das letztendlich an den client zurückgegeben wird
	let controlString = "";						//neuen leeren ControlString definieren
	for (let index = start; index <= end; index++) {	//For loop läuft von start bis end
		// console.log(db.meetings[index]);				//und gibt diese in der console aus
		responseArray.push(db.meetings[index]);			//füllt das responseArray mit den entsprechenden meetings.json's
		// console.log("Größe des Arrays: " + Object.keys(db.meetings).length);	//gibt die Größe des Arrays aus
	}
	response.json(responseArray);				//Als response wird das responseArray gewählt
	for (let index = 0; index < responseArray.length; index++) {	// controlloop, der über das gesamte responseArray läuft
		controlString += "id: " + responseArray[index].id + " ";	// und die ids an den controlString hängt
	}
	console.log("sent: " + controlString + "of a total of " + Object.keys(db.meetings).length + " ids");	//control log
	// response.send();
	// console.log(someData);
	// response.json({
	// 	message: "Hello, World!",
	// 	success: true
	// });
});

// for (let index = start; index <= end; index++) {	//For loop läuft von start bis end
// 	console.log(db.meetings[index]);				//und gibt diese in der console aus
// 	console.log("Größe des Arrays: " + Object.keys(db.meetings).length);	//gibt die Größe des Arrays aus
// 	//TESTING AREA:
// }

//TODO:Make sure to kill the connection if someone tries to flood your RAM!
