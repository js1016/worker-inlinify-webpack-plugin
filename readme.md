worker-inlinify-webpack-plugin
==========
[![NPM version](https://img.shields.io/npm/v/worker-inlinify-webpack-plugin.svg?style=flat)](https://www.npmjs.com/package/worker-inlinify-webpack-plugin) [![NPM downloads](http://img.shields.io/npm/dm/worker-inlinify-webpack-plugin.svg?style=flat)](https://www.npmjs.com/package/worker-inlinify-webpack-plugin) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

worker-inlinify-webpack-plugin is the webpack plugin implementation of [worker-inlinify](https://github.com/js1016/worker-inlinify), which is used to transform separate web worker scripot references into inline script using syntax: `new Worker(window.URL.createObjectURL(new Blob(["/* Web Worker code here */"])))`.

## Installation
```bash
npm install --save-dev worker-inlinify-webpack-plugin
```

## Sample Usage

#### webpack.config.js:
```javascript
var path = require('path');
var WorkerInlinifyWebpackPlugin = require('worker-inlinify-webpack-plugin');

module.exports = {
    entry: {
        index: './app.js',
        worker: './worker.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new WorkerInlinifyWebpackPlugin()
    ],
    mode: 'development'
}
```

#### app.js:
```javascript
let worker = new Worker('worker.bundle.js');
```

#### worker.js:
```javascript
console.log('Hi from worker');
```

After running webpack build process, you will find that the content of `worker.bundle.js` is already inlinified in `app.bundle.js`.

#### app.bundle.js:

```javascript
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let worker = new Worker(window.URL.createObjectURL(new Blob([\"/******/ (function(modules) { // webpackBootstrap\\n/******/ \\t// The module cache\\n/******/ \\tvar installedModules = {};\\n/******/\\n/******/ \\t// The require function\\n/******/ \\tfunction __webpack_require__(moduleId) {\\n/******/\\n/******/ \\t\\t// Check if module is in cache\\n/******/ \\t\\tif(installedModules[moduleId]) {\\n/******/ \\t\\t\\treturn installedModules[moduleId].exports;\\n/******/ \\t\\t}\\n/******/ \\t\\t// Create a new module (and put it into the cache)\\n/******/ \\t\\tvar module = installedModules[moduleId] = {\\n/******/ \\t\\t\\ti: moduleId,\\n/******/ \\t\\t\\tl: false,\\n/******/ \\t\\t\\texports: {}\\n/******/ \\t\\t};\\n/******/\\n/******/ \\t\\t// Execute the module function\\n/******/ \\t\\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\\n/******/\\n/******/ \\t\\t// Flag the module as loaded\\n/******/ \\t\\tmodule.l = true;\\n/******/\\n/******/ \\t\\t// Return the exports of the module\\n/******/ \\t\\treturn module.exports;\\n/******/ \\t}\\n/******/\\n/******/\\n/******/ \\t// expose the modules object (__webpack_modules__)\\n/******/ \\t__webpack_require__.m = modules;\\n/******/\\n/******/ \\t// expose the module cache\\n/******/ \\t__webpack_require__.c = installedModules;\\n/******/\\n/******/ \\t// define getter function for harmony exports\\n/******/ \\t__webpack_require__.d = function(exports, name, getter) {\\n/******/ \\t\\tif(!__webpack_require__.o(exports, name)) {\\n/******/ \\t\\t\\tObject.defineProperty(exports, name, {\\n/******/ \\t\\t\\t\\tconfigurable: false,\\n/******/ \\t\\t\\t\\tenumerable: true,\\n/******/ \\t\\t\\t\\tget: getter\\n/******/ \\t\\t\\t});\\n/******/ \\t\\t}\\n/******/ \\t};\\n/******/\\n/******/ \\t// define __esModule on exports\\n/******/ \\t__webpack_require__.r = function(exports) {\\n/******/ \\t\\tObject.defineProperty(exports, \\\'__esModule\\\', { value: true });\\n/******/ \\t};\\n/******/\\n/******/ \\t// getDefaultExport function for compatibility with non-harmony modules\\n/******/ \\t__webpack_require__.n = function(module) {\\n/******/ \\t\\tvar getter = module && module.__esModule ?\\n/******/ \\t\\t\\tfunction getDefault() { return module[\\\'default\\\']; } :\\n/******/ \\t\\t\\tfunction getModuleExports() { return module; };\\n/******/ \\t\\t__webpack_require__.d(getter, \\\'a\\\', getter);\\n/******/ \\t\\treturn getter;\\n/******/ \\t};\\n/******/\\n/******/ \\t// Object.prototype.hasOwnProperty.call\\n/******/ \\t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\\n/******/\\n/******/ \\t// __webpack_public_path__\\n/******/ \\t__webpack_require__.p = \\\"\\\";\\n/******/\\n/******/\\n/******/ \\t// Load entry module and return exports\\n/******/ \\treturn __webpack_require__(__webpack_require__.s = \\\"./worker.js\\\");\\n/******/ })\\n/************************************************************************/\\n/******/ ({\\n\\n/***/ \\\"./worker.js\\\":\\n/*!*******************!*\\\\\\n  !*** ./worker.js ***!\\n  \\\\*******************/\\n/*! no static exports found */\\n/***/ (function(module, exports) {\\n\\neval(\\\"console.log(\\\'Hi from worker\\\');\\\\n\\\\n//# sourceURL=webpack:///./worker.js?\\\");\\n\\n/***/ })\\n\\n/******/ });\"])));\n\n//# sourceURL=webpack:///./app.js?");

/***/ })

/******/ });
```