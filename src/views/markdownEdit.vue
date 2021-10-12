<template>
    <div class="markdown">
        <el-scrollbar>
            <v-md-editor v-model="text" height="calc(84vh - 40px)" @save="saveText"></v-md-editor>
        </el-scrollbar>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data(){
        return {
            text: ''
        }
    },
    methods:{
        saveText(text: string){
            console.log("查看保存的文章：", text)
        }
    }
})
</script>
<style lang="less" scoped>
// .markdown{
//     &::-webkit-scrollbar{
//         width: 0px;
//         height: 0px;
//     }
//     &-edit{
//         &::-webkit-scrollbar{
//             width: 0px;
//             height: 0px;
//         }
//     }
// }
</style>
