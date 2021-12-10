const path = require('path');

module.exports = {
    context: path.resolve('src'),
    devtool: 'source-map',
    entry: './main.ts',
    mode: 'production',
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
};