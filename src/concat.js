import Concat from 'concat-with-sourcemaps';

export default (sourcemap, outputBasename, styles) => {
	const concat = new Concat(sourcemap, outputBasename, '');

	styles.forEach(({ id, code, map }) => concat.add(id, code, map));

	return {
		code: concat.content.toString(),
		map: concat.sourceMap
	};
};
