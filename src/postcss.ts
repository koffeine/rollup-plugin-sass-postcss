import postcss from 'postcss';

import type { AcceptedPlugin } from 'postcss';
import type { RawSourceMap } from 'source-map';

export default (id: string, outId: string, code: string, sourcemap: string | undefined, plugins: AcceptedPlugin[]): Promise<{ code: string, map?: RawSourceMap }> =>
	postcss(plugins)
		.process(
			code,
			{
				from: id,
				to: outId,
				map: sourcemap ? { prev: sourcemap } : false
			}
		)
		.then(({ css, map }) => ({
			code: css,
			map: map && map.toJSON()
		}));
