'use strict';

const { assert } = require('chai');
const path = require('path');
const fs = require('fs');

const { rollup } = require('rollup');
const sassPostcss = require('../index.js');
const cssnano = require('cssnano');

const relative = (fileName) => path.join(__dirname, fileName);

const getAssetSource = (assets, name) => {
	const found = assets.find((asset) => asset.type === 'asset' && asset.fileName === name);

	return typeof found == 'undefined' ? null : found.source;
};

describe('without sourcemap', () => {
	let bundle;
	let output;

	it('should work with Rollup & PostCSS', async() => {
		bundle = await rollup({
			input: relative('input/index.js'),
			plugins: [
				sassPostcss({
					sourcemap: false,
					plugins: [
						cssnano({ preset: [ 'default', { discardComments: { removeAll: true } } ] })
					],
					output: 'output.css'
				})
			]
		});

		output = (await bundle.generate({})).output;
	});

	it('should watch for changes in all Sass files loaded during compilation', () => {
		assert.include(bundle.watchFiles, relative('input/index.sass'));
		assert.include(bundle.watchFiles, relative('input/_h1.sass'));
	});

	it('should generate output', () => {
		const actual = getAssetSource(output, 'output.css');

		assert.isNotNull(actual);
	});

	it('should generate expected output', () => {
		const actual = getAssetSource(output, 'output.css');
		const expected = fs.readFileSync(relative('expected/without-sourcemap/output.css'), { encoding: 'utf-8' }).slice(0, -1);

		assert.strictEqual(actual, expected);
	});

	it('shouldn\'t generate sourcemap', () => {
		const actual = getAssetSource(output, 'output.css.map');

		assert.isNull(actual);
	});
});

describe('with sourcemap', () => {
	let output;

	it('should work with Rollup & PostCSS', async() => {
		const bundle = await rollup({
			input: relative('input/index.js'),
			plugins: [
				sassPostcss({
					sourcemap: true,
					plugins: [
						cssnano({ preset: [ 'default', { discardComments: { removeAll: true } } ] })
					],
					output: 'output.css'
				})
			]
		});

		output = (await bundle.generate({})).output;
	});

	it('should generate output', () => {
		const actual = getAssetSource(output, 'output.css');

		assert.isNotNull(actual);
	});

	it('should generate expected output', () => {
		const actual = getAssetSource(output, 'output.css');
		const expected = fs.readFileSync(relative('expected/with-sourcemap/output.css'), { encoding: 'utf-8' }).slice(0, -1);

		assert.strictEqual(actual, expected);
	});

	it('should generate sourcemap', () => {
		const actual = getAssetSource(output, 'output.css.map');

		assert.isNotNull(actual);
	});

	it('should generate expected sourcemap', () => {
		const actual = getAssetSource(output, 'output.css.map');
		const expected = fs.readFileSync(relative('expected/with-sourcemap/output.css.map'), { encoding: 'utf-8' }).slice(0, -1);

		assert.strictEqual(actual, expected);
	});
});
