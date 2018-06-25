function asyncA() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			let result = Math.random();
			if (result < 0.2) {
				reject("Result is too low.");
			}
			else {
				resolve(result);
			}
		}, 100);
	});
}

asyncA().then(value => {
	console.log(value);
}).catch(reason => {
	console.error(reason);
});
