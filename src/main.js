// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import axios from 'axios'
import { Loading, ConfirmPlugin } from 'vux'
import { Loadmore, Toast, Spinner, Indicator, InfiniteScroll, Header, Button } from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './vuex/store'


/*
 * 全局变量
 * @param imgUrl {string} 图片的基础地址
 * @param faceDefault {string} 默认头像
 * @param Indicator {function} ajax请求等待
 *
 */
Vue.prototype.imgUrl = 'http://center.paint-future.cn/piano/filemanager/file/file?key=';
Vue.prototype.faceDefault = require('./assets/vux_logo.png');
Vue.prototype.Indicator = Indicator;
Vue.prototype.suffix = store.state.suffix;
Vue.prototype.toast = Toast;


/*
 * 全局组件
 * no-data           暂无数据
 * no-data-img       带上图片的暂无数据
 * loading           数据加载等待 loading
 * Loadmore          列表类加载更多
 */
Vue.component('no-data', {
    template: `
        <div style="line-height: 8; text-align: center; color:#999; font-size: 14px;">暂无数据</div>
    `,
})
Vue.component('no-data-img', {
    template: `
        <div style="padding-top: 230px;padding-bottom: 30px;text-align: center; color:#999; font-size: 14px; background: url(${require('./assets/empty.png')}) center 50px no-repeat; background-size: 40%;" >暂无数据</div>
    `,
})
Vue.component('loading', Loading)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Spinner.name, Spinner)
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)


/*
 * 全局方法
 * @name axios {function} ajax调用封装
 * @name now {function} 获取当前年份、月份、日期、时、分、秒
 * @name nows {function} 拼接在一起的年月日时分秒，目前只支持两种 'YYYY-MM-DD' 和 'YYYY-MM-DD hh:mm'
 * @name dou {function} 把小于10的数字以 0 开头的两位数表示
 *
 */

Vue.prototype.axios = function(params) {
    var that = this;
    that.Indicator.open('Loading');

    // 利用 token 进行登录入口校验 Begin: 如果token没有值，则不传 token，走绘梦未来登录，否则走学校登录接口
    if (store.state.token) {
        params.params = Object.assign({
            token: store.state.token
        }, params.params);
    }
    // 利用 token 进行登录入口校验 End

    axios({
        method: params.method || 'post', // 默认设置为 post，这样一来，这个值不传就是 post
        url: params.url,
        params: Object.assign({
            aid: store.state.aid,
            pid: store.state.pid,
        }, params.params)
    }).then(function(response) {
        that.Indicator.close();
        if (response.data.status === 0) {
            var res = response.data.data; // 第一个data是axios返回结果中的data，第二个data指返回数据的第一个data
            /*
             * 后台返回数据的格式，目测有如下 7 种：
             * 1、 {status: 0, data:{data:[{}], pageInfo:{}}, } // 后台分页时返回
             * 2、 {status: 0, data:{data:{}, pageInfo:{}}, } // pageSize 传 1
             * 6、 {status: 0, data:{token: '', userinfo: {}, } // 登录成功，接口返回格式
             * 7、 {status: 0, data:{cardnum: '0', ...} // 可控项目，统计数据
             * 3、 {status: 0, data:[{}], } // 获取个人信息
             * 4、 {status: 0, data:'', } // 添加时返回, data是字符串
             * 4、 {status: 0, data:1, } // 添加时返回, data是数字
             * 5、 {status: 0, } // 取消预约时的返回结果
             */

            var condition = false; // 是否符合输出条件
            var resData;

            if (typeof res === 'object' && Object.prototype.toString.call(res).toLowerCase() === '[object object]' && !res.length) {
                // 如果是 json对象
                resData = res.data || res; // 如果返回里没有 data，就把 res 自己返出去
                condition = true;
            }
            if (typeof res === 'number' || typeof res === 'string' || Array.isArray(res)) {
                // 如果是数字，字符串 or 数组
                resData = res;
                condition = true;
            }

            if (typeof res === 'undefined') {
                // 如果根本没有 返回 data
                resData = '';
                condition = true;
            }

            if (condition) {
                typeof params.success === 'function' && params.success(resData, res); // 一般情况下，取 第一个值，数组就行。 有时候需要别的值，可以直接从第二个参数 res 中获得所有
            } else {
                Toast(params.url + ':  返回的数据不是约定的标准的json结构')
            }
        } else if (response.data.status === -1) {
            Toast({
                message: '未登录',
                duration: 500,
            });
            setTimeout(() => {
                location.href = location.href.replace(/\/#\/.*\?/, '/#/login?'); // 当前地址替换到登录页
            }, 500)
        } else {
            console.log(response.data.errmsg)
            Toast({
                message: response.data.errmsg || '未定义错误',
                duration: 1000,
            });
        }
    }).catch(function(error) {
        that.Indicator.close();
        console.log(params.url + ': ')
        console.log(error)
    })
}

Vue.prototype.dou = function(n) {
    return (n > 9 ? ('' + n) : ('0' + n)) + '';
}

Vue.prototype.now = function(time) {
    let that = this;
    let result = '';
    let date = new Date();
    switch (time) {
        case 'YYYY':
            result = date.getFullYear();
            break;
        case 'YY':
            result = (date.getFullYear() + '').slice(2);
            break;
        case 'MM':
            result = date.getMonth() + 1;
            break;
        case 'DD':
            result = date.getDate();
            break;
        case 'hh':
            result = date.getHours();
            break;
        case 'mm':
            result = date.getMinutes();
            break;
    }
    return that.dou(result);
}

Vue.prototype.nows = function(time) {
    let that = this;
    let result = '';
    switch (time) {
        case 'YYYY-MM-DD':
            result = that.now('YYYY') + '-' + that.now('MM') + '-' + that.now('DD');
            break;
        case 'YYYY-MM-DD hh:mm':
            result = that.now('YYYY') + '-' + that.now('MM') + '-' + that.now('DD') + ' ' + that.now('hh') + ':' + that.now('mm');
            break;
        case 'hh:mm':
            result = that.now('hh') + ':' + that.now('mm');
            break;
    }
    return result;
}

// 用户基础详细信息                    
Vue.prototype.getInfo = function() {
    Vue.prototype.axios({
        url: '/core/person/detailajax',
        success(res) {
            store.commit('mutationAddUserinfo', res[0]);
        }
    })
}

/*
 * 插件使用
 * InfiniteScroll 列表无线加载
 * Vuex 状态管理
 */
Vue.use(InfiniteScroll);
Vue.use(ConfirmPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

/*
 * 关于 token
 * 1、 默认从url中写入的token读取
 * 2、 如果 url 中没有 token，或者 token失效了，则走登录页面，从登录接口获取token
 * 3、 token 存在 store 里，作为临时变量使用
 */


/* eslint-disable no-new */
var vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
