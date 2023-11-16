<template>
  <div class="home">
    <el-dialog v-model="dialogFormVisible" title="新增产品" center
               close-on-click-modal>
      <el-form :model="productForm">
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="productForm.pName" autocomplete="off"/>
        </el-form-item>

        <el-form-item label="产品价格" :label-width="formLabelWidth">
          <el-input v-model="productForm.pPrice" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="产品信息" :label-width="formLabelWidth">
          <el-input v-model="productForm.pInfo" autocomplete="off"/>
        </el-form-item>

        <el-form-item label="产品图片" :label-width="formLabelWidth">
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
                <el-button type="primary" @click="addProducts">
                  确认
                </el-button>
              </span>
      </template>
    </el-dialog>


    <el-dialog v-model="FormVisible" title="产品修改" center
               close-on-click-modal>
      <el-form :model="productForm">
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="productForm.pName" autocomplete="off"/>
        </el-form-item>

        <el-form-item label="产品价格" :label-width="formLabelWidth">
          <el-input v-model="productForm.pPrice" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="产品信息" :label-width="formLabelWidth">
          <el-input v-model="productForm.pInfo" autocomplete="off"/>
        </el-form-item>

        <el-form-item label="产品图片" :label-width="formLabelWidth">
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
<!--                <el-button @click="FormVisible = false">取消</el-button>-->
                <el-button type="primary" @click="upProducts">
                  保存
                </el-button>
              </span>
      </template>
    </el-dialog>


    <div class="right">
      <div class="text">
        <span class="pl-1" style="color: grey">首页</span> /
        <span class="pl-2" style="font-weight: 700">产品管理</span>
        <div class="pt-3" style="font-size: 18px; font-weight: 700">产品管理</div>
      </div>
      <div class="top">
        <!-- Form -->
        <el-button class="dia" type="primary" @click="dialogFormVisible = true">
          新增产品
        </el-button>
      </div>

      <div class="bottom">
        <el-table :data="tableData"
                  stripe
                  border
                  slot="empty"
                  scrollbar-always-on
                  setScrollLeft
                  :default-sort="{ prop: 'scId', order: 'descending' }" style="width: 100%;height: 630px">
          <el-table-column width="60" label="序号">
            <template #default="{$index}">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" width="60" label="Id" prop="pId"/>
          <el-table-column align="center" label="产品图片" prop="pImg">
            <template #default="scope">
              <div f-c-c>
                <img :src="'http://localhost:9999/api/img/'+scope.row.pImg"
                     style="width: 50px; height: 50px;border-radius: 50%" alt="">
              </div>
              <!--                        <span>{{'http://localhost:9999/api/img/'+scope.row.pImg}}</span>-->
            </template>
          </el-table-column>
          <el-table-column align="center" label="产品名称" prop="pName"/>
          <el-table-column align="center" label="产品标识" prop="pFalg"/>
          <el-table-column align="center" label="产品信息" prop="pInfo"/>
          <el-table-column align="center" label="公司Id" prop="scId"/>
          <el-table-column align="center" label="产品价格" prop="pPrice"/>
          <el-table-column align="center" label="操作" width="170">
            <template #default="scope">
              <el-button
                  round
                  type="primary"
                  @click="handleEdit(scope.row, scope.row.pId)"
              >修改
              </el-button>
              <el-button
                  round
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
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
import {useRoute} from 'vue-router'
import {allProduct, addProduct, delProduct, oneProduct, upProduct} from '@/api/scComProduct.js'
import {Delete, Download, Plus, ZoomIn} from '@element-plus/icons-vue'

const route = useRoute()
const scId = route.query.scId;

const dialogFormVisible = ref(false)
const FormVisible = ref(false)
const formLabelWidth = '240px'

import {ElMessage} from 'element-plus';
import qs from 'qs'

const tableData = ref([]);
const productForm = reactive({
  pId: "",
  pName: "",
  pPrice: "",
  pImg: "",
  pInfo: "",
  pFalg: 1,
  scId: scId,
  file: "",
})
console.log(999999, productForm)

const init = () => {
  allProduct({scId: scId}).then(res => {
    // console.log(res)
    tableData.value = res
  })
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
  console.log(888, arr[5]);
  productForm.file = arr[5]
  productForm.pImg = arr[5]
  // console.log(777, productForm.pImg);
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
const addProducts = () => {
  addProduct(qs.stringify(productForm)).then(res => {
    console.log(111, res)
    console.log(222, qs.stringify(productForm))
    ElMessage.success('添加成功')
    dialogFormVisible.value = false
    init()
  })
}


onMounted(() => {
  init();
})
const kong = () => {
  productForm.pId = ''
  productForm.pName = ''
  productForm.pPrice = ''
  productForm.pImg = ''
  productForm.pInfo = ''
  productForm.file = ''
  image.imageUrl = ''
}
watchEffect(() => {
  if (dialogFormVisible.value === false && FormVisible.value === false) {
    kong()
  }
})

//修改
const handleEdit = (row, pId) => {
  console.log(1111, pId)
  oneProduct({pId}).then(res => {
    console.log(11, res)
    FormVisible.value = true
    productForm.pId = res.pId
    productForm.pName = res.pName
    productForm.pPrice = res.pPrice
    productForm.pImg = res.pImg
    productForm.pInfo = res.pInfo
    productForm.file = res.pImg
    image.imageUrl = 'http://localhost:9999/api/img/' + res.pImg;
    // console.log(row, scId)
    // SCId.value = scId
  })
}

const upProducts = () => {
  upProduct(qs.stringify(productForm)).then(res => {
    console.log(res)
    console.log(454854, qs.stringify(productForm))
    FormVisible.value = false
    ElMessage.success('修改成功')
    init()
  })
}

// //删除
const handleDelete = (index, row) => {
  // console.log(index, row)
  delProduct({pId: row.pId}).then(res => {
    console.log(res)
    ElMessage.success('删除成功')
    init()
  })
}
</script>


<style lang="less" scoped>

</style>