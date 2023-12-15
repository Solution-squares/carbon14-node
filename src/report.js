const { readableDate } = require('./util');
class Report {
	constructor(analysis) {
		this.analysis = analysis;
	}

	reportSection() {
		console.log('\n# Published Date\n');

		const { datePublished } = this.analysis.jsonContent || {};

		if (datePublished) {
			return new Date(datePublished);
		} else {
			console.error('No datePublished key found in the JSON content.');
			return null;
		}
	}

	report() {
		const datePublished = this.reportSection();
		return datePublished;
	}
}
module.exports = Report;
