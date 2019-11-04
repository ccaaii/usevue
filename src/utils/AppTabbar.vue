<template>
    <div>
        <div class="spacePlaceholder"></div>
        <tabbar class="tabbar" v-if="isTabbar" v-model="post.index">
            <tabbar-item v-for="item in menus" :key='item.id' :link='item.link'>
                <img v-if="post.index == item.id" slot="icon" :src="item.iconon">
                <img v-else slot="icon" :src="item.icon">
                <!-- <span slot="label">{{post.index}} - {{item.id}}</span> -->
            </tabbar-item>
        </tabbar>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
    name: 'AppTabbar',
    props: ['post'],
    components: {
        Tabbar,
        TabbarItem
    },
    data() {
        return {
            menus: [{
                id: 0,
                icon: require('../assets/tabbar/home.png'),
                iconon: require('../assets/tabbar/home_on.png'),
                link: '/overview' + this.$store.state.suffix,
            }, {
                id: 1,
                icon: require('../assets/tabbar/center.png'),
                iconon: require('../assets/tabbar/center_on.png'),
                link: '/' + this.$store.state.suffix,
            }, {
                id: 2,
                icon: require('../assets/tabbar/man.png'),
                iconon: require('../assets/tabbar/man_on.png'),
                link: '/index' + this.$store.state.suffix,
            }]
        }
    },
    computed: {
        isTabbar: function() {
            return this.$store.state.isTabbar;
        }
    },
}

</script>
<style scoped>
.tabbar {
    position: fixed;
    padding: 6px 0;
    background: #fff;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.06);
}

.tabbar::before {
    border: 0;
}

.tabbar img {
    width: auto;
    height: 22px;
}
.spacePlaceholder{
    height: 50px;
    width: 100%;
    background: #f4f4f4;
}
</style>
