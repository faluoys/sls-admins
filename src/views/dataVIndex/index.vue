<template>
  <div class="content bg">
    <dv-full-screen-container>
      <div class="dataV">
        <div class="header" style="flex: 0 1 100%">
          <img style="width: 100%;margin-top: -11px" src="@/assets/img/top.png" alt="">
          <div class="title-top">数据资产管理平台</div>
        </div>
      </div>
      <div class="time">
        <img src="~@/assets/img/time.png" alt="">
        <div style="color: #fff;display: flex">
          <div>{{ dates }}</div>
          <div class="tm">{{ time }}</div>
        </div>
      </div>
      <div class="nav">
        <div class="dataV">
          <div style="flex: 0 1 25%;margin-right: 10px">
            <div class="navs_item" style="width: 100%;">
              <h1>
                <img src="@/assets/img/lichen.png" alt="">
                <span>数据资产</span>
              </h1>
              <div class="juxing" style="color: #ffdd03">
                <transition-group>
                  <span v-for="(item, index) in dataFm.assetsData" :key="index">{{ item }}</span>
                </transition-group>
              </div>
            </div>
          </div>
          <div style="flex: 0 1 25%;margin-right: 10px">
            <div class="navs_item" style="width: 100%;">
              <h1>
                <img src="@/assets/img/lichen.png" alt="">
                <span>涉及元数据</span>
              </h1>
              <div class="juxing" style="color: #00e0fc">
                <transition-group>
                  <span v-for="(item, index) in dataFm.metaData" :key="index">{{ item }}</span>
                </transition-group>
              </div>
            </div>
          </div>
          <div style="flex: 0 1 25%;margin-right: 10px">
            <div class="navs_item" style="width: 100%;">
              <h1>
                <img src="@/assets/img/lichen.png" alt="">
                <span>涉及表</span>
              </h1>
              <div class="juxing" style="color: #7eff94">
                <transition-group>
                  <span v-for="(item, index) in dataFm.table" :key="index">{{ item }}</span>
                </transition-group>
              </div>
            </div>
          </div>
          <div style="flex: 0 1 25%">
            <div class="navs_item" style="width: 100%;">
              <h1>
                <img src="@/assets/img/lichen.png" alt="">
                <span>存储量</span>
              </h1>
              <div class="juxing" style="color: #fc6900">
                <transition-group>
                  <span v-for="(item, index) in dataFm.storage" :key="index">{{ item }}</span>
                </transition-group>
              </div>
            </div>
          </div>
        </div>
        <div class="dataV">
          <div class="navx_item" style="flex: 0 1 25%;margin-right: 10px">
            <div style="width: 100%;height: 650px;">
              <div class="item" style="margin-bottom: 10px">
                <h1>
                  <img src="@/assets/img/lichen.png" alt="">
                  <span>数据类目数据量</span>
                </h1>
                <div class="text">
                  <div class="text-item">
                    <span>36</span>
                    <span>市场主体</span>
                    <span></span>
                  </div>
                  <div class="text-item">
                    <span style="color: #23be72">47</span>
                    <span>自然用户</span>
                    <span style="background-color: #23be72"></span>
                  </div>
                  <div class="text-item">
                    <span style="color: #f9da4f">45</span>
                    <span>学校</span>
                    <span style="background-color: #f9da4f"></span>
                  </div>
                  <div class="text-item">
                    <span style="color: #7d5afb">49</span>
                    <span>学生</span>
                    <span style="background-color: #7d5afb"></span>
                  </div>
                </div>
                <bingtu></bingtu>
              </div>
              <div class="item">
                <h1>
                  <img src="@/assets/img/lichen.png" alt="">
                  <span>数据更新记录</span>
                </h1>
                <zhutu></zhutu>
              </div>
            </div>
          </div>
          <div class="navx_item" style="flex: 0 1 75%;">
            <h1>
              <img src="@/assets/img/lichen.png" alt="">
              <span>数据源</span>
            </h1>
            <div class="tu" style="width: 100%;height:650px;">
              <div class="tu-item" v-for="item in 10">
                <svgTu></svgTu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script setup>
import SvgTu from '@/views/dataVIndex/svg.vue'
import {onMounted, ref, reactive, onUnmounted} from 'vue'
import Zhutu from '@/views/dataVIndex/zhutu.vue'
import Bingtu from '@/views/dataVIndex/bingtu.vue'

const dates = ref(null)
const time = ref(null)
const timer = ref(null)
const getNum = ref(null)
const getTime = () => {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  dates.value = `${year}年${month}月${day}日`
  time.value = `${hour}:${minute}:${second}`
}

function randomSixDigits() {
  let num = ''
  // for (let i = 0; i < 6; i++) {
  //     num += Math.floor(Math.random() * 10)
  // }
  while (num.length < 6) {
    num += Math.floor(Math.random() * 9) + 1
  }
  return Number(num)
}

const dataFm = reactive({
  assetsData: '',
  metaData: '',
  storage: '',
  table: '',
})

