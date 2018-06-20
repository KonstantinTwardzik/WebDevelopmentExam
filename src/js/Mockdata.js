var Meeting = require("./Meeting");

class Mockdata {
	constructor() {
		let meetingList;
		let meeting1 = new Meeting.Meeting("Trierer Clubtreffen April", "20.04.2018", "Trier", ["Komet1", "Komet2", "Asteroid2", "Komet1", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2"], 0, { lat: 52.521918, lng: 13.413215 });
		let meeting2 = new Meeting.Meeting("Sondertreffen", "26.06.2018", "Konz", ["Asteroid1", "Asteroid2"], 1, { lat: 49.749992, lng: 6.6371433 });
		let meeting3 = new Meeting.Meeting("Trierer Clubtreffen Oktober", "12.10.2018", "Konz", ["Komet2", "Komet3"], 2, { lat: 48.856614, lng: 2.3522219 });
		let meeting4 = new Meeting.Meeting("Sondertreffen", "18.11.2018", "Saarbrücken", ["Asteroid1", "Komet1", "Komet2"], 3, { lat: 49.749992, lng: 6.6371433 });
		let meeting5 = new Meeting.Meeting("Trierer Clubtreffen Dezember", "03.12.2018", "Trier", ["Komet1", "Asteroid2"], 4, { lat: 52.521918, lng: 13.413215 });
		let meeting6 = new Meeting.Meeting("Trierer Clubtreffen April", "20.04.2018", "Trier", ["Komet1", "Komet2", "Asteroid2", "Komet1", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2"], 5, { lat: 48.856614, lng: 2.3522219 });
		let meeting7 = new Meeting.Meeting("Sondertreffen", "26.06.2018", "Konz", ["Asteroid1", "Asteroid2"], 6, { lat: 48.856614, lng: 2.3522219 });
		let meeting8 = new Meeting.Meeting("Trierer Clubtreffen Oktober", "12.10.2018", "Konz", ["Komet2", "Komet3"], 7, { lat: 52.521918, lng: 13.413215 });
		let meeting9 = new Meeting.Meeting("Sondertreffen", "18.11.2018", "Saarbrücken", ["Asteroid1", "Komet1", "Komet2"], 8, { lat: 49.749992, lng: 6.6371433 });
		let meeting10 = new Meeting.Meeting("Trierer Clubtreffen Dezember", "03.12.2018", "Trier", ["Komet1", "Asteroid2"], 9, { lat: 52.521918, lng: 13.413215 });
		let meeting11 = new Meeting.Meeting("Trierer Clubtreffen April", "20.04.2018", "Trier", ["Komet1", "Komet2", "Asteroid2", "Komet1", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2"], 10, { lat: 6.6371433, lng: 49.749992 });
		let meeting12 = new Meeting.Meeting("Sondertreffen", "26.06.2018", "Konz", ["Asteroid1", "Asteroid2"], 11, { lat: 48.856614, lng: 2.3522219 });
		let meeting13 = new Meeting.Meeting("Trierer Clubtreffen Oktober", "12.10.2018", "Konz", ["Komet2", "Komet3"], 12, { lat: 49.749992, lng: 6.6371433 });
		let meeting14 = new Meeting.Meeting("Sondertreffen", "18.11.2018", "Saarbrücken", ["Asteroid1", "Komet1", "Komet2"], 13, { lat: 52.521918, lng: 13.413215 });
		let meeting15 = new Meeting.Meeting("Trierer Clubtreffen Dezember", "03.12.2018", "Trier", ["Komet1", "Asteroid2"], 14, { lat: 49.749992, lng: 6.6371433 });
		let meeting16 = new Meeting.Meeting("Trierer Clubtreffen April", "20.04.2018", "Trier", ["Komet1", "Komet2", "Asteroid2", "Komet1", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2"], 15, { lat: 52.521918, lng: 13.413215 });
		let meeting17 = new Meeting.Meeting("Sondertreffen", "26.06.2018", "Konz", ["Asteroid1", "Asteroid2"], 16, { lat: 49.749992, lng: 6.6371433 });
		let meeting18 = new Meeting.Meeting("Trierer Clubtreffen Oktober", "12.10.2018", "Konz", ["Komet2", "Komet3"], 17, { lat: 48.856614, lng: 2.3522219 });
		let meeting19 = new Meeting.Meeting("Sondertreffen", "18.11.2018", "Saarbrücken", ["Asteroid1", "Komet1", "Komet2"], 18, { lat: 49.749992, lng: 6.6371433 });
		let meeting20 = new Meeting.Meeting("Trierer Clubtreffen Dezember", "03.12.2018", "Trier", ["Komet1", "Asteroid2"], 19, { lat: 52.521918, lng: 13.413215 });
		let meeting21 = new Meeting.Meeting("Trierer Clubtreffen April", "20.04.2018", "Trier", ["Komet1", "Komet2", "Asteroid2", "Komet1", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2"], 20, { lat: 48.856614, lng: 2.3522219 });
		let meeting22 = new Meeting.Meeting("Sondertreffen", "26.06.2018", "Konz", ["Asteroid1", "Asteroid2"], 21, { lat: 48.856614, lng: 2.3522219 });
		let meeting23 = new Meeting.Meeting("Trierer Clubtreffen Oktober", "12.10.2018", "Konz", ["Komet2", "Komet3"], 22, { lat: 52.521918, lng: 13.413215 });
		let meeting24 = new Meeting.Meeting("Sondertreffen", "18.11.2018", "Saarbrücken", ["Asteroid1", "Komet1", "Komet2"], 23, { lat: 49.749992, lng: 6.6371433 });
		let meeting25 = new Meeting.Meeting("Trierer Clubtreffen Dezember", "03.12.2018", "Trier", ["Komet1", "Asteroid2"], 24, { lat: 52.521918, lng: 13.413215 });
		let meeting26 = new Meeting.Meeting("Trierer Clubtreffen April", "20.04.2018", "Trier", ["Komet1", "Komet2", "Asteroid2", "Komet1", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2", "Komet1", "Komet2", "Asteroid1", "Asteroid2"], 25, { lat: 6.6371433, lng: 49.749992 });
		let meeting27 = new Meeting.Meeting("Sondertreffen", "26.06.2018", "Konz", ["Asteroid1", "Asteroid2"], 26, { lat: 48.856614, lng: 2.3522219 });
		let meeting28 = new Meeting.Meeting("Trierer Clubtreffen Oktober", "12.10.2018", "Konz", ["Komet2", "Komet3"], 27, { lat: 49.749992, lng: 6.6371433 });
		let meeting29 = new Meeting.Meeting("Sondertreffen", "18.11.2018", "Saarbrücken", ["Asteroid1", "Komet1", "Komet2"], 28, { lat: 52.521918, lng: 13.413215 });
		let meeting30 = new Meeting.Meeting("Trierer Clubtreffen Dezember", "03.12.2018", "Trier", ["Komet1", "Asteroid2"], 29, { lat: 49.749992, lng: 6.6371433 });
		meetingList = [meeting1, meeting2, meeting3, meeting4, meeting5, meeting6, meeting7, meeting8, meeting9, meeting10, meeting11, meeting12, meeting13, meeting14, meeting15, meeting16, meeting17, meeting18, meeting19, meeting20, meeting21, meeting22, meeting23, meeting24, meeting25, meeting26, meeting27, meeting28, meeting29, meeting30];
		return meetingList;
	}
}

module.exports.Mockdata = Mockdata;
