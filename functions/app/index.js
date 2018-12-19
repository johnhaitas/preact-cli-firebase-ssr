const { createHandler } = require('./build/ssr-bundle'),
	{ template } = require('./build/template');

module.exports = {
	createHandler,
	template
};
