import { FilterPattern } from '@rollup/pluginutils';
import { AcceptedPlugin } from 'postcss';
import { Plugin } from 'rollup';

/**
 * Rollup plugin for Sass and PostCSS
 */
declare const sassPostcss: (options: {

	/**
	 * Which files should be processed by this plugin
	 *
	 * @default [ /\.sass/u, /\.scss/u ]
	 */
	include?: FilterPattern,

	/**
	 * Which files should not be processed by this plugin
	 */
	exclude?: FilterPattern,

	/**
	 * Whether or not to generate and save a sourcemap
	 *
	 * @default false
	 */
	sourcemap: boolean,

	/**
	 * Which PostCSS plugins to use
	 *
	 * @default []
	 */
	plugins?: AcceptedPlugin[],

	/**
	 * Where to save the output file which is a Rollup asset relative to output.dir (required)
	 */
	output: string

}) => Plugin;

export = sassPostcss;
