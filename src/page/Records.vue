<template>
    <div class="record">
        <div class="condition">
        	<div class="inputbox">
	            <div class="startDate">
	                <datetime
	                    v-model="list.params.starttime"
	                    placeholder="选择开始日期"
	                    :end-date="endDate"
	                    clear-text="清除"
	                    @on-change="change"
	                    @on-clear="clearValue"
	                    ></datetime>
	            </div>
	            <span class="divider" v-if="list.params.starttime">|</span>
	            <div class="endDate" v-if="list.params.starttime">
	                <datetime
	                    v-model="list.params.endtime"
	                    placeholder="选择结束日期"
	                    :start-date="list.params.starttime"
	                    :end-date="endDate"
	                    @on-confirm="onConfirm"
	                    ></datetime>
	            </div>
            </div>
        </div>

        <app-infinite-loading :post="list" ref="recordlist">
            <template slot="list" slot-scope="props">
                <p class="room">{{props.data.roomnum}}琴房</p>
                <p class="time">{{props.data.starttime}}上琴</p>
                <div class="minute">{{props.data.keeptime}}</div>
            </template>
        </app-infinite-loading>
    </div>
</template>
<script>
import { Datetime, Group, XButton, Toast } from 'vux'
import AppInfiniteLoading from '@/utils/AppInfiniteLoading'
export default {
    components: {
        Datetime,
        Group,
        XButton,
        Toast,
        AppInfiniteLoading
    },
    data() {
        return {
            endDate: this.nows('YYYY-MM-DD'), //限定最大日期
            list:{
                url: '/core/person/getSignlogAjax',
                params: {
                    starttime: '',
                    endtime: '',
                    page: 1,
                    pageSize: 10,
                }
            }
        }
    },
    methods:{
        change(val){
            this.list.params.endtime = ''; // 起始日期有变动，结束日期就清空
            this.$refs.recordlist.getList();
        },
        onConfirm(val) {
            this.$refs.recordlist.getList();
        },
        clearValue(){
            this.list.params.starttime = ''; // 起始日期有变动，结束日期就清空
        }
    }
}
</script>

<style>
ul,li{
    list-style: none;
}
.record .condition{
    padding: 10px 14px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 3px;
}
.record .condition .inputbox{
	padding: 5px 5% 5px 10%;
    background: #f4f4f4;
    font-size: 13px;
}
.record .condition .vux-cell-placeholder,
.record .condition .vux-cell-value{
	color: #333;
}
.record .condition .inputbox .startDate,
.record .condition .inputbox .endDate{
	width: 46%;
	text-align: center;
	color: #333;
	display: inline-block;
}

.record .condition .divider{
	color: #fff;
}
.record .condition .vux-datetime{
    color:#B9B9B9;
}

.record li{
    width: 90%;
    margin: 0 auto;
    border-radius: 6px;
    padding: 15px 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    box-shadow: 0 1px 10px 0px rgba(0,0,0,0.05);
    position: relative;
    color: #3d3d3d;
}

.record li .minute{
    position: absolute;
    right: 20px;
    top: 50%;
    margin-top: -12px;
    color: #3CA6F7;
    font-weight: bold;
    font-size:15px;
}

.record li .time{
    color: #a6a6a6;
    font-size: 14px;
    padding-top: 10px;
}
</style>
