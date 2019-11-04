import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
import Center from '@/page/Center'
import Login from '@/page/Login'
import Index from '@/page/Index'
import Overview from '@/page/Overview'
import News from '@/page/News'
import Records from '@/page/Records'
import Form from '@/page/Form'

Vue.use(Router)

const router = new Router({
    scrollBehavior(to, from, savePosition) {
        if (savePosition) {
            return savePosition;
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: [{
        path: '/',
        name: 'center',
        component: Center,
        meta: { keepAlive: true, index: 0 }
    }, {
        path: '/index',
        name: 'index',
        component: Index,
        meta: { keepAlive: true, index: 0 }
    }, {
        path: '/overview',
        name: 'overview',
        component: Overview,
        meta: { keepAlive: true, index: 0 }
    }, {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { index: 1 }
    }, {
        path: '/news',
        name: 'news',
        component: News,
        meta: { index: 1 }
    }, {
        path: '/form',
        name: 'form',
        component: Form,
        meta: { index: 1 }
    }, {
        path: '/records',
        name: 'records',
        component: Records,
        meta: { index: 1 }
    }]
});

// 登录校验 Begin
router.beforeEach((to, from, next) => {
    if (!store.state.token) {
        if (to.path.indexOf('/login') != -1) {
            next();
        } else {
            next('/login' + store.state.suffix)
        }
    } else {
        next();
    }
})
// 登录校验 End

export default router;
