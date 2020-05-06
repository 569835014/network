module.exports={
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/api': ''
                }

            }
        }

    }
}