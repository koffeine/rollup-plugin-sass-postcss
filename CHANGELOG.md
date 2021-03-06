# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [Unreleased]

### Added

- Added tests
- Added peerDependencies badge to README.md

### Changed

- Updated devDependencies
- Updated project files
- Code cleanup

### Removed

- Removed rollup as a devDependency


## [2.0.0] - 2020-10-07

### Changed

- Rollup
	- Replaced deprecated this.moduleIds with this.getModuleIds()
	- Replaced fs.writeFile() with this.emitFile() (this also means output is now relative to output.dir)
	- Required version changed to ^2.9.0 because of the changes above
	- Added to peerDependencies
	- Also added to devDependencies to remove install warning
- Sass
	- Required version changed to ^1.0.0
	- Moved to peerDependencies
- PostCSS
	- Required version changed to ^7.0.0 || ^8.0.0
	- Moved to peerDependencies
- @rollup/pluginutils
	- Updated to ^4.0.0
- concat-with-sourcemaps
	- Updated to ^1.1.0
- Updated devDependencies


## [1.0.11] - 2020-07-28

### Changed

- Renamed package to @koffeine/rollup-plugin-sass-postcss


## [1.0.10] - 2020-07-26

### Changed

- Updated @rollup/pluginutils to 3.1.0
- Updated postcss to 7.0.32
- Updated sass to 1.26.10
- Updated devDependencies

### Fixed

- Fixed compatibility with rollup ^2.0.0
- Fixed watch mode issue by always treating compilation failure as error (throwOnError in no longer an option)


## [1.0.9] - 2020-01-14

### Changed

- Updated @rollup/pluginutils to 3.0.4


## [1.0.8] - 2020-01-10

### Changed

- Updated sass to 1.24.4
- Updated postcss to 7.0.26
- Changed rollup-pluginutils to @rollup/pluginutils
- Updated devDependencies


## [1.0.7] - 2019-12-09

### Changed

- Updated postcss to 7.0.24
- Updated eslint to 6.7.1
- Updated eslint-config-koffeine to 14.0.0


## [1.0.6] - 2019-11-20

### Changed

- Updated sass to 1.23.7


## [1.0.5] - 2019-11-19

### Changed

- Updated postcss to 7.0.23


## [1.0.4] - 2019-11-18

### Changed

- Updated sass to 1.23.6


## [1.0.3] - 2019-11-04

### Changed

- Updated sass to 1.23.3


## [1.0.2] - 2019-10-28

### Changed

- Updated postcss to 7.0.21
- Updated eslint to 6.6.0
- Updated eslint-config-koffeine to 13.0.0

## [1.0.1] - 2019-10-25

### Changed

- Updated postcss to 7.0.20
- Updated sass to 1.23.1


## [1.0.0] - 2019-10-08

### Added

- Initial public release