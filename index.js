#!/usr/bin/env node

const { DateTime } = require('luxon');

const Analysis = require('./src/analysis');
const Report = require('./src/report');

async function analyze(url) {
	const analysis = new Analysis(url);
	analysis.start = DateTime.utc();
	await analysis.run();

	const report = new Report(analysis);
	if (analysis.end) {
		console.log(analysis);
		const report = new Report(analysis);
		return report.report();
	}
}

module.exports = analyze;
