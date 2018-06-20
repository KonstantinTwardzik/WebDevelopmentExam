class Lists {
	constructor() {
		console.log("Lists initialized");
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
			let listElement = document.getElementById("listElement" + (index + 1));
			list.removeChild(listElement);
		}

		let detailObjectList = document.getElementById("rightList");
		let detailLength = detailObjectList.childElementCount;
		for (let index = 0; index < detailLength; ++index) {
			let detailListElement = document.getElementById("rightListElement" + (index + 1));
			detailObjectList.removeChild(detailListElement);
		}
	}

	fillList(list, size, data) {
		for (let index = 1; index <= size; index++) {
			let meeting = data[index - 1];
			let listElement = document.createElement("li");
			let title = document.createElement("p");

			listElement.id = "listElement" + index;
			title.innerHTML = meeting.getName();
			listElement.appendChild(title);
			list.appendChild(listElement);
		}
	}

	fillDetailList(list, size, object) {
		for (let index = 1; index <= size; index++) {
			let detailListElement = document.createElement("li");
			let detailObject = document.createElement("p");

			detailObject.innerHTML += object.getObjects()[index];
			detailListElement.id = "rightListElement" + index;

			detailListElement.appendChild(detailObject);
			list.appendChild(detailListElement);
		}
	}
}

module.exports.Lists = Lists;
