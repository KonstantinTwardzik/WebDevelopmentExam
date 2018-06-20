const express = require("express");
let server = express();
var path = require("path");
var db = require("./meetings.json");

let port = process.argv[2];
// argv[0] = node
// argv[1] = express.js
// argv[0] = 1. argument...

var myLogger = function (req, res, next) {
	console.log(Date.now());
	next();
};

server.use(express.static(__dirname + "/public"));

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
	server.listen(port, () => console.log("listening on port " + port));
}
else {
	server.listen(8080, () => console.log("listening on port 8080"));
}
//DIE MÜSSEN GESETZT WERDEN
var start;
var end;
server.get("/:start:end", (request, response) => {
	start = request.query.start;
	end = request.query.end;
	for (let index = start; index < end; index++) {
		console.log(index);
	}
});
start = 1;
end = 7;
//HIER MUSS DAS ZU HANDELNDE ZEUGS REIN
for (let index = start; index <= end; index++) {	//For loop läuft von start bis end
	console.log(db.meetings[index]);				//und gibt diese in der console aus
	//TESTING AREA:
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
}

console.log("Größe des Arrays: " + Object.keys(db.meetings).length);

//TODO:Make sure to kill the connection if someone tries to flood your RAM!
