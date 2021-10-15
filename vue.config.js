module.exports = {
    devServer: {
        proxy: 'https://cn.bing.com' //这里写入你要获取数据的服务器的地址
    },
    configureWebpack:{
        externals: {
            BMap: 'BMap',
        }
    }
}
