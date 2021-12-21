const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    context: path.resolve('src'),
    devtool: 'source-map',
    entry: './main.ts',
    mode: 'development',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    output: {
        filename: 'singlefin.js',
        path: path.resolve(__dirname, 'dist'),
        globalObject: 'this',
        library: {
            name: "jssinglefin",
            type: "umd"
        }
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    externalsPresets: {
        node: true
    },
	externals: [nodeExternals()],
    /*externals: {
        "js-entity-store": {
            commonjs: 'js-entity-store',
            commonjs2: 'js-entity-store',
            amd: 'jsentitystore',
            root: 'jsentitystore'
        }
    },*/
};