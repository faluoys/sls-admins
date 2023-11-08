<template>
    <div class="nav-top">
        <div class="coll" @click="IsCollapse">
            <div v-if="isCollapse">
                <el-icon>
                    <Expand/>
                </el-icon>
            </div>
            <div v-else>
                <el-icon>
                    <Fold/>
                </el-icon>
            </div>
        </div>
        <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
                <el-avatar style="margin-right: 10px" :size="35" :src="avatar" />
                <span>{{ store.$state.userInfo_store.uName || "" }}</span>
                <el-icon class="el-icon--right"><CaretBottom /></el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="mine">个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
    <!--    <el-header class="nav-top">-->
    <!--        -->
    <!--    </el-header>-->
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from '@/store/user.js'
const store = useStore();
const router = useRouter();
const avatar = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const isCollapse = ref(false)
const emit = defineEmits(["IsCollapse"]);
const IsCollapse = () => {
    isCollapse.value = isCollapse.value === false;
    emit('IsCollapse', isCollapse.value)
}

const handleCommand = (command) => {
    if (command === 'logout') {
        localStorage.clear();
        router.push('/login');
    }
}

</script>

<style lang="less" scoped>
:deep(.el-dropdown) {
    margin-right: 10px;
}
:deep(.el-dropdown-link) {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #FFFFFF;
    font-size: 20px;

    .el-icon--right {
        margin-left: 5px;
    }
}


.nav-top {
    height: 56px;
    width: 100%;
    background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .coll {
        height: 100%;
        width: 50px;
        color: #fff;
        font-size: 30px;
    }

}
</style>
