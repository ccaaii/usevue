import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
 * 需要事前处理业务
 *
 * 校验:
 * 1、 如果 url 里没有 pid 或者 aid，就跳转到 404。
 * 2、 从带着 pid 或者 aid 的 url 里进来的，则之后每次跳转路由，都带上 pid 和 aid 在 url 上 
 */

//方法：从url里获取参数，返回具体字符串 或 ''
function getUrlParams (name) {
    //如果key 是 from , 则约定 from 在最后一个参数，from 的值全要
    if (name === 'from' && window.location.href.indexOf('from=') !== -1) {
        var index = Number(window.location.href.indexOf('from=')) + 5;
        return window.location.href.substr(index);
    } else {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var target = window.location.href.split('?')[1];
        if (target) {
            var r = target.match(reg);
            if (r != null) return unescape(r[2]);
        }else{
            return '';
        }
    }
    return '';
};

let pid = getUrlParams('pid');
let aid = getUrlParams('aid');
let app = getUrlParams('app');
let token = getUrlParams('token');
let bar = getUrlParams('bar');

if(!pid || !aid){
    location.href = '404.html';
}

let suffix = '?pid=' + pid 
 + '&aid=' + aid
 + ((app.toLowerCase() === 'ios' || app.toLowerCase() === 'android') ? ('&app=' + app) : '')
 + (token ? ('&token=' + token) : '')
 + (bar ? ('&bar=' + bar) : '');

/*
 * 需要事前处理业务 end
 */

export default new Vuex.Store({
	state:{
		userinfo: {
			username: ''
		},
		pid: pid,
        aid: aid,
        app: app,
        token: token, // 取值： 1、 url 2、 AppLogin登录成功后改写
        suffix: suffix,
        isTabbar: !!bar,
	},
	mutations:{
		mutationAddUserinfo (state, userinfo){
			return (state.userinfo = userinfo)
		},

		setToken (state, token) {
			return (state.token = token)
		}
	},
	actions: {
		addAction(context){
			context.commit('mutationAddUserinfo', '')
		}
	}
})
