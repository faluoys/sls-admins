<template>
    <div class="home">
        <el-dialog v-model="dialogFormVisible" title="新增用户" center draggable
                   close-on-click-modal>
            <el-form :model="userForm">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="userForm.uName" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="userForm.uPwd" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="userForm.uTel" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="部门" :label-width="formLabelWidth">
                    <el-select v-model="dName"
                               filterable
                               placeholder="选择部门"
                    >
                        <el-option
                            v-for="(item,index) in deptList"
                            :key="item.dId"
                            :label="item.dName"
                            :value="item.dName"
                            @click="handleCommand(item.dId)"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select v-model="rName"
                               filterable
                               placeholder="选择角色"
                    >
                        <el-option
                            v-for="(item,index) in rolesList"
                            :key="item.rId"
                            :label="item.rName"
                            :value="item.rName"
                            @click="handleCommand1(item.rId)"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="用户权限" :label-width="formLabelWidth">
                    <div>
                        <el-checkbox-group v-model="checkedArrAdd" @change="addChecked">
                            <el-checkbox
                                v-for="(item,index) in navList"
                                :key="item.nId"
                                :label="item.nId"
                                size="large">
                                {{ item.nName }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
<!--                <el-button @click="dialogFormVisible = false">取消</el-button>-->
                <el-button type="primary" @click="addUsers">
                  确认
                </el-button>
              </span>
            </template>
        </el-dialog>


        <el-dialog v-model="FormVisible" title="修改用户" center draggable
                   close-on-click-modal>
            <el-form :model="userForm">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="userForm.uName" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="userForm.uPwd" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="userForm.uTel" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="部门" :label-width="formLabelWidth">
                    <el-select v-model="dName"
                               filterable
                               placeholder="选择部门"
                    >
                        <el-option
                            v-for="(item,index) in deptList"
                            :key="item.dId"
                            :label="item.dName"
                            :value="item.dName"
                            @click="handleCommand(item.dId)"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select v-model="rName"
                               filterable
                               placeholder="选择角色"
                    >
                        <el-option
                            v-for="(item,index) in rolesList"
                            :key="item.rId"
                            :label="item.rName"
                            :value="item.rName"
                            @click="handleCommand1(item.rId)"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="用户权限" :label-width="formLabelWidth">
                    <div>
                        <el-checkbox-group v-model="checkedArrUp" @change="upChecked">
                            <el-checkbox
                                v-for="(item,index) in navList"
                                :key="item.nId"
                                :label="item.nId"
                                size="large">
                                {{ item.nName }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
<!--                <el-button @click="FormVisible = false">取消</el-button>-->
                <el-button type="primary" @click="upUsers">
                  保存
                </el-button>
              </span>
            </template>
        </el-dialog>


        <div class="right">
            <div class="text">
                <span class="pl-1" style="color: grey">首页</span> /
                <span class="pl-2" style="font-weight: 700">员工管理</span>
                <div class="pt-3" style="font-size: 18px; font-weight: 700">员工管理</div>
            </div>
            <div class="top">
                <!-- Form -->
                <el-button class="dia" type="primary" @click="dialogFormVisible = true">
                    新增员工
                </el-button>
            </div>

            <div class="bottom">
                <el-table :data="tableData"
                          stripe
                          scrollbar-always-on
                          setScrollLeft
                          :default-sort="{ prop: 'nId', order: 'descending' }"
                          style="width: 100%;height: 500px">
                    <el-table-column prop="uId" label="ID"/>
                    <el-table-column fixed prop="uName" label="用户名称"/>
                    <el-table-column prop="dName" label="用户部门"/>
                    <el-table-column prop="rName" label="用户角色"/>
                    <el-table-column prop="uTel" label="联系方式"/>
                    <el-table-column prop="uPower" label="用户权限"/>
                    <!--                    <el-table-column fixed="right" label="Operations" width="170">-->
                    <el-table-column align="center" label="操作" width="170">
                        <template #default="scope">
                            <el-button
                                round
                                type="primary"
                                @click="handleEdit(scope.row, scope.row.uId)"
                            >修改
                            </el-button>
                            <el-button
                                round
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row.uId)"
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
import {ref, reactive, computed, onMounted, watch, watchEffect} from 'vue'
import {allUsers, addUser, oneUser, upUser, delUser} from '@/api/users.js'
import {allNav} from '@/api/navs.js'
import {allRoles} from '@/api/roles.js'
import {allDept} from '@/api/dept.js'
import {useStore} from '@/store/user.js'

const store = useStore();
const dialogFormVisible = ref(false)
const FormVisible = ref(false)
const formLabelWidth = '240px'

const checkedArrAdd = ref([]);
const checkedArrUp = ref([]);

const Page = ref();
const navList = ref([])
const rolesList = ref([])
const deptList = ref([])

const rName = ref('')
const dName = ref('')

import {ElMessage} from 'element-plus';

const tableData = ref([]);
const userForm = reactive({
    uName: "",
    uPwd: "",
    uTel: "",
    uId: "",
    dId: "",
    rId: "",
    uPower: "",
})

const handleCommand = (dId) => {
    console.log(dId);
    userForm.dId = dId;
}

const handleCommand1 = (rId) => {
    console.log(rId);
    userForm.rId = rId;
}

const addChecked = (val) => {
    // rolesForm.rPower = checkedArrAdd.value.toString();
    userForm.uPower = val.toString()
    // console.log(1,checkedArrAdd.value)
    console.log(3, val.toString())
}

const upChecked = (val) => {
    // rolesForm.rPower = checkedArrUp.value.toString();
    userForm.uPower = val.toString()
    console.log(2, val.toString())
}

const getPage = (page) => {
    allUsers({page: page}).then((res) => {
        tableData.value = res;
        // console.log(6,page)
        // console.log(5,res)
    });
};
const init = () => {
    //获取菜单
    allNav().then(res => {
        navList.value = res
        // console.log(1, res)
    })

    //获取部门
    allDept().then(res => {
        // console.log(2, res)
        deptList.value = res
    })

    //获取角色
    allRoles().then(res => {
        // console.log(3, res)
        rolesList.value = res
    })

    allUsers({page: 1}).then(res => {
        // console.log(4, res)
        tableData.value = res
    })

}

const kong = () => {
    userForm.uName = '';
    userForm.uPwd = '';
    userForm.uTel = '';
    userForm.dId = '';
    userForm.rId = '';
    userForm.uPower = '';
    rName.value = ''
    dName.value = ''
    checkedArrAdd.value = [];
    checkedArrUp.value = [];
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
const addUsers = () => {
    addUser(userForm).then(res => {
        console.log(res)
        ElMessage.success('添加成功')
        dialogFormVisible.value = false
        kong()
        init()
    })

}

//修改
const handleEdit = (row, uId) => {
    // console.log(88,row)
    oneUser({uId}).then(res => {
        console.log(11, res)
        FormVisible.value = true
        userForm.uName = res.uName
        userForm.uPwd = res.uPwd
        userForm.uTel = res.uTel
        userForm.uId = res.uId
        userForm.dId = res.dId
        userForm.rId = res.rId
        userForm.uPower = res.uPower.split(',')
        checkedArrUp.value = userForm.uPower
        // let aa = rolesList.value
        // let cc = res.rId
        rName.value = row.rName
        dName.value = row.dName
        // console.log(row, nId)
        // NId.value = nId
    })
}

const upUsers = () => {
    upUser({
        uName: userForm.uName,
        uPwd: userForm.uPwd,
        uTel: userForm.uTel,
        uId: userForm.uId,
        dId: userForm.dId,
        rId: userForm.rId,
        uPower: checkedArrUp.value.toString()
    }).then(res => {
        console.log(res)
        console.log(userForm)
        FormVisible.value = false
        ElMessage.success('修改成功')
        init()
        kong()
    })
}

// //删除
const handleDelete = (index, uId) => {
    // console.log(index, row)
    console.log(uId)
    delUser({uId}).then(res => {
        console.log(res)
        ElMessage.success('删除成功')
        init()
    })
}


</script>


<style lang="less" scoped>

</style>