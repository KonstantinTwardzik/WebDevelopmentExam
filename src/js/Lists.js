class Lists {
	constructor() {
		this.leftOffset = 0;
		this.rightOffset = 0;
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

	clearLeftList() {
		let leftList = document.getElementById("leftList");
		let length = leftList.childElementCount;
		let listElement;
		for (let index = 0; index < length; ++index) {
			listElement = document.getElementById(index + this.leftOffset);
			leftList.removeChild(listElement);
		}

		this.calculateListSize();
	}

	clearRightList() {
		let rightList = document.getElementById("rightList");
		let length = rightList.childElementCount;
		let listElement;

		for (let index = 0; index < length; ++index) {
			listElement = document.getElementById("r" + (index + this.rightOffset));
			rightList.removeChild(listElement);
		}

		this.calculateListSize();
	}

	fillLeftList(list, leftPageNumber, data) {
		// calculates the offset of the page
		this.leftOffset = ((leftPageNumber - 1) * this.currentPageSize);
		let currentLeftPageSize = this.currentPageSize;

		// sets last page listsize
		if ((leftPageNumber * this.currentPageSize) >= data.length) {
			currentLeftPageSize = data.length - (this.leftOffset);
		}

		// fills left list
		for (let index = 0; index < currentLeftPageSize; index++) {
			let meeting = data[index + this.leftOffset];
			let listElement = document.createElement("li");
			listElement.id = (index + this.leftOffset);
			listElement.innerHTML = meeting.getName();
			list.appendChild(listElement);
		}
	}

	fillRightList(list, rightPageNumber, object) {
		//calculates the offset of the page
		this.rightOffset = ((rightPageNumber - 1) * this.currentPageSize);
		let currentRightPageSize = this.currentPageSize;

		// sets last page listsize
		if ((rightPageNumber * this.currentPageSize) >= object.getObjects().length) {
			currentRightPageSize = object.getObjects().length - this.rightOffset;
		}

		// fills right list
		for (let index = 0; index < currentRightPageSize; index++) {
			let detailListElement = document.createElement("li");
			detailListElement.innerHTML += object.getObjects()[index + this.rightOffset];
			detailListElement.id = ("r" + (index + this.rightOffset));
			list.appendChild(detailListElement);
		}
	}

	fillPopupList(list) {
		for (let index = 0; index <= 99; index++) {
			let listElement = document.createElement("li");
			let detailObject = document.createElement("input");

			detailObject.innerHTML += "";
			detailObject.id = "popupListElement" + index;

			listElement.appendChild(detailObject);
			list.appendChild(listElement);
		}
	}
}

module.exports.Lists = Lists;
