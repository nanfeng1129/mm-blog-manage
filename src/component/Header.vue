<template>
    <div class="header">
        <div class="header-right">
            <div class="header-right-time">{{time}}</div>
            <el-dropdown trigger="click">
                <span class="header-right-avatar">
                    <el-avatar size="medium" :src="avatarPic"></el-avatar><!-- <i class="el-icon-caret-bottom"></i> -->
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item >退出登录</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
            
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import avatarPic from '../assets/avatar.jpg'
export default defineComponent({
    data(){
        return {
            time: '',
            avatarPic,
        }
    },
    created(){
        //let date = new Date();
        //console.log(date.getFullYear());
        setInterval(() => {
            let date = new Date();
            let year = date.getFullYear() + '';
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let min = date.getMinutes();
            let sec = date.getSeconds();
            this.time = year + '-' + this.fillZero(month) + '-' + this.fillZero(day) + ' ' + this.fillZero(hour) + ':' + this.fillZero(min) + ':' + this.fillZero(sec);
        }, 1000)
    },
    methods:{
        fillZero(num: number){
            let str: string;
            if(num < 10){
                str = '0' + num;
            }else{
                str = '' + num;
            }
            return str;
        }
    }
})
</script>
<style lang="less" scoped>
.header{
    display: flex;
    width: 100%;
    height: 8vh;
    min-height: 30px;
    //background: #eee;
    align-items: center;
    justify-content: flex-end;
    &-right{
        display: flex;
        justify-content: flex-end;
        margin-right: 20px;
        align-items: center;
        &-time{
            margin-right: 10px;
        }
        &-avatar{
            cursor: pointer;
        }
    }
}
</style>
