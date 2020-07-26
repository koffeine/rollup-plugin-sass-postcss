'use strict';

module.exports = {
	root: true,
	extends: 'koffeine',
	parserOptions: {
		ecmaVersion: 2020, // 11
		sourceType: 'script'
	},
	env: {
		es2020: true,
		node: true
	}
};