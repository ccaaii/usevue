<template>
    <div>
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
            <li v-if="noData">
                <no-data></no-data>
            </li>
            <li v-for="item in list" :key="item.id" v-if="list.length" class="list">
                <slot name="list" :data="item"></slot>
            </li>
            <li class="listLoading" v-if="!loading">
                <mt-spinner :type="0"></mt-spinner>
            </li>
        </ul>
    </div>
</template>
<script>
/* 
 *  使用实例
 *  html 中使用
 *  <app-infinite-loading :post="list">
        <template slot="list" slot-scope="props">
            <!--正文内容， 变量以 props 衔接-->
        <template>
    <app-infinite-loading>
 * 
 *  script 中 data 的 list 参数，取值示例
    list: {
        // 要请求的接口
        url: '/core/person/getaccountRecordAjax', 
        // 要上送的参数
        params: { 
            page: 1,
            pageSize: 10,
        },
    },
 */
export default {
    name: 'AppInfiniteLoading',
    props: ['post'],
    data() {
        return {
            isLoadMore: false, // 是否请求下一页数据
            loading: false, // 是否显示 加载loading 在页面内部
            list: [],
            counter: this.post,
            noData: false,
        }
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            this.isLoadMore = false; // 每次getList被调用，先将 isLoadMore 设为 false，让不能滚动加载
            var that = this;
            that.axios({
                url: that.counter.url,
                params: that.counter.params,
                success(data, res) {
                	if (data.length === 0) {
                    	that.noData = true;
                        that.loading = true;
                        that.list = [];
                    	return;
                	}
		            
                    that.noData = false;
                    that.list = that.counter.params.page === 1 ? data : that.list.concat(data);
                    that.isLoadMore = true;
                    that.loading = that.counter.params.page === res.pageInfo.totalPage;
                    if (data.length === 0) {
                        that.loading = true;
                    }
                },
            })
        },
        loadMore() {
            if (this.isLoadMore) { // isLoadMore 为 true 时， 才去有效执行 loadMore ，否则不执行
                this.counter.params.page += 1;
                this.getList();
            }
        }
    }
}

</script>
<style>
ul,
li {
    list-style: none;
    margin: 0;
    padding: 0;
}

.listLoading {
    text-align: center;
}

.listLoading span {
    display: inline-block;
}

</style>
