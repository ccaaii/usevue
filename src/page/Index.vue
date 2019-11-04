<template>
    <div class="index">
        <div class="user">
            <img class="pic" :src="headPortrait">
            <div class="name">{{name}}</div>
            <div class="finger" :class="isFinger"></div>
            <div class="faceid" :class="isFaceid"></div>
        </div>
        <grid class="grid">
            <grid-item :link="item.link" :label="item.label" v-for="item in grids" :key="item.index">
                <img slot="icon" :src="item.icon">
            </grid-item>
        </grid>
        <group class="group" v-for="items in groups" :key="items.id">
            <cell class="cell" is-link :title="item.title" :link="item.link" v-for="item in items" :key="item.id">
                <img slot="icon" class="icons" :src="item.icon" />
            </cell>
        </group>
        <app-tabbar :post="{ index: 2 }"></app-tabbar>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Grid, GridItem, Group, Cell } from 'vux'
import AppTabbar from '@/utils/AppTabbar'
export default {
    components: {
        Grid,
        GridItem,
        Group,
        Cell,
        AppTabbar
    },
    data() {
        return {
            grids: [{
                id: '1',
                link: '',
                label: '可控房间',
                icon: require('../assets/index/room.png'),
            }, {
                id: '2',
                link: '',
                label: '可控设备',
                icon: require('../assets/index/lock.png'),
            }, {
                id: '3',
                link: '',
                label: '可控卡片',
                icon: require('../assets/index/card.png'),
            }],
            groups: [
                [{
                    id: '1',
                    link: '',
                    title: '通知信息',
                    icon: require('../assets/index/news.png'),
                }],
                [{
                    id: '1',
                    link: '',
                    title: '人员列表',
                    icon: require('../assets/index/man.png'),
                }, {
                    id: '2',
                    link: '',
                    title: '操作记录',
                    icon: require('../assets/index/record.png'),
                }],
                [{
                    id: '1',
                    link: '',
                    title: '修改密码',
                    icon: require('../assets/index/password.png'),
                }]
            ],
        }
    },
    computed: {
        headPortrait: function() {
            return this.$store.state.userinfo.imgs ? (this.imgUrl + this.$store.state.userinfo.imgs) : this.faceDefault
        },
        isFinger: function() {
            return this.$store.state.userinfo.fingerprint ? 'on' : 'off'
        },
        isFaceid: function() {
            return this.$store.state.userinfo.faceimg ? 'on' : 'off'
        },
        ...mapState({
            name: state => state.userinfo.username
        })
    }
}

</script>
<style>
.user {
    height: 7.78em;
    background: url('../assets/index/bg.png') 0 0 no-repeat;
    box-sizing: border-box;
    padding: 1.9em 0 0 4%;
}

.user>div,
.user .pic {
    display: inline-block;
    vertical-align: middle;
}

.user .pic {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #fff;
}

.user .name {
    color: #fff;
    line-height: 64px;
    margin-left: 15px;
    font-size: 18px;
    min-width: 60px;
}

.user .finger,
.user .faceid {
    width: 20px;
    height: 20px;
}

.user .finger {
    margin-left: 30px;
    background: url('../assets/index/icon_zhiwen_off.png') 0 0 no-repeat;
    background-size: 20px;
}

.user .finger.on {
    background: url('../assets/index/icon_zhiwen_on.png') 0 0 no-repeat;
    background-size: 20px;
}

.user .faceid {
    margin-left: 8px;
    background: url('../assets/index/icon_faceid_off.png') 0 1px no-repeat;
    background-size: 18px;
}

.user .faceid.on {
    background: url('../assets/index/icon_faceid_on.png') 0 1px no-repeat;
    background-size: 18px;
}

.grid {
    background: #fff;
}

.grid .weui-grid__label {
    color: #515151;
}

.grid .weui-grid {
    padding: 12px 10px;
}

.group .weui-cells::before {
    border: 0;
}

.group .weui-cells {
    margin-top: 0.7em;
}

.group .cell {
    color: #515151;
    font-size: 13px;
}

.group .cell .icons {
    width: 17px;
    vertical-align: -3px;
    margin-right: 10px;
}

</style>
