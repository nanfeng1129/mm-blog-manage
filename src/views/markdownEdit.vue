<template>
    <div class="markdown">
        <el-scrollbar>
            <div class="markdown-title">
                <el-row>
                    <el-col :span="7">
                        <div><span style="padding-left: 15px">请输入文章标题：</span></div>
                        <div>
                            <el-input
                                v-model="textTitle"
                                placeholder="请输入文章标题"
                                type="text"
                                clearable
                            ></el-input>
                        </div>
                    </el-col>
                    <el-col :span="7" class="right">
                        <div><span style="padding-left: 15px">请输入文章类别：</span></div>
                        <div>
                            <el-input
                                v-model="textClassify"
                                placeholder="请输入文章类别"
                                type="text"
                                clearable
                            ></el-input>
                        </div>
                    </el-col>
                    <el-col :span="7" class="right">
                        <div><span style="padding-left: 15px">请输入文章标签：</span></div>
                        <div>
                            <el-input
                                v-model="textTag"
                                placeholder="空格分离标签名"
                                type="text"
                                clearable
                            ></el-input>
                        </div>
                    </el-col>
                </el-row>
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
    classification : string;
    tag: string;
}
type Text_Type = undefined | string;
export default defineComponent({
    data(){
        return {
            textClassify: '',
            textTag: '',
            text: '',
            textTitle: '',
            type: 'add',   //判断是新增还是修改
            mdId: 0,   //修改时要上送的文章ID
        }
    },
    methods:{
        saveText(content: string){
            if(!this.textTitle || !this.textClassify || !this.textTag){
                ElMessage.error("文章标题 & 分类 & 标签均为必输！");
                return;
            }
            if(this.type === 'add'){
                axiosPost('/manage/save', { title: this.textTitle, content, tag: this.textTag, classification: this.textClassify }).then((res: AXIOS_RES) => {
                    if(res.data.code === RESP_CODE.SUCCESS){
                        ElMessage.success("文章保存成功！");
                    }else{
                        ElMessage.error("文章保存失败！");
                    }
                    //console.log(res);
                })
            }else{
                axiosPost('/manage/modify', { title: this.textTitle, content, mdId: Number(this.mdId), tag: this.textTag, classification: this.textClassify }).then((res: AXIOS_RES) => {
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
            this.textClassify = route.classification;
            this.textTag = route.tag;
        }else{
            this.type = 'add';
        }
    }
})
</script>
<style lang="less" scoped>
.markdown{
    &-title{
        overflow: hidden;
        //width: 100%;
        background: #fff; 
        padding: 20px; 
        //display: flex;
        //align-items: center;
        border-radius: 5px;
        margin-bottom: 20px;
        font-size: 14px;
        .right{
            padding-left: 20px;
        }
    }
}
</style>
