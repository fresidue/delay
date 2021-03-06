'use strict';

const createDelay = willResolve => (ms, value) => {
	let timeoutId;
	let settle;

	const delayPromise = new Promise((resolve, reject) => {
		settle = willResolve ? resolve : reject;
		timeoutId = setTimeout(() => {
			timeoutId = null;
			settle(value);
		}, ms);
	});

	delayPromise.clear = () => {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
			settle(value);
		}
	};

	delayPromise.hasSettled = () => !timeoutId;

	return delayPromise;
};

module.exports = createDelay(true);
module.exports.reject = createDelay(false);
