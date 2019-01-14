var includePaths = require('rollup-plugin-includepaths');

module.exports = {
	entry: './dist/index.js',
	sourceMap: true,
	format: 'umd',
	moduleName: 'AwayjsPlayer',
	external: [
		'@awayjs/core',
		'@awayjs/stage',
		'@awayjs/scene',
		'@awayjs/view',
		'@awayjs/renderer',
		'@awayjs/parsers'
	],
	globals: {
		'@awayjs/core': 'AwayjsCore',
		'@awayjs/stage': 'AwayjsStage',
		'@awayjs/scene': 'AwayjsScene',
		'@awayjs/view': 'AwayjsView',
		'@awayjs/renderer': 'AwayjsRenderer',
		'@awayjs/parsers': 'AwayjsRenderer'
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