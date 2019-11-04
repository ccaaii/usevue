<template>
    <div class="center">
        <app-head :post="headInfo"></app-head>
        <div class="divider"></div>
        <div class="section">
            <h4 class="h4">日程<span class="next"></span></h4>
            <ul class="list">
                <li v-if="schedule.length > 0" v-for="item in schedule" :key="item.id">
                    <div class="box" :class="item.begintime < current && item.endtime > current ? 'now' : 'next'">
                        <span class="list_style_circle"></span>
                        <div class="part_time">
                            <p class="p_title">{{(item.begintime < current && item.endtime> current) ? '当前' : item.begintime < '12:00' ? '上午' : item.begintime < '19:00' ? '下午' : '晚上' }}</p> <p class="p_text">{{item.begintime.substr(0,5) + ' - ' + item.endtime.substr(0,5)}}</p>
                        </div>
                        <span class="list_style_divider"></span>
                        <div class="part_text">
                            <p class="p_title">{{item.title || item.signinname}}</p>
                            <p class="p_text">{{item.content || (item.campus)}}</p>
                        </div>
                    </div>
                </li>
                <li v-if="!schedule.length">
                    <no-data></no-data>
                </li>
            </ul>
            <p class="mark">今天共{{siginnum}}个日程，{{siginno}}个需要签到，您已签到{{sigindo}}次</p>
        </div>
        <div class="divider"></div>
        <div class="section">
            <app-swiper :post="access"></app-swiper>
            <app-swiper :post="classroom"></app-swiper>
            <app-swiper :post="dormitory"></app-swiper>
            <app-swiper :post="temproom"></app-swiper>
        </div>
        <app-tabbar :post="{ index: 1 }"></app-tabbar>
    </div>
</template>
<script>
import AppHead from '@/utils/AppHead'
import AppSwiper from '@/utils/AppSwiper'
import AppTabbar from '@/utils/AppTabbar'
export default {
    components: {
        AppHead,
        AppSwiper,
        AppTabbar
    },
    data() {
        return {
            // 个人信息
            headInfo: {
                image: true,
                name: true,
                number: true,
            },
            // 当前时分
            current: this.nows('hh:mm'),
            // 签到信息
            siginnum: 0,
            sigindo: 0,
            siginno: 0,
            // 日程信息
            schedule: [],
            // 门禁信息
            access: {
                title: '我的门禁',
                pictype: '', // 第一种背景图，
                list: [{
                    buildname: '综合楼',
                    buildtype: '综合楼',
                    buildename: 'COMPLEX BUILDING',
                    fingerprint: '',
                    floornum: '1',
                    roomnum: '综合楼1楼门禁',
                    roomid: '71',
                    facilitystatus: '1'
                }],
            },
            // 教室信息
            classroom: {
                title: '我的教室',
                pictype: '', // 第一种背景图，
                list: [],
            },
            // 寝室信息
            dormitory: {
                title: '我的寝室',
                pictype: '', // 第二种背景图，
                list: [],
            },
            // 临时房间
            temproom: {
                title: '临时房间',
                pictype: '3', // 第三种背景图
                list: [],
                isDivier: true, // true 为不需要分隔线。 最后一块儿不需要分隔线
            }
        }
    },
    created() { 
        this.init();
    },
    methods: {
        // 初始化
        init() {
            this.getSchedule();
            this.getRoomes();
        },
        // 获取日程信息
        getSchedule() {
            var that = this;
            that.axios({
                url: '/core/syllabus/oneDayListAjax',
                success(res) {
                    that.siginnum = res.num[0].allnum;
                    that.sigindo = res.num[0].isSignnum;
                    that.siginno = res.num[0].needSignnum;
                    // 预处理 res.doing 和 res.notdo
                    res.doing = res.doing instanceof Array ? res.doing : []
                    res.notdo = res.notdo instanceof Array ? res.notdo : []
                    // 预处理 res.doing 和 res.notdo end
                    that.schedule = res.doing.concat(res.notdo);
                }
            })
        },
        // 获取房间类信息
        getRoomes() {
            var that = this;
            that.axios({
                url: '/core/syllabus/roomListAjax',
                success(res) {
                    that.classroom.list = [];
                    for (var i = 0; i < res.myClassroom.length; i++) {
                        that.classroom.list.push(res.myClassroom[i].roominfo);
                    }
                    that.dormitory.list = res.myDorm;

                    that.classroom.badage = res.myClassroom.length;
                    that.dormitory.badage = res.myDorm.length;
                }
            })
        }
    },
}

</script>
<style scoped>
.section {
    padding: 12px;
    background: #fff;
}

.h4 {
    font-size: 16px;
    font-weight: normal;
    position: relative;
}

.h4 .next {
    width: 16px;
    height: 16px;
    display: inline-block;
    position: absolute;
    top: 5px;
    right: 5px;
    background: url('../assets/center/next.png') 0 0 no-repeat;
    -webkit-background-size: 10px;
    background-size: 10px;
}

.section .mark {
    font-size: 12px;
    color: #3d3d3d;
}

.section .list .box {
    font-size: 14px;
}

.section .list .box .list_style_circle {
    display: inline-block;
    vertical-align: middle;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #eee;
    margin-right: 3px;
}

.section .list .box .list_style_divider {
    display: inline-block;
    vertical-align: middle;
    width: 2px;
    height: 18px;
    background: #eee;
    margin: 0 8px 0 4px;
}

.section .list .box .part_time,
.section .list .box .part_text {
    display: inline-block;
    vertical-align: middle;
}

.section .list .box .p_title,
.section .list .box .p_title {
    color: #616161;
    text-align: center;
}

.section .list .box .p_text,
.section .list .box .p_text {
    color: #8e8e8e;
    font-size: 12px;
}

.section .list .box.now .list_style_circle,
.section .list .box.now .list_style_divider {
    background: #20c997;
}

.section .list .box.next .list_style_circle,
.section .list .box.next .list_style_divider {
    background: #2084ff;
}

</style>
