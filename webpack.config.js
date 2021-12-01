const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    context: path.resolve('src'),
    devtool: 'inline-source-map',
    entry: './main.ts',
    mode: 'production',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    target: 'node',
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
};