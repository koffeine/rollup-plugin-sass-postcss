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
			files: '*.ts',
			plugins: [ '@typescript-eslint' ],
			parser: '@typescript-eslint/parser',
			rules: {
				'@typescript-eslint/explicit-function-return-type': [ 'error', { allowExpressions: true, allowTypedFunctionExpressions: true, allowHigherOrderFunctions: true, allowDirectConstAssertionInArrowFunctions: false, allowConciseArrowFunctionExpressionsStartingWithVoid: false } ],

				'no-duplicate-imports': 'off', '@typescript-eslint/no-duplicate-imports': [ 'error', { includeExports: true } ],
				'no-unused-vars': 'off', '@typescript-eslint/no-unused-vars': [ 'error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false, caughtErrors: 'all' } ]
			}
		},
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
