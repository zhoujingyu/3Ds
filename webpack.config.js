const baseSrc='./public/src/js';

module.exports = {
    watch: true,
    entry: {
        '/pages/pic3D': baseSrc+'/pages/pic3D.js',
        '/pages/pic2D': baseSrc+'/pages/pic2D.js',
        '/pages/pictureWall': baseSrc+'/pages/pictureWall.js'
    },
    output: {
        path: './public/dist/js',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};