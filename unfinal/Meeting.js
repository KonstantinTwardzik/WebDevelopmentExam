class Meeting {
    constructor(date, location, objects) {
        this.date = date;
        this.location = location;
        this.objects = objects;
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
        return this.objects
    }

    setObjects(objects) {
        this.objects = objects;
    }

    addObject(object) {
        
    }

    removeObject(object) {

    }
    
    toString() {
        return '(' + this.date + ', ' + this.location + ', ' + this.objects + ')'
    }
}
