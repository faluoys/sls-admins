<template>
  <div class="index">
    <div class="text">
      <span class="pl-1" style="color: grey">首页</span> /
      <span class="pl-2" style="font-weight: 700">资产管理</span>
      <div class="pt-3" style="font-size: 18px; font-weight: 700">资产管理</div>
    </div>
    <div class="nav">
      <div class="top">
        <div ref="chartMap"
             style="width: 100%;height: 500px;padding: 30px 25px"></div>
      </div>

      <div class="bottom" style="width: 100%; display: flex">
        <div ref="chart" style="width: 50%; height: 300px;margin-right: 10px"></div>
        <div ref="chart1" style="width: 50%; height: 300px;"></div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>

</style>
