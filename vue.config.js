module.exports = {
    productionSourceMap: false,
    devServer: {
        port: '8000',
        hot: true,
        proxy: {
            'api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}