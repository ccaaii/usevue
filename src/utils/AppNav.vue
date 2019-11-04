<template>
	<div>
		<!-- <mt-header :fixed="fixed" :title="post.title" v-if="isWeb">
			<router-link v-if="post.back" :to="post.back + this.suffix" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
			<mt-button icon="more" slot="right" v-if="post.more"></mt-button>
		</mt-header> -->
		<div class="header" :class="fixed && 'fixed'" v-if="isWeb">
			<div class="back" v-if="post.back" @click="back()">
				<mt-button icon="back"></mt-button>
			</div>
			<p class="text">{{post.title}}</p>
		</div>
		<div class="positionbox">
			<div class="position" v-if="fixed"></div>
			<div class="position" v-if="!isWeb"></div>
		</div>
	</div>
</template>

<script>
	export default{
		props: ['post'],
		data(){
			return{
				suffix: this.suffix,
				fixed: true, // fixed 为true， 头部固定， false，头部不固定
				isWeb: this.$store.state.app !== 'ios' && this.$store.state.app !== 'android'
			}
		},
		methods:{
			back(){
				this.$router.back();
			}
		}
	}
</script>

<style>
.header {
	height: 44px;
	width: 100%;
	background: #fff;
	color: #444;
	font-size: 16px;
	text-align: center;
	line-height: 43px;
}

.header.fixed{
	position: fixed;
	z-index: 1000;
	box-shadow: 0px 1px 10px 0px rgba(0,0,0,0.08);
}

.header .back{
	position: absolute;
	top: -2px;
	left: 0;
	background: #fff;
}

.header .back .mint-button--default{
	background: #fff;
	box-shadow: none;
}
/*===============*/

	.mint-header{
		height: 46px;
		background: #fff;
		color: #444;
		border-bottom: 1px solid #f0f0f0;
		box-shadow: 0 1px 8px 0px rgba(0,0,0,0.08)
	}
	.position{
		height: 44px;
	}
	.positionbox{
		max-height: 44px;
	}
</style>