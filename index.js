"use strict";
var workerInlinify = require("worker-inlinify");
var WorkerInlinifyWebpackPlugin = /** @class */ (function () {
    function WorkerInlinifyWebpackPlugin() {
    }
    WorkerInlinifyWebpackPlugin.prototype.apply = function (compiler) {
        compiler.plugin('emit', function (compilation, callback) {
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
            callback();
        });
    };
    return WorkerInlinifyWebpackPlugin;
}());
module.exports = WorkerInlinifyWebpackPlugin;
