module.exports = (compiler, generator) => {
	let hotMiddleware;
	compiler.plugin('done', stats => {
		try { hotMiddleware = generator(); }
		catch (error) { console.error('Failed to generate hot middleware', error); }
	});
	return (req, res, next) => hotMiddleware(req, res, next);
};
