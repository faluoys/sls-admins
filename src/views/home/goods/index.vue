<template>
  <div class="index">
    <div class="text">
      <span class="pl-1" style="color: grey">首页</span> /
      <span class="pl-2" style="font-weight: 700">资产管理</span>
      <div class="pt-3" style="font-size: 18px; font-weight: 700">资产管理</div>
    </div>
    <div class="nav" w-full h-screen overflow-auto px-4>
      <div class="top" mt>
        <div class="card">
          <div class="card2"></div>
        </div>
        <el-carousel
            height="400px"
            direction="vertical"
            type="card"
            :autoplay="true"
        >
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="bottom" w-full h-500 bg-bluegray >

      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.card {
  width: 190px;
  height: 254px;
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  border-radius: 20px;
  transition: all .3s;
}

.card2 {
  width: 190px;
  height: 254px;
  background-color: #1a1a1a;
  transition: all .2s;
}

.card2:hover {
  transform: scale(0.98);
  border-radius: 20px;
}

.card:hover {
  box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.30);
}
</style>
