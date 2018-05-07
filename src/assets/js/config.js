// 配置文件
const NODE_ENV = process.env.NODE_ENV;
let config = {}
console.log('this node_env is ' + NODE_ENV);

// 内网配置
const devconfig = {
    baseurl: 'http://192.168.0.202:9029/trade',
    appcode: '200362',
    version: '1.0',
    uploadurl: '../sjbWeb/upload'
}

// 测试配置
const testconfig = {
    baseurl: 'trade', //直接请求 由ngx转发
    appcode: '200102',
    version: '1.0',
    uploadurl: '../sjbWeb/upload'
}

// 生产配置
const propconfig = {
    baseurl: 'trade', //直接请求 由ngx转发
    appcode: '200336',
    version: '1.0',
    uploadurl: './sjbWeb/upload'
}

// 根据环境变量 导出对应配置
if (NODE_ENV == 'development') {
    config = devconfig;

    // 内网直连测试服务器
    if (process.argv[0] === 'testserver') {
        config = testconfig
        config.baseurl = '/testserver'
    }
    // 内网直连正式服务器
    if (process.argv[0] === 'proserver') {
        config = propconfig
        config.baseurl = '/proserver'
    }
} else if (NODE_ENV == 'testing') {
    config = testconfig;
} else {
    config = propconfig;
}

export default config
