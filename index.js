'use strict';

const { basename, dirname, extname, join, relative } = require('path');
const { mkdirSync, writeFileSync } = require('fs');

const { createFilter } = require('@rollup/pluginutils');

const sass = require('./lib/sass.js');
const postcss = require('./lib/postcss.js');
const concat = require('./lib/concat.js');

module.exports = ({
	include = [ /\.sass/u, /\.scss/u ],
	exclude,
	sourcemap = false,
	plugins = [],
	output,
	throwOnError = !process.env.ROLLUP_WATCH // eslint-disable-line no-process-env
} = {}) => {

	const filter = createFilter(include, exclude);

	const styles = {};

	return {
		name: 'sass-postcss',

		transform(code, id) {
			if (!filter(id)) {
				return;
			}


			const outId = id.replace(extname(id), '.css');

			return Promise.resolve() // eslint-disable-line consistent-return
				.then(() => sass(id, outId, code, sourcemap))
				.then((result) => {
					result.dependencies.forEach(this.addWatchFile);

					return postcss(id, outId, result.code, result.map, plugins);
				})
				.then((result) => {
					if (result.map) {
						const base = relative(process.cwd(), dirname(id));

						result.map = JSON.parse(result.map);

						result.map.sources = result.map.sources.map((source) => join(base, source));
					}

					styles[id] = {
						code: result.code,
						map: result.map
					};

					return '';
				})
				.catch((e) => {
					if (throwOnError) {
						this.error(e);
					} else {
						this.warn(e);
					}

					return '';
				});
		},

		generateBundle(outputOptions, bundle) {
			const ids = [].concat(...Object.values(bundle).map(({ modules }) =>
				Object.keys(modules).filter((id) => id in styles)));

			if (ids.length === 0) {
				return;
			}


			const outputBasename = basename(output);

			const { code, map } = concat(sourcemap, outputBasename, ids.map((id) => ({ id, ...styles[id] })));

			mkdirSync(dirname(output), { recursive: true });

			if (map) {
				writeFileSync(output, `${code}\n/*# sourceMappingURL=${outputBasename}.map */`);
				writeFileSync(`${output}.map`, map);
			} else {
				writeFileSync(output, code);
			}
		}
	};
};