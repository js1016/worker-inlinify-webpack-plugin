'use strict';
const { Compilation, sources } = require('webpack');

var workerInlinify = require('worker-inlinify');
var inlinify = function (compilation, chunks) {
    workerInlinify._webpackAssets = compilation.assets;
    for (let name in compilation.assets) {
        if (name.toLowerCase().endsWith('.js') && shouldInlinify(name)) {
            let source = workerInlinify.inlinify(
                compilation.assets[name].source()
            );
            if (source !== compilation.assets[name].source()) {
                compilation.updateAsset(name, new sources.RawSource(source));
            }
        }
    }
    function shouldInlinify(assetName) {
        for (let chunk of compilation.chunks) {
            for (let file of chunk.files) {
                if (file === assetName) {
                    return (
                        chunks.indexOf(chunk.id) > -1 ||
                        chunks.indexOf(chunk.name) > -1
                    );
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
        if (hooks) {
            // for new version of webpack
            hooks.thisCompilation.tap('Replace', (compilation) => {
                compilation.hooks.processAssets.tap(
                    {
                        name: 'Replace',
                        stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE
                    },
                    () => {
                        inlinify(compilation, chunks);
                    }
                );
            });
        } else {
            // for old version of webpack, use legacy plugin method to hook event
            compiler.plugin('emit', emit);
        }
    };
    return WorkerInlinifyWebpackPlugin;
})();
module.exports = WorkerInlinifyWebpackPlugin;
