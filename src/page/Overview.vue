<template>
	<div class="overview">
		<div class="title">
			<span>Smart Campus For HNJM</span>
			<h1 class="h1">智慧经贸</h1>
			<img src="../assets/overview/logo.png" alt="" class="logo">
		</div>
		<div class="divider_line"></div>
		<swiper :options="swiperOption" ref="mySwiper" class="shortcuts">
			<!-- slides -->
			<swiper-slide v-for="item in shortcuts" :key="item.index">
				<h4 class="h4">{{item.title}}</h4>
				<p class="desc">{{item.desc}}</p>
				<img :src="item.blog" :alt="item.title" class="blog">
			</swiper-slide>
		</swiper>
		<div class="divider_line"></div>
		<div class="project">
			<h4 class="h4">可控项目</h4>
			<swiper :options="swiperOptionCard" ref="mySwiperCard" class="projects">
				<!-- slides -->
				<swiper-slide v-for="item in project" :key="item.index" class="lists">
					<img :src="item.blog" class="blog">
					<p>{{item.num}}</p>
				</swiper-slide>
			</swiper>
		</div>
		<div class="divider_line"></div>
		<div class="infoCell">
			<h4 class="h4">通知消息 <span class="next" @click="next('news')">查看全部</span></h4>
			<div class="cell" v-if="news.length" v-for="item in news" :key="item.id">
				<p class="titles">{{item.title}} <span class="time">{{item.addtime}}</span></p>
				<p class="desc" v-html="item.content"></p>
			</div>
			<div v-if="!news.length"><no-data></no-data></div>
		</div>
		<div class="divider_line"></div>
		<div class="infoCell">
			<h4 class="h4">操作记录 <span class="next" @click="next('records')">查看全部</span></h4>
			<div class="cell" v-if="records.length" v-for="item in records" :key="item.id">
				<p class="recordtime">{{item.addtime}}</p>
				<p class="content">{{item.typename}}{{item.campus + item.buildtype + item.buildname + item.roomnum }}</p>
			</div>
			<div v-if="!records.length"><no-data></no-data></div>
		</div>
        <app-tabbar :post="{ index: 0 }"></app-tabbar>
	</div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import AppTabbar from '@/utils/AppTabbar'
export default {
	components: {
		swiper,
		swiperSlide,
		AppTabbar
	},
	data() {
		return {
			swiperOption: {
				slidesPerView: 'auto',
				loop: true, // 循环
				initialSlide: 0, // 设定初始化时 slide 的索引
				spaceBetween: 8,
				autoplay: {
					delay: 3500,
					stopOnLastSlide: false,
					disableOnInteraction: false
				}
			},
			swiperOptionCard: {
				slidesPerView: 'auto',
				spaceBetween: 8,
				loop: true, // 循环
				initialSlide: 0, // 设定初始化时 slide 的索引
				autoplay: {
					delay: 3500,
					stopOnLastSlide: false,
					disableOnInteraction: false
				}
			},
			shortcuts: [{
				title: '临时权限',
				desc: '您可以点击申请您需要的设备的临时权限',
				blog: require('../assets/overview/b1.png'),
			}, {
				title: '计划任务',
				desc: '您可以在系统内对智能设备设定一个自动执行的任务',
				blog: require('../assets/overview/b2.png'),
			}, {
				title: '打卡管理',
				desc: '创建一个打卡、考勤、签到的记录',
				blog: require('../assets/overview/b3.png'),
			}, {
				title: '日程签到',
				desc: '点击查看您的日程安排以进行远程开锁和签到',
				blog: require('../assets/overview/b4.png'),
			}, {
				title: '打卡签到',
				desc: '点击此处进行人脸识别验证以完成打卡签到',
				blog: require('../assets/overview/b5.png'),
			}, {
				title: '课程表',
				desc: '点击查看您的课程表',
				blog: require('../assets/overview/b6.png'),
			}],
			project: [{
				blog: require('../assets/overview/equip.png'),
				num: 0,
			}, {
				blog: require('../assets/overview/room.png'),
				num: 0,
			}, {
				blog: require('../assets/overview/card.png'),
				num: 0,
			}],
			news:[],
			records:[],
		}
	},
	created(){
		this.getProject();
		this.getNews();
		this.getRecords();
	},
	methods:{
		getNews(){
			var that = this;
			that.axios({
				url: '/core/Messages/listAjax',
				params: {
					page: 1,
					pageSize: 4,
				},
				success(res){
					that.news = res;
				},
			})
		},
		getRecords(){
			var that = this;
			that.axios({
				url: '/core/person/getSignlogAjax',
				params: {
					page: 1,
					pageSize: 4,
					signtype: 1
				},
				success(res){
					that.records = res;
				}
			})
		},
		next(pathName){
			this.$router.push('/' + pathName + this.suffix)
		},
		getProject(){
			var that = this;
			that.axios({
				url: '/core/person/getProjectAjax',
				success(res){
					// 设备
					that.project[0].num = res.facilitynum;
					// 房间
					that.project[1].num = res.roomnum;
					// 卡片
					that.project[2].num = res.cardnum;
				}
			})
		}
	}
}

</script>
<style lang="less" scoped>
.overview {
	background: #fff;

	.divider_line {
		border-bottom: 1px solid #e6e6e6;
	}

	.h4 {
		color: #333;
		font-size: 18px;
		position: relative;
		font-weight: normal;

		.next {
			color:#4985f7;
			display: inline-block;
			position: absolute;
			right: 0;
			line-height: 24px;
			font-size: 14px;
		}
	}

	.title {
		position: relative;
		padding: 3px 3% 12px;

		span {
			font-size: 12px;
			color: #999;
		}

		.h1 {
			font-size: 24px;
			font-weight: normal;
			line-height: 1.3;
		}

		.logo {
			width: 46px;
			height: 46px;
			position: absolute;
			top: 12px;
			right: 3%;
		}
	}

	.shortcuts {
		padding: 12px 5%;

		.desc {
			color: #999;
			font-size: 13px;
			padding-bottom: 5px;
		}

		.blog {
			width: 100%;
		}
	}

	.project {
		.h4{
			padding: 12px 5%;
		}

		.lists {
			width: 70%;
			position: relative;
			padding-top: 5px;
			
			.blog {
				width: 100%;
			}

			p {
				font-size: 32px;
				position: absolute;
				bottom: 28px;
				left: 30px;
				background: #fff;
				color: #666;
				width: 40px;
			}
		}
	}

	.infoCell{
		padding: 12px 5%;

		.cell {
			padding: 12px 0;
			border-bottom: 1px dashed #e0e0e0;

			.titles{
				font-size: 12px;
				color: #ee9696;
				position: relative;
				padding-bottom: 4px;

				.time{
					position: absolute;
					line-height: 18px;
					right: 0;
					color: #999;
				}
			}
			.desc{
				font-size: 13px;
				color: #666;
			}

			&:last-child{
				border-bottom: 0;
			}

			.recordtime{
				font-size: 12px;
				color: #999;
			}
			.content{
				font-size: 13px;
				color: #555;
			}
		}
	}
}

</style>
