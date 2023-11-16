<template>
  <div class="home">
    <el-dialog v-model="dialogFormVisible" title="新增菜单" center
               close-on-click-modal>
      <el-form :model="navForm">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="navForm.nName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="菜单等级" :label-width="formLabelWidth">
          <el-input v-model="navForm.nLevel" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="菜单URL" :label-width="formLabelWidth">
          <el-input v-model="navForm.nUrl" autocomplete="off"/>
        </el-form-item>
        <!--                <el-form-item label="Zones" :label-width="formLabelWidth">-->
        <!--                    <el-select v-model="form.region" placeholder="Please select a zone">-->
        <!--                        <el-option label="Zone No.1" value="shanghai"/>-->
        <!--                        <el-option label="Zone No.2" value="beijing"/>-->
        <!--                    </el-select>-->
        <!--                </el-form-item>-->
      </el-form>
      <template #footer>
              <span class="dialog-footer">
<!--                <el-button @click="dialogFormVisible = false">取消</el-button>-->
                <el-button type="primary" @click="addNavs">
                  确认
                </el-button>
              </span>
      </template>
    </el-dialog>


    <el-dialog v-model="FormVisible" title="修改菜单" center
               close-on-click-modal>
      <el-form :model="navForm">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="navForm.nName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="菜单等级" :label-width="formLabelWidth">
          <el-input v-model="navForm.nLevel" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="菜单URL" :label-width="formLabelWidth">
          <el-input v-model="navForm.nUrl" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
              <span class="dialog-footer">
<!--                <el-button @click="FormVisible = false">取消</el-button>-->
                <el-button type="primary" @click="upNavs">
                  保存
                </el-button>
              </span>
      </template>
    </el-dialog>

    <div class="right">
      <div class="text">
        <span class="pl-1" style="color: grey">首页</span> /
        <span class="pl-2" style="font-weight: 700">菜单管理</span>
        <div class="pt-3" style="font-size: 18px; font-weight: 700">菜单管理</div>
      </div>
      <div class="top">
        <!-- Form -->
        <el-button class="dia" type="primary" @click="dialogFormVisible = true">
          新增菜单
        </el-button>
      </div>

      <div class="bottom">
        <el-table :data="tableData"
                  stripe
                  border
                  slot="empty"
                  scrollbar-always-on
                  setScrollLeft
                  :default-sort="{ prop: 'nId', order: 'descending' }" style="width: 100%;height: 500px">
          <el-table-column align="center" width="60" label="序号">
            <template #default="{$index}">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" width="60" label="Id" prop="nId"/>
          <el-table-column align="center" label="菜单名称" prop="nName"/>
          <el-table-column align="center" label="菜单地址" prop="nUrl"/>
          <el-table-column align="center" label="操作" width="170">
            <template #default="scope">
              <el-button
                  round
                  type="primary"
                  @click="handleEdit(scope.row, scope.row.nId)"
              >修改
              </el-button>
              <el-button
                  round
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row.nId)"
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
import {addNav, allNav, delNav, upNav, oneNav} from '@/api/navs.js'
import {useStore} from '@/store/user.js'

const store = useStore();
const dialogFormVisible = ref(false)
const FormVisible = ref(false)
const formLabelWidth = '240px'

import {ElMessage} from 'element-plus';

const tableData = ref([]);
const navForm = reactive({
  nName: '',
  nLevel: '',
  nUrl: '',
})


const init = () => {
  allNav().then(res => {
    // console.log(res)
    tableData.value = res
    console.log(tableData)
  })
}
onMounted(() => {
  init();
})

const kong = () => {
  navForm.nName = ''
  navForm.nLevel = ''
  navForm.nUrl = ''
}
watchEffect(() => {
  if (dialogFormVisible.value === false && FormVisible.value === false) {
    kong()
  }
})
//添加
const addNavs = () => {
  addNav({
    nName: navForm.nName,
    nLevel: navForm.nLevel,
    nUrl: navForm.nUrl
  }).then(res => {
    console.log(res)
    ElMessage.success('添加成功')
    navForm.nName = ''
    navForm.nLevel = ''
    navForm.nUrl = ''
    dialogFormVisible.value = false
    init()
  })

}

//修改
const handleEdit = (row, nId) => {
  oneNav({nId}).then(res => {
    console.log(11, res)
    FormVisible.value = true
    navForm.nName = res.nName
    navForm.nUrl = res.nUrl
    navForm.nLevel = res.nLevel
    navForm.nId = res.nId
  })
}

const upNavs = () => {
  upNav({
    nId: navForm.nId,
    nName: navForm.nName,
    nLevel: navForm.nLevel,
    nUrl: navForm.nUrl
  }).then(res => {
    console.log(res)
    console.log(navForm)
    FormVisible.value = false
    ElMessage.success('修改成功')
    init()
  })
}

//删除
const handleDelete = (index, nId) => {
  // console.log(index, row)
  console.log(nId)
  delNav({nId}).then(res => {
    console.log(res)
    ElMessage.success('删除成功')
    init()
  })
}


</script>


<style lang="less" scoped>

</style>