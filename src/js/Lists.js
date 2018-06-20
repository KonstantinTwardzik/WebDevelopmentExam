class Lists {
	constructor() {
		// Standardkonstruktor
	}

	calculateListSize() {
		let windowHeight = window.innerHeight;
		let listSize = (windowHeight - 126) / 51;
		return listSize - 1;
	}

	clearLists() {
		let list = document.getElementById("leftList");
		let length = list.childElementCount;
		for (let index = 0; index < length; ++index) {
			let listElement = document.getElementById("" + index);
			list.removeChild(listElement);
		}

		let detailObjectList = document.getElementById("rightList");
		let detailLength = detailObjectList.childElementCount;
		for (let index = 0; index < detailLength; ++index) {
			let detailListElement = document.getElementById("rightListElement" + (index + 1));
			detailObjectList.removeChild(detailListElement);
		}
	}

	fillLeftList(list, data) {
		let maxSize = this.calculateListSize();
		let dataSize = data.length;
		let size = Math.min(maxSize, dataSize);
		for (let index = 1; index <= size; index++) {
			let meeting = data[index - 1];
			let listElement = document.createElement("li");
			let title = document.createElement("p");

			listElement.id = meeting.getId();
			title.id = meeting.getId();
			title.innerHTML = meeting.getName();
			listElement.appendChild(title);
			list.appendChild(listElement);
		}
	}

	fillRightList(list, object) {
		let maxSize = this.calculateListSize();
		let listSize = object.getObjects().length;
		let size = Math.min(maxSize, listSize);
		for (let index = 1; index <= size; index++) {
			let detailListElement = document.createElement("li");
			let detailObject = document.createElement("p");

			detailObject.innerHTML += object.getObjects()[index - 1];
			detailListElement.id = "rightListElement" + index;

			detailListElement.appendChild(detailObject);
			list.appendChild(detailListElement);
		}
	}
}

module.exports.Lists = Lists;
