'use strict';

module.exports = {
	root: true,
	extends: '@koffeine',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
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
		},
		{
			files: '*.cjs',
			parserOptions: {
				sourceType: 'script'
			}

		}
	]
};
