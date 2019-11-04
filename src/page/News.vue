<template>
	<div class="lists">
		<app-infinite-loading :post="list" class="cell">
			<template slot="list" slot-scope="props">
				<h6 class="h6">{{props.data.title}}</h6>
				<p class="time">{{props.data.addtime}}</p>
				<p class="desc" v-html="props.data.content"></p>
			</template>
		</app-infinite-loading>
	</div>
</template>
<script>
import AppInfiniteLoading from '@/utils/AppInfiniteLoading'
export default {
	components:{
		AppInfiniteLoading
	},
	data() {
		return {
			list: {
				url: '/core/Messages/listAjax',
				params: {
					page: 1,
					pageSize: 6,
				},
			},
		}
	}
}

</script>
<style lang="less" scoped>
	.lists {
		.cell{
			padding: 0 6% 80px;
			background: #fff;

			.h6{
				font-weight: normal;
				color: #444;
				font-size: 16px;
				padding-bottom: 10px;
				padding-top: 24px;
			}

			.time{
				color: #ccc;
				font-size: 12px;
				padding-bottom: 15px;
				padding-left: 8px;
			}

			.desc{
				font-size: 14px;
				color: #999;
				padding-bottom: 20px;
				padding-left: 8px;
				border-bottom: 1px dashed #ccc;
			}
		}
	}
</style>
