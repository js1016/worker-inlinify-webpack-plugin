import * as workerInlinify from 'worker-inlinify';

const inlinify = function (compilation) {
    workerInlinify._webpackAssets = compilation.assets;
    for (let name in compilation.assets) {
        if (name.toLowerCase().endsWith('.js')) {
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
    debugger;
};

class WorkerInlinifyWebpackPlugin {

    constructor() { }

    apply(compiler) {
        let hooks = compiler.hooks;
        let emit = function (compilation, callback) {
            inlinify.call(this, compilation);
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