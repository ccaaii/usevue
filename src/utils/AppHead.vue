<template>
	<div>
		<div class="head-portrait">
            <img class="logo" :src="headPortrait">
            <div class="name">{{name}}</div>
            <p class="number" v-if="post.number">( {{number}} )</p>
            <div class="finger" :class="isFinger"></div>
            <div class="faceid" :class="isFaceid"></div>
        </div>
        <div class="head-info">
            <p class="other">
                <span>{{sex}}</span>
                <span>{{identity}}</span>
            </p>
            <p class="unit"><span>{{classinfo}}</span></p>
        </div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
	export default{
		props:['post'],
		computed: {
			headPortrait: function(){
				return this.$store.state.userinfo.imgs ? (this.imgUrl + this.$store.state.userinfo.imgs) : this.faceDefault
			},
            sex: function(){
                return this.$store.state.userinfo.sex == '1' ? '男' : this.$store.state.userinfo.sex == '2' ? '女' : '保密'
            },
            identity: function(){
                return this.$store.state.userinfo.type == '1' ? (this.$store.state.userinfo.gradeStr + '级学生') : ('教师')
            },
            classinfo: function(){
                return (this.$store.state.userinfo.academy || '') + ' - ' + (this.$store.state.userinfo.specialty || '') + ' - ' + (this.$store.state.userinfo.classstr || '')
            },
            isFinger: function(){
                return this.$store.state.userinfo.fingerprint ? 'on' : 'off'
            },
            isFaceid: function(){
                return this.$store.state.userinfo.faceimg ? 'on' : 'off'
            },
			...mapState({
				name: state => state.userinfo.username,
				number: state => state.userinfo.idnum,
			})
		}
	}
</script>

<style scoped>
.head-portrait {
    background: #fff url('../assets/center/bg.png') 0 0 no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    text-align: center;
    padding: 136px 0 0px;
    position: relative;
}
.finger,
.faceid{
    position: absolute;
    top: 28px;
    width: 20px;
    height: 20px;
}
.finger{
    right: 44px;
    background: url('../assets/center/icon_zhiwen_off.png') 0 0 no-repeat;
    background-size: 20px;
}
.finger.on{
    background: url('../assets/center/icon_zhiwen_on.png') 0 0 no-repeat;
    background-size: 20px;
}
.faceid{
    right: 12px;
    background: url('../assets/center/icon_faceid_off.png') 0 1px no-repeat;
    background-size: 18px;
}
.faceid.on{
    background: url('../assets/center/icon_faceid_on.png') 0 1px no-repeat;
    background-size: 18px;
}
.name {
    font-size: 16px;
}
.logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #fafafa;
}
.number{
    color: #a9a9a9;
    font-size:12px;
}

.head-info{
    background: #fff;
    padding-bottom: 10px;
}
.head-info p{
    padding: 0 0 3px 35px;
    color: #3a3a3a;
    font-size: 13px;
}
.head-info p.other{
    background: url('../assets/center/man.png') 12px 4px no-repeat;
    background-size: 14px 13px;
}
.head-info p.unit{
    background: url('../assets/center/info.png') 12px 6px no-repeat;
    background-size: 14px;
}
</style>