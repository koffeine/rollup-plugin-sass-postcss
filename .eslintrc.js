'use strict';

module.exports = {
	root: true,
	extends: '@koffeine',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'script'
	},
	env: {
		es2021: true,
		node: true
	},
	overrides: [
		{
			files: 'test/**/*',
			env: {
				mocha: true
			}
		}
	]
};
