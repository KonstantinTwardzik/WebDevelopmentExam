class Lists {
	constructor() {
		this.leftRealOffset = 0;
		this.rightRealOffset = 0;
		this.currentPageSize = 0;
	}

	getCurrentPageSize() {
		this.calculateListSize();
		return this.currentPageSize;
	}

	// sets regular page listsize
	calculateListSize() {
		let windowHeight = window.innerHeight;
		let listSize = (windowHeight - 126) / 51;
		this.currentPageSize = Math.ceil(listSize - 2);
	}

	clearLists() {
		let list = document.getElementById("leftList");
		let length = list.childElementCount;

		for (let index = 0; index < length; ++index) {
			let listElement = document.getElementById("" + (index + this.leftRealOffset));
			list.removeChild(listElement);
		}

		let detailObjectList = document.getElementById("rightList");
		let detailLength = detailObjectList.childElementCount;
		for (let index = 0; index < detailLength; ++index) {
			let detailListElement = document.getElementById("rightListElement" + (index + this.rightRealOffset));
			detailObjectList.removeChild(detailListElement);
		}

		// calculates new listsize
		this.calculateListSize();
	}

	fillLeftList(list, offset, data) {
		// calculates the offset of the page
		this.leftRealOffset = ((offset - 1) * this.currentPageSize);
		let currentLeftPageSize = this.currentPageSize;

		// sets last page listsize
		if ((offset * this.currentPageSize) >= data.length) {
			currentLeftPageSize = data.length - (((offset - 1) * this.currentPageSize));
		}

		// fills left list
		for (let index = 1; index <= currentLeftPageSize; index++) {
			let meeting = data[(index - 1) + this.leftRealOffset];
			let listElement = document.createElement("li");
			let title = document.createElement("p");

			listElement.id = meeting.getId();
			title.id = meeting.getId();
			title.innerHTML = meeting.getName();
			listElement.appendChild(title);
			list.appendChild(listElement);
		}
	}

	fillRightList(list, offset, object) {
		//calculates the offset of the page
		this.rightRealOffset = ((offset - 1) * this.currentPageSize);
		let currentRightPageSize = this.currentPageSize;

		// sets last page listsize
		if ((offset * this.currentPageSize) >= object.getObjects().length) {
			currentRightPageSize = object.getObjects().length - (((offset - 1) * this.currentPageSize));
		}

		for (let index = 1; index <= currentRightPageSize; index++) {
			let detailListElement = document.createElement("li");
			let detailObject = document.createElement("p");

			detailObject.innerHTML += object.getObjects()[(index - 1) + this.rightRealOffset];
			detailListElement.id = "rightListElement" + ((index - 1) + this.rightRealOffset);

			detailListElement.appendChild(detailObject);
			list.appendChild(detailListElement);
		}
	}
}

module.exports.Lists = Lists;
