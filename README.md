# rollup-plugin-sass-postcss

[![npm version](https://img.shields.io/npm/v/rollup-plugin-sass-postcss.svg)](https://www.npmjs.com/package/rollup-plugin-sass-postcss)
[![dependency Status](https://david-dm.org/koffeine/rollup-plugin-sass-postcss/status.svg)](https://david-dm.org/koffeine/rollup-plugin-sass-postcss)
[![devDependency Status](https://david-dm.org/koffeine/rollup-plugin-sass-postcss/dev-status.svg)](https://david-dm.org/koffeine/rollup-plugin-sass-postcss?type=dev)

Rollup plugin for Sass and PostCSS

## What it does

- Compiles imported Sass files and transforms those using PostCSS plugins
- Concatenates and extracts processed styles

## Features

- Uses the sass package
- Watches for changes in all Sass files loaded during compilation
- Sourcemap support
	- Only generates and saves sourcemap when requested by the configuration
	- Generates correct sourcemap file that traces back to the original imported file
	- Makes sources relative to cwd

## Usage

```js
import sassPostcss from 'rollup-plugin-sass-postcss';

export default {
	// ...
	plugins: [
		sassPostcss({
			// which files should be processed by this plugin
			// type: regular expression, minimatch pattern or an array of regular expressions and minimatch patterns
			include: [ /\.sass/u, /\.scss/u ],

			// which files should not be processed by this plugin
			// type: regular expression, minimatch pattern or an array of regular expressions and minimatch patterns
			exclude: undefined,

			// whether or not to generate and save a sourcemap
			// type: boolean
			sourcemap: false,

			// which PostCSS plugins to use
			// type: array of PostCSS plugins
			plugins: [],

			// where to save the output file (required)
			// type: string
			output: undefined,

			// whether to handle compilation failure as error (true) or as warning (false)
			// type: boolean
			throwOnError: !process.env.ROLLUP_WATCH
		})
	]
	// ...
};
```

## License

Copyright © Kornél Horváth

Licensed under the [MIT License](https://raw.githubusercontent.com/koffeine/rollup-plugin-sass-postcss/master/LICENSE).