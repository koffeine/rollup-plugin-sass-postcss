import sass from 'sass';

export default (id: string, outId: string, code: string, sourcemap: boolean): { code: string, map?: string, dependencies: string[] } => {
	const { css, map, stats } = sass.renderSync({
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
		map: map && map.toString(),
		dependencies: stats.includedFiles.filter((includedFile) => includedFile !== id)
	};
};
