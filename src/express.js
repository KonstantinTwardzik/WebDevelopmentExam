const express = require("express");
let server = express();
var path = require("path");
var db = require("./meetings.json");

let port = process.argv[2];

server.use(express.static(__dirname + "/public"));

server.get("/json", (request, response) => {
	response.json({
		message: "Hello, World!",
		success: true
	});
});

server.get("/XXX", (request, response) => {
	response.sendStatus(404);
});

if (port) {
	server.listen(port, () => console.log("listening on port " + port));
}
else {
	server.listen(8080, () => console.log("listening on port 8080"));
	console.log(db.meetings[0]);
}
//TODO:
//kommunikation zwischen frontend und backend
//mit Konsti die Methodennamen absprechen
//Wenn server beendet -> json datei aktualiseren
