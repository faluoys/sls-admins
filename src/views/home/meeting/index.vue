<template>
    <div class="home">
        <el-dialog v-model="dialogFormVisible" title="新增会议" center draggable
                   close-on-click-modal>
            <el-form :model="officeForm">
                <el-form-item label="会议室" :label-width="formLabelWidth">
                    <el-input v-model="officeForm.oNum" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="会议室名称" :label-width="formLabelWidth">
                    <el-input v-model="officeForm.oName" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="会议室电话" :label-width="formLabelWidth">
                    <el-input v-model="officeForm.oTel" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="会议室信息" :label-width="formLabelWidth">
                    <el-input v-model="officeForm.oInfo" autocomplete="off"/>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
<!--                <el-button @click="dialogFormVisible = false">取消</el-button>-->
                <el-button type="primary" @click="addOffices">
                  确认
                </el-button>
              </span>
            </template>
        </el-dialog>


        <el-dialog v-model="FormVisible" title="修改会议" center draggable
                   close-on-click-modal>
            <el-form :model="officeForm">
                <el-form :model="officeForm">
                    <el-form-item label="会议室" :label-width="formLabelWidth">
                        <el-input v-model="officeForm.oNum" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="会议室名称" :label-width="formLabelWidth">
                        <el-input v-model="officeForm.oName" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="会议室电话" :label-width="formLabelWidth">
                        <el-input v-model="officeForm.oTel" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="会议室信息" :label-width="formLabelWidth">
                        <el-input v-model="officeForm.oInfo" autocomplete="off"/>
                    </el-form-item>
                </el-form>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
<!--                <el-button @click="FormVisible = false">取消</el-button>-->
                <el-button type="primary" @click="upOffices">
                  保存
                </el-button>
              </span>
            </template>
        </el-dialog>

        <div class="right">
            <div class="text">
                <span class="pl-1" style="color: grey">首页</span> /
                <span class="pl-2" style="font-weight: 700">会议管理</span>
                <div class="pt-3" style="font-size: 18px; font-weight: 700">会议管理</div>
            </div>
            <div class="top">
                <!-- Form -->
                <el-button class="dia" type="primary" @click="dialogFormVisible = true">
                    新增会议
                </el-button>
                <el-button
                    class="dia"
                    @click="goMeeting"
                    color="#626aef"
                    plain
                >
                    会议室申请
                </el-button>
            </div>

            <div class="bottom">
                <el-table :data="tableData"
                          stripe
                          scrollbar-always-on
                          setScrollLeft
                          :default-sort="{ prop: 'nId', order: 'descending' }"
                          style="width: 100%;height: 500px">
                    <el-table-column prop="oId" label="ID"/>
                    <el-table-column fixed prop="oName" label="会议名称"/>
                    <el-table-column prop="oNum" label="会议室"/>
                    <el-table-column prop="oTel" label="会议号码"/>
                    <el-table-column prop="oInfo" label="会议介绍"/>

                    <el-table-column align="center" label="操作" width="170">
                        <template #default="scope">
                            <el-button
                                round
                                type="primary"
                                @click="handleEdit(scope.row, scope.row.oId)"
                            >修改
                            </el-button>
                            <el-button
                                round
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row.oId)"
                            >删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    v-model:current-page="Page"
                    background
                    :page-size="20"
                    :pager-count="11"
                    layout="prev, pager, next"
                    :total="300"
                    style="margin-top: 10px;justify-content: center"
                    @current-change="getPage"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted, watchEffect} from 'vue'
import {allOffice, delOffice, addOffice, oneOffice, upOffice} from '@/api/meeting.js'
// import {useStore} from '@/store/user.js'
// const store = useStore();
const dialogFormVisible = ref(false)
const FormVisible = ref(false)
const formLabelWidth = '240px'

const Page = ref();

import {ElMessage} from 'element-plus';
import router from '@/router/index.js'

const tableData = ref([]);
const officeForm = reactive({
    oId: "",
    oName: "",
    oNum: "",
    oTel: "",
    uId: "",
    uIds: "",
    oInfo: "",
})


const getPage = (page) => {
    allOffice({page: page}).then((res) => {
        tableData.value = res;
        console.log(6, page)
        console.log(5, res)
    });
};
const init = () => {

    allOffice({page: 1}).then(res => {
        console.log(4, res)
        tableData.value = res
    })

}

const goMeeting = () => {
    router.push('/home/checkOffice')
}

const kong = () => {
    officeForm.oName = '';
    officeForm.oNum = '';
    officeForm.oTel = '';
    // officeForm.uId = '';
    // officeForm.uIds = '';
    officeForm.oInfo = '';
}

onMounted(() => {
    init();
    kong()
})
watchEffect(() => {
    if (dialogFormVisible.value === false && FormVisible.value === false) {
        kong()
    }
})

//添加
const addOffices = () => {
    addOffice(officeForm).then(res => {
        console.log(res)
        ElMessage.success('添加成功')
        dialogFormVisible.value = false
        kong()
        init()
    })

}

//修改
const handleEdit = (row, oId) => {
    oneOffice({oId}).then(res => {
        console.log(11, res)
        FormVisible.value = true
        officeForm.oId = res.oId
        officeForm.oName = res.oName
        officeForm.oNum = res.oNum
        officeForm.oTel = res.oTel
        officeForm.oInfo = res.oInfo
        // officeForm.uId = res.uId
        // officeForm.uIds = res.uIds
    })
}

const upOffices = () => {
    upOffice({
        oNum: officeForm.oNum,
        oName: officeForm.oName,
        oTel: officeForm.oTel,
        // uId: form.uId,
        // uIds: form.uIds,
        oInfo: officeForm.oInfo,
        oId: officeForm.oId,
    }).then(res => {
        console.log(res)
        console.log(officeForm)
        FormVisible.value = false
        ElMessage.success('修改成功')
        init()
        kong()
    })
}

//删除
const handleDelete = (index, oId) => {
    // console.log(index, row)
    console.log(oId)
    delOffice({oId}).then(res => {
        console.log(res)
        ElMessage.success('删除成功')
        init()
    })
}


</script>


<style lang="less" scoped>

</style>