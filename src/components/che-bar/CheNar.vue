<template>
  <el-menu
      :default-active="route.path"
      active-text-color="#ef862c"
      background-color="#006a64"
      text-color="#fff"
      popper-append-to-body
      :unique-opened="true"
      dark:text-white
      dark:bg-hex-1b1b1f
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :router="true"

  >
    <el-menu-item index="/home/index">
      <el-icon>
        <HomeFilled/>
      </el-icon>
      <template #title>首页</template>
    </el-menu-item>
    <el-menu-item index="/dataVIndex">
      <el-icon>
        <House/>
      </el-icon>
      <template #title>可视化首页</template>
    </el-menu-item>
    <el-menu-item index="/logreg">
      <el-icon>
        <HelpFilled/>
      </el-icon>
      <template #title>logreg</template>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <Setting/>
        </el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item
          dark:text-white
          dark:bg-hex-1b1b1f
          v-for="item in navList"
          :key="item.nId"
          :index="'/home/' + item.nUrl.split('/')[0]"
      >
        <el-icon>
          <component :is="item.iconClass"/>
        </el-icon>
        <template #title>{{ item.nName }}</template>
      </el-menu-item>

      <!--            <el-menu-item index="/users">-->
      <!--                <el-icon>-->
      <!--                    <UserFilled/>-->
      <!--                </el-icon>-->
      <!--                <template #title>员工管理</template>-->
      <!--            </el-menu-item>-->
      <!--            <el-menu-item index="/navs">-->
      <!--                <el-icon>-->
      <!--                    <document/>-->
      <!--                </el-icon>-->
      <!--                <template #title>菜单管理</template>-->
      <!--            </el-menu-item>-->
      <!--            <el-menu-item index="/roles">-->
      <!--                <el-icon>-->
      <!--                    <UserFilled/>-->
      <!--                </el-icon>-->
      <!--                <template #title>角色管理</template>-->
      <!--            </el-menu-item>-->
      <!--            <el-menu-item index="/dept">-->
      <!--                <el-icon>-->
      <!--                    <icon-menu/>-->
      <!--                </el-icon>-->
      <!--                <template #title>部门管理</template>-->
      <!--            </el-menu-item>-->
      <!--            <el-menu-item index="/sonCom">-->
      <!--                &lt;!&ndash;                disabled&ndash;&gt;-->
      <!--                <el-icon>-->
      <!--                    <Link/>-->
      <!--                </el-icon>-->
      <!--                <template #title>子公司管理</template>-->
      <!--            </el-menu-item>-->
      <!--            <el-menu-item index="/meeting">-->
      <!--                &lt;!&ndash;                disabled&ndash;&gt;-->
      <!--                <el-icon>-->
      <!--                    <Menu/>-->
      <!--                </el-icon>-->
      <!--                <template #title>会议管理</template>-->
      <!--            </el-menu-item>-->
    </el-sub-menu>

    <!--        <el-menu-item >-->
    <!--            <el-icon>-->
    <!--                <HomeFilled/>-->
    <!--            </el-icon>-->
    <!--            <template #title>{{ item.nName }}</template>-->
    <!--        </el-menu-item>-->

  </el-menu>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'
import {HelpFilled, HomeFilled, Menu, Operation, Setting, UserFilled} from '@element-plus/icons-vue'
import {onMounted, ref, reactive} from 'vue'
import {getPowerNav} from '@/api/auth.js'

const navList = ref([])
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: true,
  }
})

const navListUrl = ref([])

const route = useRoute()
const router = useRouter()
const turnPage = (item) => {

  let arr = item.split("/");
  console.log(1111, arr[0])
  router.push({name: arr[0]});
}

const str = localStorage.getItem('userPower');
onMounted(() => {
  navList.value = JSON.parse(localStorage.getItem('powerNav'))
  // console.log(navList,111)
  // const iconMapping = {
  //     1: UserFilled,
  //     2: Operation,
  //     3: Menu,
  //     4: HelpFilled,
  //     5: HelpFilled,
  //     6: HelpFilled,
  //     7: HelpFilled,
  //     8: HelpFilled,
  //     9: HelpFilled,
  //     // 添加更多映射
  // };
  // //使用 map 方法创建一个新的数组，根据映射表设置每个对象的 iconClass 属性
  // //映射表，将菜单项的nId映射到相应的图标类名
  // navList.value = navList.value.map(item => {
  //     // 查找映射表，如果找到映射，使用映射的图标类名，否则使用默认值
  //     item.iconClass = iconMapping[item.nId] || '';
  //     return item;
  // });
  // getPowerNav({str: str}).then(res => {
  //     console.log(11, res)
  //     navListUrl.value = res[0].nUrl.split('/')[0];
  //     console.log(22, res.nUrl)
  //     console.log(33, navList.value)
  //     console.log(44, navListUrl.value)
  // })
})
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}

.el-menu {
  border: 0 !important;
}

.el-menu-vertical-demo {
  height: 100%;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
