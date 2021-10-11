module.exports = {
    productionSourceMap: false,
    devServer: {
        port: '8000',
        hot: true,
        proxy: {
            'api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}