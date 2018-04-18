"use strict";
var workerInlinify = require("worker-inlinify");
var inlinify = function (compilation) {
    workerInlinify._webpackAssets = compilation.assets;
    var _loop_1 = function (name) {
        if (name.toLowerCase().endsWith('.js')) {
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
    debugger;
};
var WorkerInlinifyWebpackPlugin = /** @class */ (function () {
    function WorkerInlinifyWebpackPlugin() {
    }
    WorkerInlinifyWebpackPlugin.prototype.apply = function (compiler) {
        var hooks = compiler.hooks;
        var emit = function (compilation, callback) {
            inlinify.call(this, compilation);
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
