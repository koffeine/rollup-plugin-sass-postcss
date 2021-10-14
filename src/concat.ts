import Concat from 'concat-with-sourcemaps';

import type { RawSourceMap } from 'source-map';

export default (sourcemap: boolean, outputBasename: string, styles: { id: string, code: string, map?: RawSourceMap }[]): { code: string, map?: string } => {
	const concat = new Concat(sourcemap, outputBasename, '');

	styles.forEach(({ id, code, map }) => concat.add(id, code, map));

	return {
		code: concat.content.toString(),
		map: concat.sourceMap
	};
};
