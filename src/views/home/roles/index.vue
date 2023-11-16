<template>
  <div class="home">
    <el-dialog v-model="dialogFormVisible" title="新增角色" center
               close-on-click-modal>
      <el-form :model="rolesForm">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="rolesForm.rName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <div>
            <el-checkbox-group v-model="checkedArrAdd" @change="addChecked">
              <el-checkbox
                  v-for="(item,index) in allNavs"
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
                <el-button type="primary" @click="addRole">
                  新增角色
                </el-button>
              </span>
      </template>
    </el-dialog>


    <el-dialog v-model="FormVisible" title="编辑角色" center
               close-on-click-modal>
      <el-form :model="rolesForm">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="rolesForm.rName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <div>
            <el-checkbox-group v-model="checkedArrUp" @change="upChecked">
              <el-checkbox
                  v-for="(item,index) in allNavs"
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
                <el-button type="primary" @click="upRole">
                  修改
                </el-button>
              </span>
      </template>
    </el-dialog>


    <div class="right">

      <div class="text">
        <span class="pl-1" style="color: grey">首页</span> /
        <span class="pl-2" style="font-weight: 700">角色管理</span>
        <div class="pt-3" style="font-size: 18px; font-weight: 700">角色管理</div>
      </div>
      <div class="top">
        <!-- Form -->
        <el-button class="dia" type="primary" @click="dialogFormVisible = true">
          新增角色
        </el-button>
      </div>

      <div class="bottom">
        <el-table :data="tableData"
                  stripe
                  border
                  slot="empty"
                  scrollbar-always-on
                  setScrollLeft
                  :default-sort="{ prop: 'rId', order: 'descending' }" style="width: 100%;height: 500px">
          <el-table-column align="center" width="60" label="序号">
            <template #default="{$index}">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" width="60" label="Id" prop="rId"/>
          <el-table-column align="center" label="角色名称" prop="rName"/>
          <el-table-column align="center" label="角色权限" prop="rPower"/>
          <el-table-column align="center" label="操作" width="170">
            <template #default="scope">
              <el-button
                  round
                  type="primary"
                  @click="handleEdit(scope.row, scope.row.rId)"
              >修改
              </el-button>
              <el-button
                  round
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row.rId)"
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
import {allRoles, addRoles, delRoles, upRoles, oneRoles} from '@/api/roles.js'
import {allNav} from '@/api/navs.js'

const FormVisible = ref(false)
const dialogFormVisible = ref(false)

const formLabelWidth = '240px'

const checkedArrAdd = ref([]);
const checkedArrUp = ref([]);

import {ElMessage} from 'element-plus';

const allNavs = ref([])

const tableData = ref([]);
const rolesForm = reactive({
  rName: '',
  rPower: '',
  rId: "",
})
console.log(rolesForm)

const addChecked = (val) => {
  // rolesForm.rPower = checkedArrAdd.value.toString();
  rolesForm.rPower = val.toString()
  // console.log(1,checkedArrAdd.value)
  console.log(3, val.toString())
}

const upChecked = (val) => {
  // rolesForm.rPower = checkedArrUp.value.toString();
  rolesForm.rPower = val.toString()
  console.log(2, val.toString())
}

const init = () => {
  allRoles().then(res => {
    // console.log(res)
    tableData.value = res
    console.log(tableData)
  })

  allNav().then(res => {
    allNavs.value = res
    // console.log(allNavs.value)
  })
}
onMounted(() => {
  init();
})
const kong = () => {
  rolesForm.rName = ''
  rolesForm.rPower = ''
}

watchEffect(() => {
  if (dialogFormVisible.value === false && FormVisible.value === false) {
    kong()
  }
})

//添加
const addRole = () => {
  addRoles(rolesForm).then(res => {
    console.log(res)
    ElMessage.success('添加成功')
    rolesForm.rName = ''
    rolesForm.rPower = ''
    dialogFormVisible.value = false
    init()
  })
}

//修改
const handleEdit = (row, rId) => {
  oneRoles({rId}).then(res => {
    console.log(11, res)
    FormVisible.value = true
    rolesForm.rName = res.rName
    rolesForm.rPower = res.rPower.split(',')
    rolesForm.rId = res.rId
    // rolesForm.rPower = row.rPower
    checkedArrUp.value = rolesForm.rPower
    console.log(row, rId, rolesForm.rPower)
    // let dept = allNav.value;
    // dept.forEach((item) => {
    //   if (rolesForm.rPower.includes(item.nId)) {
    //     item.checked = true;
    //   } else {
    //     item.checked = false;
    //   }
    // });

    // RId.value = rId
  })
}

const upRole = () => {
  upRoles({
    rId: rolesForm.rId,
    rName: rolesForm.rName,
    rPower: checkedArrUp.value.toString()
  }).then(res => {
    console.log(res)
    FormVisible.value = false
    ElMessage.success('修改成功')
    init()
  })
}

//删除
const handleDelete = (index, rId) => {
  // console.log(index, row)
  console.log(rId)
  delRoles({rId}).then(res => {
    ElMessage.success('删除成功')
    console.log(res)
    init()
  })
}


</script>


<style lang="less" scoped>

</style>