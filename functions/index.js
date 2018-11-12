const functions = require('firebase-functions'),
	{ createHandler } = require('../build/ssr-build/ssr-bundle'),
	{ template } = require('./app/build'),
	handler = createHandler(template);
exports.app = functions.https.onRequest(handler);
