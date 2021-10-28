module.exports = {
    productionSourceMap: false,
    devServer: {
        port: '8000',
        hot: true,
        proxy: {
            'api': {
                //target: 'http://106.12.71.142:3000',
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}