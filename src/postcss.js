'use strict';

const postcss = require('postcss');

module.exports = (id, outId, code, sourcemap, plugins) =>
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
