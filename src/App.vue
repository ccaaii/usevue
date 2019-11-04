<template>
    <div id="app">
        <transition :name="transitionName">
            <keep-alive>
                <router-view class="child-view" v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
        <transition :name="transitionName">
            <router-view class="child-view" v-if="!$route.meta.keepAlive"></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'app',
    data() {
        return {
            transitionName: '',
            token: this.$store.state.token,
        }
    },
    watch: {
        '$route'(to, from) {
            if (to.meta.index > from.meta.index) {
                this.transitionName = 'slide-left';
            } else {
                this.transitionName = 'slide-right';
            }
        },
    },
    created() {
        if(this.$store.state.token){ // url上有token的情况
            this.getInfo();
        }
    }
}

</script>
<style lang="less">
@import '~vux/src/styles/reset.less';

/*初设置*/
* {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    touch-action: pan-y;
}

input::-webkit-input-placeholder {
    color: #ccc;
}

body {
    background-color: #f4f4f4;
}

select,
button {
    outline: 0;
}

input,
textarea {
    outline: none;
    -webkit-appearance: none;
    border: 1px dashed #c1c1c1;
    border-radius: 4px;
    width: 100%;
    padding: 8px 12px;
    box-sizing: border-box;
    font-size: 14px;
    resize: none;
}

ul,
li {
    list-style: none;
    margin: 0;
    padding: 0;
}

a:link,
a:actived,
a:focused {
    background-color: transparent;
}

.divider {
    height: 4px;
    background-color: #f4f4f4;
}

.box {
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
    margin: 12px 0;
    padding: 5px 10px;
}

/*初设置 end*/

/*滑动动画*/
#app .child-view {
    width: 100%;
    height: 100%;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
}

.slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}

/*滑动动画 end*/

</style>
