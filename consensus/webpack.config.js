module.exports = {
    entry: path.resolve(__dirname, 'views', 'index.tsx'),
    rule: {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        historyApiFallback: true,
    },
}
