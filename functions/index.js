const functions = require('firebase-functions'),
	{ createHandler, template } = require('./app'),
	handler = createHandler(template);
exports.app = functions.https.onRequest(handler);
