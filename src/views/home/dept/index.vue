<template>
    <div class="home">
        <el-dialog v-model="dialogFormVisible" title="新增菜单" center
                   close-on-click-modal>
            <el-form :model="deptForm">
                <el-form-item label="部门名称" :label-width="formLabelWidth">
                    <el-input v-model="deptForm.dName" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="部门人数" :label-width="formLabelWidth">
                    <el-input v-model="deptForm.dCount" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="部门地址" :label-width="formLabelWidth">
                    <el-input v-model="deptForm.dAddr" autocomplete="off"/>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
<!--                <el-button @click="dialogFormVisible = false">取消</el-button>-->
                <el-button type="primary" @click="addDepts">
                  确认
                </el-button>
              </span>
            </template>
        </el-dialog>


        <el-dialog v-model="FormVisible" title="新增菜单" center
                   close-on-click-modal>
            <el-form :model="deptForm">
                <el-form-item label="部门名称" :label-width="formLabelWidth">
                    <el-input v-model="deptForm.dName" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="部门人数" :label-width="formLabelWidth">
                    <el-input v-model="deptForm.dCount" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="部门地址" :label-width="formLabelWidth">
                    <el-input v-model="deptForm.dAddr" autocomplete="off"/>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
<!--                <el-button @click="FormVisible = false">取消</el-button>-->
                <el-button type="primary" @click="upDept">
                  保存
                </el-button>
              </span>
            </template>
        </el-dialog>

        <div class="right">
            <div class="text">
                <span class="pl-1" style="color: grey">首页</span> /
                <span class="pl-2" style="font-weight: 700">部门管理</span>
                <div class="pt-3" style="font-size: 18px; font-weight: 700">部门管理</div>
            </div>
            <div class="top">
                <!-- Form -->
                <el-button class="dia" type="primary" @click="dialogFormVisible = true">
                    新增部门
                </el-button>
            </div>

            <div class="bottom">
                <el-table :data="tableData"
                          stripe
                          scrollbar-always-on
                          setScrollLeft
                          :default-sort="{ prop: 'dId', order: 'descending' }"
                          style="width: 100%;">
                    <el-table-column label="Id" prop="dId"/>
                    <el-table-column label="部门名称" prop="dName"/>
                    <el-table-column label="部门人数" prop="dCount"/>
                    <el-table-column label="部门地址" prop="dAddr"/>
                    <el-table-column align="center" label="操作" width="170">
                        <template #default="scope">
                            <el-button
                                round
                                type="primary"
                                @click="handleEdit(scope.row, scope.row.dId)"
                            >修改
                            </el-button>
                            <el-button
                                round
                                type="danger"
                                @click="handleDelete(scope.row, scope.row.dId)"
                            >删除
                            </el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, computed, onMounted, watchEffect} from 'vue'
import {allDept, addDept, delDept, updateDept, oneDept} from '@/api/dept.js'

const FormVisible = ref(false)
const dialogFormVisible = ref(false)

const formLabelWidth = '240px'

import {ElMessage} from 'element-plus';

const tableData = ref([]);
const deptForm = reactive({
    dName: '',
    dCount: '',
    dAddr: '',
    uId: 1,
    dId: ''
})

const init = () => {
    allDept().then(res => {
        // console.log(res)
        tableData.value = res
        // console.log(tableData)
    })
}
onMounted(() => {
    init();
})

const kong = () => {
    // deptForm.uId = ''
    deptForm.dAddr = ''
    deptForm.dCount = ''
    deptForm.dName = ''
}
watchEffect(() => {
    if (dialogFormVisible.value === false && FormVisible.value === false) {
        kong()
    }
})
//添加
const addDepts = () => {
    addDept(deptForm).then(res => {
        console.log(res)
        ElMessage.success('添加成功')
        // deptForm.uId = ''
        deptForm.dAddr = ''
        deptForm.dCount = ''
        deptForm.dName = ''
        dialogFormVisible.value = false
        init()
    })

}

//修改
const handleEdit = (row, dId) => {
    oneDept({dId}).then(res => {
        console.log(11, res)
        FormVisible.value = true
        deptForm.uId = res.uId
        deptForm.dName = res.dName
        deptForm.dCount = res.dCount
        deptForm.dAddr = res.dAddr
        deptForm.dId = res.dId
        // console.log(row,dId)
        // DId.value = dId
    })
}

const upDept = () => {
    updateDept({
        dId: deptForm.dId,
        dName: deptForm.dName,
        dCount: deptForm.dCount,
        dAddr: deptForm.dAddr,
        uId: deptForm.uId
    }).then(res => {
        console.log(res)
        FormVisible.value = false
        ElMessage.success('修改成功')
        init()
    })
}

//删除
const handleDelete = (row, dId) => {
    // console.log(row)
    console.log(dId)
    delDept({dId}).then(res => {
        console.log(res)
        ElMessage.success('删除成功')
        init()
    })
}

</script>


<style lang="less" scoped>

</style>
