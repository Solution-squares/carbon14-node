const axios = require('axios');
const cheerio = require('cheerio');
const { DateTime } = require('luxon');
const { URL } = require('url');
const Result = require('./report');

const { getValueByKey, warning, readableDate, log } = require('./util');
class Analysis {
	constructor(url, author) {
		this.url = url;
		this.author = author;
		this.images = [];
		this.jsonContent = '';
	}

	handleImage(address, requested) {
		if (address === null || requested.has(address)) {
			return;
		}

		requested.add(address);
		log(`Working on image ${address}`);

		const absolute = new URL(address, this.url).toString();

		axios
			.head(absolute)
			.then((response) => {
				const lastModified = response.headers['last-modified'];

				const parsed = DateTime.fromHTTP(lastModified, {
					zone: 'UTC',
				});
				const timestamp = parsed.setZone('UTC');
				const internal =
					new URL(this.url).hostname === new URL(absolute).hostname;

				this.images.push(new Result(timestamp, absolute, internal));
			})
			.catch((error) => {
				warning('Cannot fetch date for this image');
			});
	}

	async run() {
		log(`Fetching page ${this.url}`);
		try {
			const response = await axios.get(this.url);
			const $ = cheerio.load(response.data);

			// Extract page title
			this.title = $('title').text();
			const scriptTags = $('script[type="application/ld+json"]');

			if (scriptTags.length > 0) {
				for (let index = 0; index < scriptTags.length; index++) {
					const scriptContent = $(scriptTags[index]).html();
					try {
						const jsonContent = JSON.parse(scriptContent);
						if (jsonContent) {
							jsonContent.datePublished = getValueByKey(
								jsonContent,
								'datePublished'
							);
						}
						if (jsonContent.datePublished) {
							const parsed = DateTime.fromISO(
								jsonContent.datePublished,
								{
									zone: 'UTC',
								}
							);
							const timestamp = parsed.setZone('UTC');
							console.log(timestamp);
							this.jsonContent = { datePublished: timestamp };
							break;
						}
					} catch (error) {
						console.log(error);
					}
				}
			} else {
				console.error(
					'No script tags with type="application/ld+json" found in the HTML.'
				);
			}

			//Loop through all images
			const requested = new Set();
			$('img').each((index, element) => {
				const src = $(element).attr('src');
				if (src && !src.startsWith('data:')) {
					this.handleImage(src, requested);
				}
			});

			const ogImages = $('meta[property="og:image"]');
			ogImages.each((index, element) => {
				const content = $(element).attr('content');
				this.handleImage(content, requested);
			});

			this.images.sort((a, b) => a.timestamp - b.timestamp);
			this.end = DateTime.utc();
		} catch (error) {
			error('Error fetching page!');
		}
	}
}
module.exports = Analysis;
