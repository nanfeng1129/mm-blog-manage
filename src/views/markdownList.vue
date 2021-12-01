<template>
    <div class="markdown">
        <el-scrollbar>
            <div class="markdown-title">
                <el-row>
                    <el-col :span="6">
                        <div class="markdown-title-col">
                            <span style="width: 19%; font-size: 14px">标题：</span>
                            <div style="width: 75%">
                                <el-input
                                    v-model="formData.title"
                                    placeholder="请输入文章标题"
                                    type="text"
                                    :clearable="true"
                                ></el-input>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="markdown-title-col">
                            <span style="width: 19%; font-size: 14px">创建时间：</span>
                            <div style="width: 75%">
                                <el-date-picker
                                    v-model="formData.create_time"
                                    type="daterange"
                                    value-format="YYYY-MM-DD"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    :shortcuts="shortcuts"
                                >
                                </el-date-picker>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="markdown-title-col">
                            <span style="width: 19%; font-size: 14px">更新时间：</span>
                            <div style="width: 75%">
                                <el-date-picker
                                    v-model="formData.update_time"
                                    type="daterange"
                                    value-format="YYYY-MM-DD"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    :shortcuts="shortcuts"
                                >
                                </el-date-picker>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <div class="markdown-title-col">
                            <el-button type="primary" plain class="markdown-title-col-button" @click="queryData()">查询</el-button>
                        </div>
                    </el-col>
                </el-row>
                
            </div>
            <div class="markdown-table">
                <div>
                    <el-table :data="textData" border style="width: 100%">
                        <el-table-column prop="mdId" label="文章编号" align="center"/>
                        <el-table-column prop="title" label="文章标题" align="center"/>
                        <el-table-column prop="tag" label="文章标签" align="center"/>
                        <el-table-column prop="classification" label="文章分类" align="center"/>
                        <el-table-column prop="create_time" label="创建时间" align="center"/>
                        <el-table-column prop="update_time" label="更新时间" align="center"/>
                        <el-table-column label="操作" align="center">
                            <template #default="scope">
                                <el-button type="text" @click="handleChange(scope.row)">编辑</el-button>
                                <el-popconfirm
                                    confirm-button-type="text"
                                    confirm-button-text="确认"
                                    cancel-button-text="取消"
                                    icon="el-icon-info"
                                    icon-color="red"
                                    title="确认删除该文章吗？(此操作不可逆！)"
                                    @confirm="handleDelete(scope.row)"
                                >
                                    <template #reference>
                                        <el-button type="text">删除</el-button>
                                    </template>
                                </el-popconfirm>
                                <!-- <el-button  @click="handleDelete(scope.row)">删除</el-button> -->
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="markdown-table-pagination">
                    <!-- 因为table组件中多了一个1px的border，所以这里也加一个1px的border保持样式统一 -->
                    <div style="border: 1px solid #ebeef5; border-top: 0px">
                        <el-pagination
                            v-model:current-page="pagination.current"
                            :page-size="pagination.pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="pagination.total"
                            @current-change="handleCurrentChange"
                        >
                        </el-pagination>
                    </div>
                    
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { axiosPost } from '@/utils/util'
import { RESP_CODE, AXIOS_RES } from '@/config/config'
import { ElMessage } from 'element-plus'

interface TABLE_ROW {
    mdId: number;
    title: string;
    content: string;
    create_time: string;
    update_time: string;
    classification: string;
    tag: string;
}

interface PARAMS {
    pageNo: number;
    pageSize: number;
    title?: string;
    create_time_start?: string;
    create_time_end?: string;
    update_time_start?: string;
    update_time_end?: string;
}

export default defineComponent({
    data(){
        return {
            textData: [],
            params: {
                pageNo: 1,
                pageSize: 10
            },
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0
            },
            formData: {
                title: '',
                create_time: [],
                update_time: [],
            },
            shortcuts: [
                {
                    text: 'Last week',
                    value: () => {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                        return [start, end]
                    },
                },
                {
                    text: 'Last month',
                    value: () => {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                        return [start, end]
                    },
                },
            ],
            data: {},
        }
    },
    methods:{
        queryData(){
            let params: PARAMS = {
                ...this.params,
            };
            if(this.formData.title){
                params.title = this.formData.title
            }
            if(this.formData.create_time && this.formData.create_time.length){
                params.create_time_start = this.formData.create_time[0] + ' 00:00:00';
                params.create_time_end = this.formData.create_time[1] + ' 23:59:59';
            }
            if(this.formData.update_time && this.formData.update_time.length){
                params.update_time_start = this.formData.update_time[0] + ' 00:00:00';
                params.update_time_end = this.formData.update_time[1] + ' 23:59:59';
            }
            this.data = params;
            this.getData(params);
        },
        handleCurrentChange(current: number){
            let params: PARAMS = {
                ...this.data,
                ...this.params,
                pageNo: current
            }
            this.getData(params);
        },
        handleChange(row: TABLE_ROW){
            // axiosPost('/manage/modify', { mdId: row.mdId }).then((res: AXIOS_RES) => {
            //     if(res.data.code === RESP_CODE.SUCCESS){
            //         ElMessage.success('')
            //     }
            // })
            this.$router.push({ path: '/markdown/edit', query: { mdId: row.mdId, title: row.title, content: row.content, classification: row.classification, tag: row.tag } })
            //console.log("查看行数据:", row);
        },
        handleDelete(row: TABLE_ROW){
            axiosPost('/manage/delete', { mdId: row.mdId }).then((res: AXIOS_RES) => {
                if(res.data.code === RESP_CODE.SUCCESS){
                    ElMessage.success('删除成功');
                    this.getData({ ...this.data, ...this.params })
                }else{
                    ElMessage.error('删除失败');
                }
            })
            
        },
        getData(params: PARAMS){
            axiosPost('/manage/textQuery', params).then((res: AXIOS_RES) => {
                if(res.data.code === RESP_CODE.SUCCESS){
                    this.textData = res.data.data.dataList;
                    this.pagination.total = res.data.data.total;
                }else{
                    this.textData = [];
                    this.pagination.total = 0;
                }
            })
        }
    },
    created(){
        this.getData(this.params);
    }
})
</script>
<style lang="less" scoped>
.markdown{
    min-height: 560px;
    &-title{
        background: #fff; 
        padding: 20px; 
        // display: flex;
        // align-items: center;
        border-radius: 5px;
        margin-bottom: 20px;
        &-col{
            width: 100%;
            display: flex;
            align-items: center;
            height: 100%;
            &-button{
                width: 100%;
            }
        }
    }
    &-table{
        border-radius: 8px;
        // height: 63vh;
        // min-height: 300px;
        overflow: auto;
        background: #fff;
        &-pagination{
            text-align: right;
        }
    }
}
</style>
