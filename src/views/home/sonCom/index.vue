<template>
  <div class="home">
    <el-dialog v-model="dialogFormVisible" :title="title" center
               close-on-click-modal>
      <el-form :model="sonComForm">
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="sonComForm.scName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="公司负责人" :label-width="formLabelWidth">
          <el-input v-model="sonComForm.scMan" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="公司电话" :label-width="formLabelWidth">
          <el-input v-model="sonComForm.scTel" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="公司网址" :label-width="formLabelWidth">
          <el-input v-model="sonComForm.scWebUrl" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="管理员" :label-width="formLabelWidth">
          <el-select v-model="uName"
                     filterable
                     placeholder="选择管理员"
          >
            <el-option
                v-for="(item,index) in usersList"
                :key="item.uId"
                :label="item.uName"
                :value="item.uName"
                @click="handleCommand1(item.uId)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="logo" :label-width="formLabelWidth">
          <el-upload
              class="avatar-uploader"
              action="http://localhost:9999/api/getPic.php"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="image.imageUrl" :src="image.imageUrl" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
              <span class="dialog-footer">
<!--                <el-button @click="dialogFormVisible = false">取消</el-button>-->
                <el-button type="primary" @click="addUpSC">
                  确认
                </el-button>
              </span>
      </template>
    </el-dialog>

    <div class="right">
      <div class="text">
        <span class="pl-1" style="color: grey">首页</span> /
        <span class="pl-2" style="font-weight: 700">子公司管理</span>
        <div class="pt-3" style="font-size: 18px; font-weight: 700">子公司管理</div>
      </div>
      <div class="top">
        <!-- Form -->
        <el-button class="dia" type="primary" @click="dialogFormVisible = true,addClick(1)">
          新增公司
        </el-button>
      </div>

      <div class="bottom">
        <el-table :data="tableData"
                  stripe
                  border
                  slot="empty"
                  scrollbar-always-on
                  setScrollLeft
                  :default-sort="{ prop: 'scId', order: 'descending' }" style="width: 100%;height: 500px">
          <el-table-column align="center" width="60" label="序号">
            <template #default="{$index}">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" width="60" label="Id" prop="scId"/>
          <el-table-column align="center" label="公司Logo">
            <template #default="scope">
              <div f-c-c>
                <img :src="'http://localhost:9999/api/img/'+scope.row.scLogo"
                     style="width: 50px; height: 50px; border-radius: 50px;"
                     alt="">
              </div>
              <!--<span>{{'http://localhost:9999/api/img/'+scope.row.scLogo}}</span>-->
            </template>
          </el-table-column>
          <el-table-column align="center" label="名称" prop="scName"/>
          <el-table-column align="center" label="负责人" prop="scMan"/>
          <el-table-column align="center" label="电话" prop="scTel"/>
          <el-table-column align="center" label="网址" prop="scWebUrl"/>

          <el-table-column align="center" label="公司产品" width="150">
            <template #default="scope">
              <el-button
                  plain
                  color="#626aef"
                  @click="goProduct(scope.$index, scope.row)"
              >查看
              </el-button>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="170">
            <template #default="scope">
              <el-button
                  round
                  type="primary"
                  @click="handleEdit(scope.row, scope.row.scId,2)"
              >修改
              </el-button>
              <el-button
                  round
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row.scId)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive, computed, onMounted, watchEffect} from 'vue'
import {allSc, addSc, delSc, upSc, oneSc} from '@/api/sonCom.js'
import {allUsers} from '@/api/users.js'
import {Delete, Download, Plus, ZoomIn} from '@element-plus/icons-vue'

const dialogFormVisible = ref(false)
const formLabelWidth = '240px'

import {ElMessage} from 'element-plus';
import qs from 'qs'
import router from '@/router/index.js'

const tableData = ref([]);
const sonComForm = reactive({
  scName: "",
  scMan: '',
  scTel: '',
  scWebUrl: '',
  uId: '',
  file: '',
  scLogo: ''
})

