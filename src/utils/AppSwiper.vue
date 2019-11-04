<template>
    <div>
        <h4 class="h4">{{post.title}}<span class="badge">{{post.list.length}}</span></h4>
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="item in _list" :key="item.id" v-if="post.list.length">
                <app-card :post="item"></app-card>
            </swiper-slide>
        </swiper>
        <div v-if="!post.list.length">
            <no-data></no-data>
        </div>
        <div v-if="!post.isDivier" class="line-divider"></div>
    </div>
</template>
<script>
import AppCard from '@/utils/AppCard'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    props: ['post'],
    name: 'AppSwiper',
    components: {
        AppCard,
        swiper,
        swiperSlide
    },
    computed: {
        _list: function() {
            var arr = [];
            for (var i = 0; i < this.post.list.length; i++) {
                this.post.list[i].pictype = this.post.pictype;
                arr.push(this.post.list[i]);
            }
            return arr;
        }
    },
    data() {
        return {
            swiperOption: {
                slidesPerView: 'auto',
                spaceBetween: 8,
            }
        }
    },
}

</script>
<style scoped>
.h4 {
    font-size: 16px;
    font-weight: normal;
    position: relative;
    margin-bottom: 12px;
}

.h4 .badge {
    padding: 2px 6px;
    background: #00c5dc;
    color: #fff;
    margin-left: 12px;
    height: 12px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 3px;
    line-height: 10px;
    font-size: 12px;
}

.line-divider {
    height: 1px;
    width: 100%;
    margin: 12px auto;
    background: #ededed;
}

.swiper-slide {
    width: 60%;
    padding: 2px;
}

</style>
