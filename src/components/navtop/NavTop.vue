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
    </div>
</template>

<script setup>
import {ref} from 'vue'

const isCollapse = ref(false)
const emit = defineEmits(["IsCollapse"]);
const IsCollapse = () => {
    isCollapse.value = isCollapse.value === false;
    emit('IsCollapse', isCollapse.value)
}

</script>

<style lang="less" scoped>
.nav-top {
    height: 56px;
    width: 100%;
    background-color: #398ebd;

    .coll {
        height: 100%;
        width: 50px;
        text-align: center;
        line-height: 56px;
        color: #fff;
        font-size: 30px;
    }
}
</style>