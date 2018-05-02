class Meeting {
	constructor(name, date, location, objects) {
		this.name = name;
		this.date = date;
		this.location = location;
		this.objects = objects;
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
