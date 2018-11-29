const requireFromString = require('require-from-string');

const findCompilerNamed = (multiCompiler, name) =>
	multiCompiler.compilers.find(compiler => compiler.name === name);

const readOutputFileSync = (compiler, filename) =>
	compiler.outputFileSystem.readFileSync(`${compiler.outputPath}/${filename}`).toString('utf-8');

const requireOutputFileSync = (compiler, filename) =>
	requireFromString(readOutputFileSync(compiler, filename));

const requestLogger = (req, res, next) => {
	const startTime = Date.now(),
		{ method, url } = req;
	res.on('finish', () => console.log(`${res.statusCode} ${method} ${url} ${Date.now() - startTime}ms`)); // eslint-disable-line no-console
	next();
};

module.exports = {
	findCompilerNamed,
	readOutputFileSync,
	requireOutputFileSync,
	requestLogger
};
