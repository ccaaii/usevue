<template>
    <div class="card" :class="'type' + post.pictype">
        <span class="name">{{(post.buildname||'') + '#' + (post.floornum||'') + 'L'}}</span>
        <strong>{{post.roomnum}}</strong>
        <span class="isopen" :class="post.facilitystatus == '1' ? 'on' : ''"></span>
        <span class="isfinger" :class="post.fingerprint == '1' ? 'on' : ''"></span>
        <span class="isTel on"></span>
        <span class="type">{{post.buildtype}}</span>
        <span class="more">{{post.buildename}}</span>
    </div>
</template>
<script>
export default {
    props: ['post'],
}

</script>
<style scoped>
.card {
    position: relative;
    text-align: center;
    height: 120px;
    font-size: 12px;
    color: #9c9c9c;
    border-radius: 3px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
}

.card.type {
    background: url(../assets/center/house.png) 0 center no-repeat;
    background-size: 70px;
}

.card.type2 {
    background: url(../assets/center/house_dorm.png) 0 0 no-repeat;
    background-size: 70px;
}

.card.type3 {
    background: url(../assets/center/house_temp.png) 0 0 no-repeat;
    background-size: 70px;
}

.card>span {
    position: absolute;
}
.card strong {
    line-height: 120px;
    font-size: 22px;
    font-weight: normal;
    color: #555;
}
.card span.name{
    left: 8px;
    top: 3px;
    font-size: 12px;
}
.card span.isopen{
    width: 16px;
    height: 20px;
    right: 6px;
    top: 0;
    background: url('../assets/center/lock.png') 0 0 no-repeat;
    background-size: 16px;
}
.card span.isopen.on{
    background: url('../assets/center/lock_on.png') 0 0 no-repeat;
    background-size: 16px;
}
.card span.isfinger{
    width: 12px;
    height: 20px;
    right: 6px;
    bottom: 52px;
    background: url('../assets/center/finger.png') 0 0 no-repeat;
    background-size: 12px;
}
.card span.isfinger.on{
    background: url('../assets/center/finger_on.png') 0 0 no-repeat;
    background-size: 12px;
}
.card span.isTel{
    width: 12px;
    height: 20px;
    right: 6px;
    bottom: 32px;
    background: url('../assets/center/tel.png') 0 0 no-repeat;
    background-size: 12px;

}
.card span.isTel.on{
    background: url('../assets/center/tel_on.png') 0 0 no-repeat;
    background-size: 12px;

}
.card span.type{
    right: 6px;
    bottom: 16px;
}
.card span.more{
    right: 6px;
    bottom: 1px;
}

</style>
