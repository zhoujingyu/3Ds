module.exports={
    watch: true,
    entry: {
        pic3D: './public/src/js/pages/pic3D.js'
    },
    output: {
        path: './public/dist/js/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
            }
        ]
    }
};