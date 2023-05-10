<template>
    <el-form :model="form" label-width="120px" style="margin-top: 20px;">
        <el-form-item label="会议名称">
            <el-input style="width: 300px" v-model="form.name"/>
        </el-form-item>
        <el-form-item label="申请人">
            <el-select v-model="form.uId" placeholder="选择申请人">
                <el-option @click="handlecommond" v-for="(item,index) in options" :key="index.dId" :value="item.uId"
                           :label="item.uName">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="会议日期">
            <el-col :span="11">
                <el-date-picker
                    v-model="form.date1"
                    type="date"
                    placeholder="选择日期"
                    style="width: 100%"
                />
            </el-col>
        </el-form-item>

        <el-form-item label="会议时间">

            <el-col :span="11">
                <el-time-picker
                    v-model="form.date2"
                    placeholder="开始时间"
                    style="width: 100%"
                />
            </el-col>

            <el-col :span="2" class="text-center" style="text-align: center;">
                <span class="text-gray-500">-</span>
            </el-col>

            <el-col :span="11">
                <el-time-picker
                    v-model="form.date3"
                    placeholder="结束时间"
                    style="width: 100%"
                />
            </el-col>

        </el-form-item>


        <el-form-item label="会议地点">
            <el-select v-model="form.oId" placeholder="选择地点">
                <el-option v-for="(item,index) in address" :key="index" :label="item.oNum" :value="item.oNum"/>
            </el-select>
        </el-form-item>

        <!--        提交申请-->
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交申请</el-button>
            <el-button>取消</el-button>
        </el-form-item>

        <!--        已申请的会议室-->
        <el-form-item label="已申请的会议室:" style="margin-top: 70px;">
            <el-button type="primary" @click="flushed">刷新</el-button>
        </el-form-item>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="coId" label="ID" />
            <el-table-column prop="oId" label="会议地点" />
            <el-table-column prop="startTime" label="开始时间" />
            <el-table-column prop="endTime" label="结束时间" />
            <el-table-column prop="status" label="状态" />
        </el-table>
    </el-form>
</template>

<script setup>
import {reactive, onMounted, ref} from "vue";
import {addCheck, allCheckOffice, allOffice} from '@/api/meeting.js'
import {allUsers} from "@/api/users.js";

const form = reactive({
    coId: '',
    oId: '',
    name: '',
    date1: '',
    date2: '',
    date3: '',
    uIdStr: '',
    uId: '',
    dId: '',
    status: '',

});


const tableData = ref([]);

const handlecommond = () => {
    console.log(4, options.value);
};

//渲染
const init = () => {
    console.log(11111);
    allCheckOffice().then((res) => {
        console.log(1, res);
        tableData.value = res;
        clear();
    })
}

onMounted(() => {
    init()
    getAllusers()
    getAllOffice()
});

const flushed = () => {
    init();
};

//清除所有
const clear = () => {
    form.coId = '';
    form.oId = '';
    form.name = '';
    form.date1 = '';
    form.date2 = '';
    form.date3 = '';
    form.uIdStr = '';
    form.uId = '';
    form.dId = '';
    form.status = '';
};

//申请人
const options = ref([]);

//申请地点
const address = ref([]);

//获取所有用户

function getAllusers() {
    allUsers({page: 1}).then((res) => {
        console.log(1, res);
        options.value = res;
        console.log(2, options.value);
    })
}

//获取所有会议室
function getAllOffice() {
    allOffice({page: 1}).then((res) => {
        console.log(1, res);
        address.value = res;
        // console.log(2,address.value);
    })
}

//提交申请
const onSubmit = () => {
    console.log("submit!");
    console.log(5, form);
    addCheck({
        // coName:form.name,
        oId: form.oId,
        startTime: form.date3,
        endTime: form.date2,
        uId: form.uId,
        dId: form.dId,
        uIdStr: form.uIdStr,
        status: 1,
    }).then((res) => {
        console.log(1, res);
        init();
    })
};


</script>

<style>
.form {
    width: 100%;
    height: 100%;
    /*background-color: red;*/
}

</style>