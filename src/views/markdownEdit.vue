<template>
    <div class="markdown">
        <el-scrollbar>
            <div class="markdown-title">
                <span style="padding-left: 15px; width: 14%">请输入文章标题：</span>
                <div style="width: 50%">
                    <el-input
                        v-model="textTitle"
                        placeholder="请输入文章标题"
                        type="text"
                        clearable
                    ></el-input>
                </div>
            </div>
            <div class="markdown-edit">
                <v-md-editor 
                    :disabled-menus="[]"
                    v-model="text"
                    height="63vh" 
                    @save="saveText"
                    @upload-image="handleUploadImage"
                >
                </v-md-editor>
            </div>
        </el-scrollbar>
    </div>
</template>
<script lang="ts">
/* eslint-disable */
import { defineComponent } from 'vue'
import { axiosPost } from '@/utils/util'
import { RESP_CODE, AXIOS_RES } from '@/config/config'
import { ElMessage } from 'element-plus'

interface QUERY_OBJ{
    mdId: number;
    content: string;
    title: string;
}
export default defineComponent({
    data(){
        return {
            text: '',
            textTitle: '',
            type: 'add',   //判断是新增还是修改
            mdId: 0,   //修改时要上送的文章ID
        }
    },
    methods:{
        saveText(content: string){
            if(!this.textTitle){
                ElMessage.error("请输入文章标题！");
                return;
            }
            if(this.type === 'add'){
                axiosPost('/manage/save', { title: this.textTitle, content }).then((res: AXIOS_RES) => {
                    if(res.data.code === RESP_CODE.SUCCESS){
                        ElMessage.success("文章保存成功！");
                    }else{
                        ElMessage.error("文章保存失败！");
                    }
                    //console.log(res);
                })
            }else{
                axiosPost('/manage/modify', { title: this.textTitle, content, mdId: Number(this.mdId) }).then((res: AXIOS_RES) => {
                    if(res.data.code === RESP_CODE.SUCCESS){
                        ElMessage.success("文章修改成功！");
                        this.$router.push('/markdown/list');
                    }else{
                        ElMessage.error("文章修改失败！");
                    }
                    //console.log(res);
                })
            }
        },
        handleUploadImage(event: any, insertImage: any, files: any){
            let formData = new FormData();
            if(!files[0].name){
                ElMessage.error("请上传图片！");
                return;
            }
            formData.append("file", files[0]);
            axiosPost('/upload', formData).then((res: AXIOS_RES) => {
                if(res.data.code === RESP_CODE.SUCCESS){
                    insertImage({
                        url: process.env.NODE_ENV === 'development' ? ('http://localhost:3000/' + res.data.data.url) : ('http://106.12.71.142:3000/' + res.data.data.url),
                        desc: res.data.data.name,
                        height: '450px'
                    });
                }else{
                    ElMessage.error("上传图片失败");
                }
            })
        }
    },
    created(){
        if(this.$route.query.mdId){
            this.type = 'modify';
            let route: QUERY_OBJ = this.$route.query as any;
            this.mdId = route.mdId;
            this.text = route.content;
            this.textTitle = route.title;
        }else{
            this.type = 'add';
        }
    }
})
</script>
<style lang="less" scoped>
.markdown{
    &-title{
        background: #fff; 
        padding: 20px; 
        display: flex;
        align-items: center;
        border-radius: 5px;
        margin-bottom: 20px;
    }
}
</style>
