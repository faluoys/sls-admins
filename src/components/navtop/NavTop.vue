<template>
    <div class="nav-top" dark:text-white dark:bg-hex-1b1b1f>
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
        <div class="right-top">
            <div text-25 m5 inline-flex justify-right gap-3>
                <i
                    class="icon"
                    title="切换主题"
                    @click="toggleTheme"
                    icon-btn dark:i-carbon-sun i-carbon-moon
                />
                <a
                    class="icon"
                    icon-btn i-carbon-logo-github
                    href="https://github.com/faluoys"
                    target="_blank"
                    title="GitHub"
                />
            </div>
            <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
                <el-avatar style="margin-right: 10px" :size="35" :src="avatar" title="头像"/>
                <span>{{ store.$state.userInfo_store.uName || "" }}</span>
                <el-icon class="el-icon--right"><CaretBottom/></el-icon>
            </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="mine">个人中心</el-dropdown-item>
                        <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
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
const toggleTheme = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    let isDark;
    const transition = document.startViewTransition(() => {
        const root = document.documentElement;
        isDark = root.classList.contains('dark');
        // root.classList.remove(isDark ? 'dark' : 'light');
        // root.classList.add(isDark ? 'light' : 'dark');
        root.classList.toggle('dark')
    })

    transition.ready.then(() => {
        const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px`];
        document.documentElement.animate(
            {
                clipPath: isDark ? [...clipPath].reverse() : clipPath
            },
            {
                duration: 500,
                easing: 'ease-in',
                pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
            }
        )
    })
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

</style>
