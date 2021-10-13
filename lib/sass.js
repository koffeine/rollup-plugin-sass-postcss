'use strict';

const { renderSync } = require('sass');

module.exports = (id, outId, code, sourcemap) => {
	const { css, map, stats } = renderSync({
		file: id,
		data: code,
		indentedSyntax: /\.sass$/u.test(id),
		outputStyle: 'compressed',

		sourceMap: sourcemap,
		outFile: outId,
		omitSourceMapUrl: true,
		sourceMapContents: true
	});

	return {
		code: css.toString(),
		map: map ? map.toString() : null,
		dependencies: stats.includedFiles.filter((includedFile) => includedFile !== id)
	};
};
