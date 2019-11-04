'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        /*
         * piano 自建配置
         *
         **/
        '/core': {
            target: 'http://center.paint-future.cn/piano', // 目标接口域名
            changeOrigin: true, // 是否跨域
            pathRewrite: {
                '^/core': '/core'  // 重写接口, 这里的  /apollo  和  接口中需要的 apollo 呼应。不然不生效。必须有重复的单词。
            }
        },
        '/ucenter': {
            target: 'http://center.paint-future.cn', // 目标接口域名
            changeOrigin: true, // 是否跨域
            pathRewrite: {
                '^/ucenter': '/ucenter'  // 重写接口, 这里的  /apollo  和  接口中需要的 apollo 呼应。不然不生效。必须有重复的单词。
            }
        }

        /*
         * apollo 自建配置
         *
         *
        '/core': {
            target: 'http://center.paint-future.com/apollo', // 目标接口域名
            changeOrigin: true, // 是否跨域
            pathRewrite: {
                '^/core': '/core'  // 重写接口, 这里的  /apollo  和  接口中需要的 apollo 呼应。不然不生效。必须有重复的单词。
            }
        },
        '/ucenter': {
            target: 'http://center.paint-future.com', // 目标接口域名
            changeOrigin: true, // 是否跨域
            pathRewrite: {
                '^/ucenter': '/ucenter'  // 重写接口, 这里的  /apollo  和  接口中需要的 apollo 呼应。不然不生效。必须有重复的单词。
            }
        }*/
        
        /*
         * apollo 业务系统配置
         *
         *
         *'/apollo': {
            target: 'http://smartlock.hnjmxy.cn', // 目标接口域名
            changeOrigin: true, // 是否跨域
            pathRewrite: {
                '^/apollo': '/apollo'  // 重写接口, 这里的  /apollo  和  接口中需要的 apollo 呼应。不然不生效。必须有重复的单词。
            }
        },
        '/ucenter': {
            target: 'http://smartlock.hnjmxy.cn', // 目标接口域名
            changeOrigin: true, // 是否跨域
            pathRewrite: {
                '^/ucenter': '/ucenter'  // 重写接口, 这里的  /apollo  和  接口中需要的 apollo 呼应。不然不生效。必须有重复的单词。
            }
        }*/

        /*
         * crm 业务系统配置
         *
         *
        '/crm': {
            target: 'http://crm.youthbiger.com/', // 目标接口域名
            changeOrigin: true, // 是否跨域
            pathRewrite: {
                '^/crm': '/crm'  // 重写接口, 这里的  /apollo  和  接口中需要的 apollo 呼应。不然不生效。必须有重复的单词。
            }
        },
        '/ucenter': {
            target: 'http://crm.youthbiger.com', // 目标接口域名
            changeOrigin: true, // 是否跨域
            pathRewrite: {
                '^/ucenter': '/ucenter'  // 重写接口, 这里的  /apollo  和  接口中需要的 apollo 呼应。不然不生效。必须有重复的单词。
            }
        }*/
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    // 为给经贸 apollo 业务用
    
    index: path.resolve(__dirname, '../../../static/m/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../../../static/m'),

    // 正常用
    /*index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),*/
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
