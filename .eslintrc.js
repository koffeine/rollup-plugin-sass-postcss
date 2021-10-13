'use strict';

module.exports = {
	root: true,
	extends: '@koffeine',
	parserOptions: {
		ecmaVersion: 2021, // 12
		sourceType: 'script'
	},
	env: {
		es2021: true,
		node: true
	}
};
