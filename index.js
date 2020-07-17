"use strict";
var workerInlinify = require("worker-inlinify");
var inlinify = function (compilation, chunks) {
    workerInlinify._webpackAssets = compilation.assets;
    var _loop_1 = function (name) {
        if (name.toLowerCase().endsWith('.js') && shouldInlinify(name)) {
            var source_1 = workerInlinify.inlinify(compilation.assets[name].source());
            if (source_1 !== compilation.assets[name].source()) {
                compilation.assets[name] = {
                    source: function () {
                        return source_1;
                    },
                    size: function () {
                        return source_1.length;
                    }
                };
            }
        }
    };
    for (var name in compilation.assets) {
        _loop_1(name);
    }
    function shouldInlinify(assetName) {
        for (var i = 0; i < compilation.chunks.length; i++) {
            for (var j = 0; j < compilation.chunks[i].files.length; j++) {
                if (compilation.chunks[i].files[j] === assetName) {
                    return chunks.indexOf(compilation.chunks[i].id) > -1 || chunks.indexOf(compilation.chunks[i].name) > -1;
                }
            }
        }
        return false;
    }
};
var WorkerInlinifyWebpackPlugin = /** @class */ (function () {
    function WorkerInlinifyWebpackPlugin(options) {
        this.chunks = [];
        if (options && 'chunks' in options) {
            this.chunks = options.chunks;
        }
    }
    WorkerInlinifyWebpackPlugin.prototype.apply = function (compiler) {
        var chunks = this.chunks;
        var hooks = compiler.hooks;
        var emit = function (compilation, callback) {
            inlinify.call(this, compilation, chunks);
            callback();
        };
        if (hooks) {
            // for new version of webpack
            hooks.emit.tapAsync('worker-inlinify-webpack-plugin', emit);
        }
        else {
            // for old version of webpack, use legacy plugin method to hook event
            compiler.plugin("emit", emit);
        }
    };
    return WorkerInlinifyWebpackPlugin;
}());
module.exports = WorkerInlinifyWebpackPlugin;
