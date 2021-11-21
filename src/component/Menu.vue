<template>
    <div class="left">
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="left-menu"
            :default-active="index"
            text-color="#fff"
        >
            <div v-for="(route, index) in menuList" :key="route.path">
                <el-sub-menu v-if="route.children && route.children.length > 1" :index="index + ''">
                    <template #title>
                        <!-- <i class="el-icon-location"></i> -->
                        <span>{{route.meta.title}}</span>
                    </template>
                    <el-menu-item 
                        v-for="(childRoute, childIndex) in route.children" 
                        :key="route.path + '/' + childRoute.path" 
                        :index="index + '-' + childIndex"
                        @click.capture ="menuJump(route.path + '/' + childRoute.path)"
                    >
                        {{childRoute.meta.title}}
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else-if="route.children.length === 1" :index="index + ''" @click.capture ="menuJump(route.path)">
                    {{route.children[0].meta.title}}
                </el-menu-item>
                <!-- <el-menu-item v-else :index="route.path" @click.capture ="menuJump(route.path + '/' + childRoute.path)">
                    {{route.meta.title}}
                </el-menu-item> -->
            </div>
        </el-menu>
    </div>
</template>
<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import { constantRoutes } from '../router'

export default defineComponent({
    data(){
        return {
            constantRoutes,
            menuList: [] as any[],
            index: '0',
        }
    },
    created(){
        constantRoutes.forEach((item: any) => {
            if(!item.meta.hidden || !item.meta.hasOwnProperty('hidden')){
                this.menuList.push(item);
            }
        })
        this.setActiveIndex(this.$route.path);
    },
    methods:{
        menuJump(path: string){
            //console.log("查看点击参数：", el)
            this.$router.push(path);
        },
        setActiveIndex(path: string){
            this.menuList.map((item: any, index: number) => {
                if(item.children.length === 1){
                    if(item.children[0].path){
                        if(path === (item.path + '/' + item.children[0].path)){
                            this.index = index + ''
                        }
                    }else{
                        if(path === item.path){
                            this.index = index + ''
                        }
                    }
                }else{
                    item.children.map((child: any, childIndex: number) => {
                        if(path === (item.path + '/' + child.path)){
                            this.index = index + '-' + childIndex
                        }
                    })
                }
            })
        }
    },
    watch:{
        $route: {
            handler({ path }){
                this.setActiveIndex(path);
            },
            deep: true
        }
    }
});
</script>
<style lang="less" scoped>
.left {
    position: fixed;
    width: 18%;
    min-width: 200px;
    height: 100vh;
    &-menu {
        height: 100vh;
        overflow: auto;
        &::-webkit-scrollbar {
            // width: 1px;
            // height: 1px;
            width: 0px;
            height: 0px;
        }
    }
}
</style>
