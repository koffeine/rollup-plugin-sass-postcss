'use strict';

const { basename, dirname, extname, join, relative } = require('path');

const { createFilter } = require('@rollup/pluginutils');

const sass = require('./lib/sass.js');
const postcss = require('./lib/postcss.js');
const concat = require('./lib/concat.js');

module.exports = ({
	include = [ /\.sass/u, /\.scss/u ],
	exclude,
	sourcemap = false,
	plugins = [],
	output
}) => {

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

						result.map.sources = result.map.sources.map((source) => join(base, source));
					}

					styles[id] = result;

					return '';
				});
		},

		generateBundle() {
			const ids = Array.from(this.getModuleIds()).filter((id) => id in styles);

			if (ids.length === 0) {
				return;
			}


			const outputBasename = basename(output);

			const { code, map } = concat(sourcemap, outputBasename, ids.map((id) => ({ id, ...styles[id] })));

			if (map) {
				this.emitFile({
					type: 'asset',
					fileName: output,
					source: `${code}\n/*# sourceMappingURL=${outputBasename}.map */`
				});
				this.emitFile({
					type: 'asset',
					fileName: `${output}.map`,
					source: map
				});
			} else {
				this.emitFile({
					type: 'asset',
					fileName: output,
					source: code
				});
			}
		}
	};
};
