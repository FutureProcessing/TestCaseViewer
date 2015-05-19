module.exports = {
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
    },
    module: {
        loaders: [
            { test: /\.js|\.jsx$/, exclude: /node_modules/, loader: 'babel',
                query: {
                    optional: ['runtime'],
                    stage: 0
                }
            }
        ]
    },
    devtool: "inline-source-map"
};
