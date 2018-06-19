class Lists {
	constructor() {
		console.log("Lists initialized");
	}

	calculateListSize() {
		let windowHeight = window.innerHeight;
		let logoHeight = document.getElementById("logo").offsetHeight;
		let NavBarHeight = document.getElementById("menubar").offsetHeight;
		let listSize = (windowHeight - (logoHeight + NavBarHeight)) / 51;
		return listSize - 1;
	}

	calculateDetailListSize() {
		let windowHeight = window.innerHeight;
		let listSize = (windowHeight - 130) / 51;
		return listSize - 1;
	}

	fillList(list, size, mockData) {
		for (let index = 1; index <= size; index++) {
			let meeting = mockData[index - 1];
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
			detailListElement.id = "detailListElement" + index;

			if (index % 2 <= 0) {
				detailListElement.className = ("even");
			}
			else {
				detailListElement.className = ("uneven");
			}

			detailListElement.appendChild(detailObject);
			list.appendChild(detailListElement);
		}
	}

	clearLists() {
		let list = document.getElementById("list");
		let length = list.childElementCount;
		for (let index = 0; index < length; ++index) {
			let listElement = document.getElementById("listElement" + (index + 1));
			list.removeChild(listElement);
		}

		let detailObjectList = document.getElementById("detailObjectList");
		let detailLength = detailObjectList.childElementCount;
		for (let index = 0; index < detailLength; ++index) {
			let detailListElement = document.getElementById("detailListElement" + (index + 1));
			detailObjectList.removeChild(detailListElement);
		}
	}
}

module.exports.Lists = Lists;