const numXun = () => {
  dataFm.assetsData = randomSixDigits().toString().split('')
  dataFm.metaData = randomSixDigits().toString().split('')
  dataFm.storage = randomSixDigits().toString().split('')
  dataFm.table = randomSixDigits().toString().split('')
}
//
// const getData = async () => {
//     const res = await getDataIndex()
//     dataFm.assetsData = res.data.assetsData.toString().split('')
//     data.metaData = res.data.metaData.toString().split('')
//     data.storage = res.data.storage.toString().split('')
//     data.table = res.data.table.toString().split('')
// }

onMounted(() => {
  getTime()
  numXun();
  timer.value = setInterval(getTime, 1000)
  getNum.value = setInterval(numXun, 8000)
})
onUnmounted(() => {
  clearInterval(timer.value)
  clearInterval(getNum.value)
})
</script>

<style lang="less" scoped>
@font-face {
  font-family: electronicFont;
  src: url(@/assets/font/DS-DIGIT-4.ttf);
  font-display: swap;  /* 增大 timeout */
}

.content {
  width: 100%;
  height: 100vh;
  background: #021536;
}

.bg {
  background: url("@/assets/img/bg.png") no-repeat center center;
  background-size: cover;
}

.dataV {
  display: flex;
  justify-content: space-between;
}

.header {
  width: 100%;
  height: 58px;
  position: relative;
}

.title-top {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: #ffffff;
  font-size: 25px;
  /* 增加字符间隔 */
  letter-spacing: 5px;
  font-family: "Copperplate Gothic", "Palatino Linotype",
  Georgia, Calibri, "Times New Roman", Helvetica, sans-serif;
}

.time {
  //width: 250px;
  height: 28px;
  position: absolute;
  left: 29px;
  top: 45px;
  display: flex;
  align-items: center;
  opacity: 1;
  font-family: 苹方;
  font-size: 18px;
  font-weight: normal;
  line-height: 28px;
  letter-spacing: 0px;

  img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  .tm {
    margin-left: 5px;
    font-family: electronicFont;
    font-size: 25px;
  }
}

.nav {
  width: 100%;
  height: 100%;
  padding: 29px 29px 37px;
}

.navs_item {
  height: 147px;
  opacity: 1;
  background: #021536;
  box-sizing: border-box;
  border: 1px solid rgba(45, 204, 255, 0.13);
}

.juxing {
  height: 117px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
}

.juxing span {
  font-family: electronicFont;
  font-size: 48px;
  text-align: center;
  font-weight: normal;
  letter-spacing: 0px;
  display: inline-block;
  width: calc(100% / 6);
  height: 60px;
  line-height: 60px;
  margin-right: 10px;
  border-radius: 5.02px;
  opacity: 1;
  background: #052557;
  box-sizing: border-box;
  border: 0.84px solid rgba(45, 204, 255, 0.25);
  box-shadow: 0px 3.34px 8.36px 0px rgba(0, 0, 0, 0.3);
}


h1 {
  color: #ffffff;
  display: flex;
  align-items: center;
  height: 30px;
  opacity: 0.9;
  background: linear-gradient(90deg, #032A5E 2%, #072156 100%);
  font-family: 思源黑体;
  margin-bottom: 0;

  img {
    width: 15.22px;
    height: 15.22px;
    margin: 0 16px;
  }

  span {
    font-size: 18px;
    font-weight: bold;
    line-height: 30px;
    letter-spacing: 0px;
    opacity: 1;
    text-shadow: 0px 2.49px 4.67px 0px rgba(0, 80, 203, 0.61);
  }
}

.item {
  height: 320px;
  flex: 0 1 50%;
  width: 100%;
  opacity: 1;
  background: #021536;
  box-sizing: border-box;
  border: 1px solid rgba(45, 204, 255, 0.13);
}

.text {
  margin: 0 20px;
  //width: 100%;
  height: 70px;
  display: flex;
  margin-top: 11px;
  padding: 0 20px;
  justify-content: space-around;
  border-radius: 5.02px;
  opacity: 1;
  background: #021536;
  box-sizing: border-box;
  border: 0.84px solid rgba(45, 204, 255, 0.15);
  box-shadow: 0px 3.34px 8.36px 0px rgba(0, 0, 0, 0.3);

  .text-item {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    //padding: 11px 30px;

    span {
      opacity: 1;
      font-family: Gotham-Bold-Bold;
      font-size: 18px;
      font-weight: normal;
      line-height: 16px;
      text-align: center;
      letter-spacing: 0px;
    }

    span:nth-child(1) {
      color: #00d1c8;
    }

    span {
      font-family: 思源黑体 CN;
      color: rgba(255, 255, 255, 0.7);
    }

    span:nth-child(3) {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #00d1c8;
      margin: 0 auto;
    }
  }
}

.navx_item {
  margin-top: 8px;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 1;
  background: #021536;
  box-sizing: border-box;
  border: 1px solid rgba(45, 204, 255, 0.13);
}

.navx_item:nth-child(1) {
  margin-right: 10px;
}

.tu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 45px 5px 30px 5px;

  .tu-item {
    flex: 0 1 calc(100% / 6);
    height: 119px;
    //margin: 0 1px;
    opacity: 1;
  }
}

.tu .tu-item:nth-of-type(n + 6) {
  margin-top: 240px;
}
</style>
