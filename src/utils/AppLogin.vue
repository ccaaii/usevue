<template>
    <div class="loginPage">
        <div class="login-box">
            <div class="account">
                <input type="text" name="account" v-model="account" placeholder="请输入账号">
            </div>
            <div class="password">
                <input type="password" name="password" v-model="password" placeholder="请输入密码" autocomplete="new-password">
            </div>
        </div>
        <button class="loginBtn" @click="login()">登录</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            account: '',
            password: '',
        }
    },
    methods: {
        login() {
            var that = this;
            that.axios({
                url: '/ucenter/core/user/doLoginhnjmAjax',
                params: {
                    username: that.account,
                    password: that.password
                },
                success(res) {
                    that.$store.commit('setToken', res.token);
                    that.getInfo();
                    that.$router.push('/' + that.suffix);
                }
            })
        }
    }
}

</script>
<style scoped>
.loginPage {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #f4f4f4;
}

.login-box {
    width: 96%;
    padding: 0 2%;
    background: #fff;
}

input[type=text],
input[type=password] {
    border: 0;
    width: calc(100% - 30px);
    padding-left: 30px;
    height: 46px;
    line-height: 45px;
    font-size: 15px;
    color: #999;
}

input[type=text] {
    border-bottom: 1px solid #e6e6e6;
    background: url('../assets/login/account.png') 0 center no-repeat;
    -webkit-background-size: 20px;
    background-size: 20px;
}

input[type=password] {
    background: url('../assets/login/pass.png') 0 center no-repeat;
    -webkit-background-size: 20px;
    background-size: 20px;
}

.loginBtn {
    display: block;
    border: none;
    background: #ff6949;
    border-radius: 4px;
    height: 38px;
    width: 96%;
    margin: 30px auto 0;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
}

</style>
