import { assert } from 'chai';
import fs from 'fs';

import { rollup } from 'rollup';
import sassPostcss from '../dist/index.js';
import cssnano from 'cssnano';

const relative = (fileName) => new URL(fileName, import.meta.url).pathname;

const getAssetSource = (assets, name) => {
	const found = assets.find((asset) => asset.type === 'asset' && asset.fileName === name);

	return found && found.source;
};

describe('without sourcemap', () => {
	let bundle;
	let output;

	it('should work with Rollup & PostCSS', async () => {
		bundle = await rollup({
			input: relative('./input/index.js'),
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
		assert.include(bundle.watchFiles, relative('./input/index.sass'));
		assert.include(bundle.watchFiles, relative('./input/_h1.sass'));
	});

	it('should generate output', () => {
		const actual = getAssetSource(output, 'output.css');

		assert.isDefined(actual);
	});

	it('should generate expected output', () => {
		const actual = getAssetSource(output, 'output.css');
		const expected = fs.readFileSync(relative('./expected/without-sourcemap/output.css'), { encoding: 'utf-8' }).slice(0, -1);

		assert.strictEqual(actual, expected);
	});

	it('shouldn\'t generate sourcemap', () => {
		const actual = getAssetSource(output, 'output.css.map');

		assert.isUndefined(actual);
	});
});

describe('with sourcemap', () => {
	let output;

	it('should work with Rollup & PostCSS', async () => {
		const bundle = await rollup({
			input: relative('./input/index.js'),
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

		assert.isDefined(actual);
	});

	it('should generate expected output', () => {
		const actual = getAssetSource(output, 'output.css');
		const expected = fs.readFileSync(relative('./expected/with-sourcemap/output.css'), { encoding: 'utf-8' }).slice(0, -1);

		assert.strictEqual(actual, expected);
	});

	it('should generate sourcemap', () => {
		const actual = getAssetSource(output, 'output.css.map');

		assert.isDefined(actual);
	});

	it('should generate expected sourcemap', () => {
		const actual = getAssetSource(output, 'output.css.map');
		const expected = fs.readFileSync(relative('./expected/with-sourcemap/output.css.map'), { encoding: 'utf-8' }).slice(0, -1);

		assert.strictEqual(actual, expected);
	});
});
