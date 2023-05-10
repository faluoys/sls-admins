<template>
    <el-menu
        :default-active="route.path"
        active-text-color="#ffd04b"
        background-color="#304156"
        text-color="#fff"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :router="true"

    >
        <el-menu-item index="/index">
            <el-icon>
                <HomeFilled/>
            </el-icon>
            <template #title>首页</template>
        </el-menu-item>
        <!--        v-for="(item,index) in navList"-->
        <!--        :key="item.nId"-->
        <!--        @click="turnPage(item.nUrl)"-->
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <Setting/>
                </el-icon>
                <span>系统管理</span>
            </template>
<!--            <el-menu-item-group>-->
<!--                &lt;!&ndash;                    <template #title><span>Group One</span></template>&ndash;&gt;-->
<!--                <el-menu-item index="1-1">item one</el-menu-item>-->
<!--                <el-menu-item index="1-2">item two</el-menu-item>-->
<!--            </el-menu-item-group>-->
            <!--                <el-menu-item-group title="Group Two">-->
<!--            <el-menu-item index="1-3">item three</el-menu-item>-->
            <el-menu-item index="/home/users">
                <el-icon>
                    <UserFilled/>
                </el-icon>
                <template #title>员工管理</template>
            </el-menu-item>
            <el-menu-item index="/home/navs">
                <el-icon>
                    <document/>
                </el-icon>
                <template #title>菜单管理</template>
            </el-menu-item>
            <el-menu-item index="/home/roles">
                <el-icon>
                    <UserFilled/>
                </el-icon>
                <template #title>角色管理</template>
            </el-menu-item>
            <el-menu-item index="/home/dept">
                <el-icon>
                    <icon-menu/>
                </el-icon>
                <template #title>部门管理</template>
            </el-menu-item>
            <el-menu-item index="/home/sonCom">
                <!--                disabled-->
                <el-icon>
                    <Link/>
                </el-icon>
                <template #title>子公司管理</template>
            </el-menu-item>
            <!--        <el-menu-item index="/scComProduct">-->
            <!--            &lt;!&ndash;                disabled&ndash;&gt;-->
            <!--            <el-icon>-->
            <!--                <document/>-->
            <!--            </el-icon>-->
            <!--            <template #title>产品管理</template>-->
            <!--        </el-menu-item>-->
            <el-menu-item index="/home/meeting">
                <!--                disabled-->
                <el-icon>
                    <Menu/>
                </el-icon>
                <template #title>会议管理</template>
            </el-menu-item>
            <!--                </el-menu-item-group>-->
<!--            <el-sub-menu index="1-4">-->
<!--                <template #title><span>item four</span></template>-->
<!--                <el-menu-item index="1-4-1">item one</el-menu-item>-->
<!--            </el-sub-menu>-->
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
import { useRoute,useRouter } from 'vue-router'
import {
    Document,
    Menu as IconMenu,
    UserFilled,
    Setting,
    HomeFilled
} from '@element-plus/icons-vue'
import {ref,onMounted} from 'vue'
import {getPowerNav} from '@/api/auth.js'
const navList = ref([])
const props = defineProps({
    isCollapse: {
        type: Boolean,
        default: true,
    }
})

// const isCollapse = ref(false)

const navListUrl = ref([])

const route = useRoute()
const router = useRouter()



const turnPage = (item) => {

    let arr = item.split("/");
    console.log(1111,arr[0])
    router.push({name: arr[0]});
}

const str = localStorage.getItem('userPower');

onMounted(() => {
    getPowerNav({str: str}).then(res => {
        // console.log(11,res)
        navList.value = res;
        navListUrl.value = res.nUrl;
        // console.log(22,res.nUrl)
        // console.log(33,navList.value)
        // console.log(44,navListUrl.value)
    })
})
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
}
.el-menu {
    border: 0!important;
}
.el-menu-vertical-demo {
    height: 100%;
}
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>