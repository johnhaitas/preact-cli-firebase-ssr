const { createHandler } = require('./build/ssr-bundle'),
	{ template } = require('./build/functions');

module.exports = {
	createHandler,
	template
};
