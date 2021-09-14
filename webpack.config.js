const path = require('path');

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
    output: {
        filename: 'singlefin.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: "singlefinlib",
            type: "umd"
        }
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
};