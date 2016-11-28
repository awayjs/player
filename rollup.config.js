var includePaths = require('rollup-plugin-includepaths');

module.exports = {
	entry: './dist/index.js',
	sourceMap: true,
	format: 'umd',
	moduleName: 'AwayjsPlayer',
	external: [
		'@awayjs/core',
		'@awayjs/scene',
		'@awayjs/stage',
		'@awayjs/renderer'
	],
	globals: {
		'@awayjs/core': 'AwayjsCore',
		'@awayjs/scene': 'AwayjsScene',
		'@awayjs/stage': 'AwayjsStage',
		'@awayjs/renderer': 'AwayjsRenderer'
	},
	targets: [
		{ dest: './bundle/awayjs-player.umd.js'}
	],
	plugins: [
		includePaths({
			include : {
				"tslib": "./node_modules/tslib/tslib.es6.js"
			}
		}) ]
};