const usersList = ref([])

const uName = ref('')

const dialogFormIndex = ref()

const title = ref('新增子公司')

const handleCommand1 = (uId) => {
  // console.log(uId)
  sonComForm.uId = uId
}


const init = () => {
  allSc().then(res => {
    // console.log(10101010,res)
    tableData.value = res
    // console.log(tableData)
  })

  allUsers({page: 1}).then(res => {
    // console.log(res)
    usersList.value = res
  })
}


const addClick = index => {
  // console.log(index)
  dialogFormIndex.value = index
}

const addUpSC = () => {
  if (dialogFormIndex.value === 1) {
    addSC()
  } else if (dialogFormIndex.value === 2) {
    upSC()
  }
}
//上传图片限制大小
//图片
const image = reactive({
  imageUrl: '',
  multfileImg: '',
})

const handleAvatarSuccess = (res, file) => {
  image.imageUrl = res
  console.log(666, file)
  console.log(8888, res)
  console.log(999, image.imageUrl)
  let arr = image.imageUrl.split('/')
  // console.log(888,arr[5]);
  sonComForm.file = arr[5]
  sonComForm.scLogo = arr[5]
  // // console.log(777,sonComForm.file);
  // // sonComForm.file = resp
}

const beforeAvatarUpload = (rawFile) => {

  // image.multfileImg = rawFile
  // // console.log(5,rawFile)
  // // console.log(6,image.multfileImg.name);
  // console.log(rawFile.type)
  const type = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
  const picType = type.includes(rawFile.type)
  if (!picType) {
    ElMessage.error('上传的文件必须是JPG、JPEG、PNG、GIF四种之一!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像图片大小不能超过2MB！')
    return false
  }
  return true
}


//添加
const addSC = () => {
  addSc(qs.stringify(sonComForm)).then(res => {
    // console.log(111, res)
    // console.log(222, sonComForm)
    // upPicRef.value.clearFiles()
    ElMessage.success('添加成功')
    dialogFormVisible.value = false
    init()
  })
}


onMounted(() => {
  init();
})
const kong = () => {
  sonComForm.scName = ''
  sonComForm.scMan = ''
  sonComForm.scTel = ''
  sonComForm.scWebUrl = ''
  sonComForm.uId = ''
  sonComForm.file = ''
  sonComForm.scLogo = ''
  uName.value = ''
  image.imageUrl = ''
}
watchEffect(() => {
  if (dialogFormVisible.value === false) {
    kong()
  }
})

//跳转到产品
const goProduct = (index, row) => {
  console.log(row.scId)
  console.log(111, row);
  router.push({name: 'scComProduct', query: {scId: row.scId}})
}


//修改
const handleEdit = (row, scId, index) => {
  dialogFormIndex.value = index
  title.value = '修改子公司'
  // console.log(888,row)
  oneSc({scId}).then(res => {
    // console.log(11, res)
    dialogFormVisible.value = true
    sonComForm.scName = res.scName
    sonComForm.scMan = res.scMan
    sonComForm.scTel = res.scTel
    sonComForm.scWebUrl = res.scWebUrl
    sonComForm.uId = res.uId
    sonComForm.scId = res.scId
    sonComForm.file = res.scLogo
    uName.value = row.uName
    image.imageUrl = 'http://localhost:9999/api/img/' + res.scLogo;

  })
}

const upSC = () => {
  upSc(qs.stringify(sonComForm)).then(res => {
    console.log(1111, res)
    console.log(qs.stringify(sonComForm))
    dialogFormVisible.value = false
    // upPicRef.value.clearFiles()
    ElMessage.success('修改成功')
    init()
  })
}

// //删除
const handleDelete = (index, scId) => {
  // console.log(index, row)
  console.log(scId)
  delSc({scId}).then(res => {
    console.log(res)
    ElMessage.success('删除成功')
    init()
  })
}
</script>


<style lang="less" scoped>

</style>
