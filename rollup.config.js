import nodeResolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';

import { builtinModules } from 'module';
import pkg from './package.json';

export default {
	external: [ ...builtinModules, ...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies) ],
	input: 'src/index.ts',
	plugins: [
		nodeResolve(),
		esbuild({
			tsconfig: false,
			target: 'esnext',
			sourceMap: false
		})
	],
	output: [
		{
			generatedCode: 'es2015',
			format: 'es',
			file: pkg.exports.import
		},
		{
			generatedCode: 'es2015',
			format: 'cjs',
			file: pkg.exports.require,
			exports: 'auto'
		}
	]
};
