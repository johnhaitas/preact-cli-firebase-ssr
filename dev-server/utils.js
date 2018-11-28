const requireFromString = require('require-from-string');

const findCompilerNamed = (multiCompiler, name) =>
	multiCompiler.compilers.find(compiler => compiler.name === name);

const readOutputFileSync = (compiler, filename) =>
	compiler.outputFileSystem.readFileSync(`${compiler.outputPath}/${filename}`).toString('utf-8');

const requireOutputFileSync = (compiler, filename) =>
	requireFromString(readOutputFileSync(compiler, filename));

module.exports = {
	findCompilerNamed,
	readOutputFileSync,
	requireOutputFileSync
};
