<template>
    <div class="left">
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="left-menu"
            default-active="2"
            text-color="#fff"
            @open="handleOpen"
            @close="handleClose"
        >
            <el-sub-menu index="1">
                <template #title>
                    <i class="el-icon-location"></i>
                    <span>Navigator One</span>
                </template>
                <el-menu-item-group title="Group One">
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item one</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title>item four</template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
        </el-menu>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { constantRoutes } from '../router'

export default defineComponent({});
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
