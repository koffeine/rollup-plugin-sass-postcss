import { basename, dirname, extname, join, relative } from 'path';

import { createFilter } from '@rollup/pluginutils';

import sass from './sass';
import postcss from './postcss';
import concat from './concat';

import type { Plugin } from 'rollup';
import type { RawSourceMap } from 'source-map';
import type { AcceptedPlugin } from 'postcss';
import type { FilterPattern } from '@rollup/pluginutils';

export default ({
	include = [ /\.sass/u, /\.scss/u ],
	exclude,
	sourcemap = false,
	plugins = [],
	output
}: {
	include?: FilterPattern,
	exclude?: FilterPattern,
	sourcemap: boolean,
	sourcemapPathTransform: (source: string, id: string) => string,
	plugins?: AcceptedPlugin[],
	output: string
}): Plugin => {

	const filter = createFilter(include, exclude);

	const styles: { [id: string]: { code: string, map?: RawSourceMap } } = {};

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
