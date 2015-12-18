var webpack = require('webpack')

module.exports = {
    entry: {
        anime_rank: "./src/js/anime_rank.js"
    },
    output: {
        path: 'build',
        filename: "[name].js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },

            {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]

}