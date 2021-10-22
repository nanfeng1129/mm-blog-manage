<template>
    <div class="login">
        <div class="login-canvas"><canvas></canvas></div>
        <div class="login-form">
            <el-form :rules="rules" ref="form" :model="form" label-width="120px" class="login-form-item">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="form.userName" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" clearable type="password"></el-input>
                </el-form-item>
                <el-form-item class="login-form-item-button">
                    <el-button type="primary" @click="onSubmit" class="button-login">登录</el-button>
                    <el-button @click="resetForm('form')" class="button-reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import { defineComponent, } from 'vue'
import { axiosPost,  } from '../utils/util.ts'
import { RESP_CODE } from '../config/config.ts'
import { mapActions } from 'vuex';
import { ElMessage } from 'element-plus'

export default defineComponent({
    data(){
        return {
            form: {
                userName: '',
                password: '',
            },
            rules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            url: '/manage/login'
        }
    },
    created(){
        // axiosPost('/', { userName: 'ljw', password: '123' }).then(res => {
        //     console.log('查看接口：', res);
        // })
        // axiosGet('/port', { userName: 'ljw', password: '123' }).then(res => {
        //     console.log('查看接口：', res);
        // })
        // axiosGet('/manage', { userName: 'ljw', password: '123' }).then(res => {
        //     console.log('查看接口：', res);
        // });
        // axiosPost('/manage/login/', {userName: 'lijw2', password: 'Ljw1129@'}).then(res => {
        //     console.log(res);
        // })
    },
    mounted(){
        document.addEventListener('touchmove', function(e) {
            e.preventDefault()
        })

        var c = document.getElementsByTagName('canvas')[0],
        pr = window.devicePixelRatio || 1,
        w = window.screen.width,
        h = window.screen.height,
        //f = 90,
        f = 120,
        q,
        r = 0,
        u = Math.PI * 1.5,
        v = Math.cos,
        z = Math.random

        var x = c.getContext('2d');
        c.width = w * pr
        c.height = h * pr
        x.scale(pr, pr)
        x.globalAlpha = 0.6

        function i() {
        x.clearRect(0, 0, w, h)
        q = [{ x: 0, y: h * .9 + f }, { x: 0, y: h * .3 - f }]
        while (q[1].x < w + f) d(q[0], q[1])
        }

        function d(i, j) {
        x.beginPath()
        x.moveTo(i.x, i.y)
        x.lineTo(j.x, j.y)
        //var k = j.x + (z() * 2 - 0.25) * f,
        var k = j.x + (z() * 2.3 - 0.3) * f,
            n = y(j.y)
        x.lineTo(k, n)
        x.closePath()
        r -= u / -50
        x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
        x.fill()
        q[0] = q[1]
        q[1] = { x: k, y: n }
        }

        function y(p) {
        //var t = p + (z() * 2 - 1.1) * f
        var t = p + (z() * 3 - 1.7) * f
        return (t > h || t < 0) ? y(p) : t
        }

        document.onclick = i
        document.ontouchstart = i
        i()
    },
    updated(){
        console.log('查看缩放页面是否会触发updated周期');
    },
    methods:{
        ...mapActions({
            setToken: 'login/setToken'
        }),
        resetForm(){
            this.$refs.form.resetFields();
        },
        onSubmit(){
            this.$refs.form.validate((valid) => {
                if (valid) {
                    axiosPost(this.url, { ...this.form }).then(res => {
                        if(res.data.code === RESP_CODE.SUCCESS){
                            this.$store.dispatch('login/setToken', res.data.data.token);
                            //this.setToken(res.data.data.token);
                            this.$router.push('/');
                        }else{
                            ElMessage.error(res.data.message);
                            //console.log("查看是否到else！")
                        }
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    },
    setup(){
    }
})
</script>
<style lang="less" scoped>
.login{
    //background: #eee;  blog-back
    background: #2f2f35;
    /* background: rgba(12, 100, 129, 0) fixed;
    //background-image: url(https://images.cnblogs.com/cnblogs_com/ymbcc/1987640/o_2106150232134.jpg);
    background-image: url('../assets/background.jpg');
    background-size: 100%;
    background-repeat: no-repeat; */
    width: 100%;
    height: 100vh;
    position: relative;
    &-canvas{
        position: fixed;
        width: 100%;
        height: 100%;
    }
    &-form{
        min-width: 400px;
        //height: 200px;
        z-index: 1000;
        text-align: center;
        //background: rgba(0, 0, 0,);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-60%, -50%);
        &-item{
            width: 100%;
            user-select: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            &-button{
                .button-login{
                    width: 48%;
                    position: absolute;
                    left: 0px;
                }
                .button-reset{
                    width: 48%;
                    position: absolute;
                    right: 0px;
                }
            }
        }
    }
}
</style>
