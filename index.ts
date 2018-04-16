import * as workerInlinify from 'worker-inlinify';

class WorkerInlinifyWebpackPlugin {

    constructor() {}

    apply(compiler) {
        compiler.plugin('emit', function (compilation, callback) {
            workerInlinify._webpackAssets = compilation.assets;
            for (let name in compilation.assets) {
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
            callback();
        });
    }
}

export = WorkerInlinifyWebpackPlugin;