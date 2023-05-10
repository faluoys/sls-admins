<template>
    <div class="home">
        <div class="left">
            <che-nar :isCollapse="isCollapse"/>
        </div>

        <div class="right">
            <div class="nav-top">

                <nar-top @IsCollapse="IsCollapse"/>

            </div>
            <div>
                <router-view name="home"></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import NarTop from '@/components/navtop/NavTop.vue'
import CheNar from '@/components/che-bar/CheNar.vue'
import {ref} from 'vue'

const isCollapse = ref(false)
const IsCollapse = (e) => {
    // console.log(111,e)
    isCollapse.value = e
}
</script>


<style lang="less" scoped>

</style>