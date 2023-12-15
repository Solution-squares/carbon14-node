module.exports = {
	log: function (message) {
		console.error('\x1b[2m%s\x1b[0m', message);
	},
	getValueByKey: function (jsonObj, key) {
		let result;
		const stack = [jsonObj];
		const visited = new Set();

		while (stack.length > 0) {
			const obj = stack.pop();

			for (const currentKey in obj) {
				if (currentKey === key) {
					result = obj[currentKey];
					return result;
				} else if (visited.has(obj[currentKey])) {
					continue;
				} else if (Array.isArray(obj[currentKey])) {
					for (const element of obj[currentKey]) {
						stack.push(element);
					}
				} else if (
					obj[currentKey] !== null &&
					typeof obj[currentKey] === 'object'
				) {
					stack.push(obj[currentKey]);
				}
			}

			visited.add(obj);
		}
	},
	readableDate: function (value) {
		return value ? value.toFormat('yyyy-MM-dd HH:mm:ss') : '';
	},
	warning: function (message) {
		console.error('\x1b[33m%s\x1b[0m', message);
	},
};
