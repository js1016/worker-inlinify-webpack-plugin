import * as workerInlinify from 'worker-inlinify';

const inlinify = function (compilation, chunks) {
    workerInlinify._webpackAssets = compilation.assets;
    for (let name in compilation.assets) {
        if (name.toLowerCase().endsWith('.js') && shouldInlinify(name)) {
            let source = workerInlinify.inlinify(compilation.assets[name].source());
            if (source !== compilation.assets[name].source()) {
                compilation.assets[name] = {
                    source: () => {
                        return source;
                    },
                    size: () => {
                        return source.length;
                    }
                }
            }
        }
    }
    function shouldInlinify(assetName) {
        for (let i = 0; i < compilation.chunks.length; i++) {
            for (let j = 0; j < compilation.chunks[i].files.length; j++) {
                if (compilation.chunks[i].files[j] === assetName) {
                    return chunks.indexOf(compilation.chunks[i].id) > -1 || chunks.indexOf(compilation.chunks[i].name) > -1;
                }
            }
        }
        return false;
    }
};

class WorkerInlinifyWebpackPlugin {
    chunks: string[] = [];
    constructor(options) {
        if (options && 'chunks' in options) {
            this.chunks = options.chunks;
        }
    }

    apply(compiler) {
        let chunks = this.chunks;
        let hooks = compiler.hooks;
        let emit = function (compilation, callback) {
            inlinify.call(this, compilation, chunks);
            callback();
        };
        if (hooks) {
            // for new version of webpack
            hooks.emit.tapAsync('worker-inlinify-webpack-plugin', emit);
        } else {
            // for old version of webpack, use legacy plugin method to hook event
            compiler.plugin("emit", emit);
        }
    }
}

export = WorkerInlinifyWebpackPlugin;