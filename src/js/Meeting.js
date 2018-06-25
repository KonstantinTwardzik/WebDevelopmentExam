class Meeting {
	constructor(id, name, date, location, coordinates, objects) {
		this.id = id;
		this.name = name;
		this.date = date;
		this.location = location;
		this.coordinates = coordinates;
		this.objects = objects;
	}

	getId() {
		return this.id;
	}

	getCoordinates() {
		return this.coordinates;
	}

	getName() {
		return this.name;
	}

	setName(name) {
		this.name = name;
	}

	getDate() {
		return this.date;
	}

	setDate(date) {
		this.date = date;
	}

	getLocation() {
		return this.location;
	}

	setLocation(location) {
		this.location = location;
	}

	getObjects() {
		return this.objects;
	}

	setObjects(objects) {
		this.objects = objects;
	}

	addObject(object) {
		this.objects.push(object);
	}

	removeObject(object) {
		const index = this.objects.indexOf(object);
		this.objects.splice(index, 1);
	}

	toString() {
		return "(" + this.date + ", " + this.location + ", " + this.objects + ")";
	}
}

module.exports.Meeting = Meeting;
