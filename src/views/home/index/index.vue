<template>
  <div class="index">
    <div class="text">
      <span class="pl-1" style="color: grey">首页</span> /
      <span class="pl-2" style="font-weight: 700">首页</span>
      <div class="pt-3" style="font-size: 18px; font-weight: 700">首页</div>
    </div>
    <div class="nav" ref="nav">
      <div class="top">
        <div ref="chartMap"
             style="width: 100%;height: 550px;padding: 30px 25px"></div>
      </div>

      <div class="bottom" style="width: 100%; display: flex">
        <div ref="chart" style="width: 50%; height: 300px;margin-right: 10px"></div>
        <div ref="chart1" style="width: 50%; height: 300px;"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口
import * as echarts from 'echarts';
import {onMounted, onUnmounted, onBeforeUnmount, reactive, ref, shallowRef, watchEffect} from 'vue';
import chinaMap from '@/assets/json/chinaChange.json';
import {debounce} from '@/utils/index.js';

const nav = ref(null);
// 创建 Resize Observer 实例
const resizeObserver = new ResizeObserver(entries => {
  // for (const entry of entries) {
  //     const newWidth = entry.contentRect.width;
  //     const newHeight = entry.contentRect.height;
  // }
  debounceResize();
})
//使用自定义防抖函数来限制 resize 方法的频率
const debounceResize = debounce(() => {
  resizeEcharts();
}, 300);

const chart = ref(null);
const chart1 = ref(null);
const chartMap = ref(null);

const myChart = shallowRef(null);
const myChart1 = shallowRef(null);
const chinaChart = shallowRef(null);

const optionMap = ref({});
const option = ref({});
const option1 = ref({});

const array = ref([]);

// 这个函数用来生成一个0到1500的随机整数
const randomInt = () => Math.floor(Math.random() * 1500);

function getRandomValue() {
  return Math.floor(Math.random() * 5000) + 1;
}

// 这个函数用来生成一个长度为7的随机数组
const randomArray = () => {
  const result = []
  for (let i = 0; i < 7; i++) {
    result.push(randomInt());
  }
  return result
}

const chartData = reactive({
  text: '堆积面积图',
  text2: '渐变堆积面积图',
  bgColor: '#6a7985',
  color: [
    '#80FFA5',
    '#00DDFF',
    '#37A2FF',
    '#FF0087',
    '#FFBF00'
  ],
  names: ['电子邮件', '工会广告', '视频广告', '折线方向', '搜索引擎'],
  dates: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
})

const timer = ref(null)
const chartInit = () => {
  //初始化echarts实例
  chinaChart.value = echarts.init(chartMap.value);
  //注册可用地图
  echarts.registerMap('china', chinaMap);
  //指定图表的配置项和数据
  optionMap.value = {
    title: {
      text: '中国地图',
      textStyle: {
        color: '#6e7079', // 设置字体颜色
        fontSize: 25 // 设置字体大小
        // 其他样式属性...
      }
    },
    series: [
      {
        type: 'map',
        map: 'china',
        label: {
          show: true,
          fontSize: 10,
          color: '#008000'
        },
        itemStyle: {
          borderColor: '#19bbee',
          areaColor: '#219edb'
        },
        zoom: 1.2,
        data: [
          {name: '北京', value: getRandomValue()},
          {name: '天津', value: getRandomValue()},
          {name: '上海', value: getRandomValue()},
          {name: '重庆', value: getRandomValue()},
          {name: '河北', value: getRandomValue()},
          {name: '山西', value: getRandomValue()},
          {name: '辽宁', value: getRandomValue()},
          {name: '吉林', value: getRandomValue()},
          {name: '黑龙江', value: getRandomValue()},
          {name: '江苏', value: getRandomValue()},
          {name: '浙江', value: getRandomValue()},
          {name: '安徽', value: getRandomValue()},
          {name: '福建', value: getRandomValue()},
          {name: '江西', value: getRandomValue()},
          {name: '山东', value: getRandomValue()},
          {name: '河南', value: getRandomValue()},
          {name: '湖北', value: getRandomValue()},
          {name: '湖南', value: getRandomValue()},
          {name: '广东', value: getRandomValue()},
          {name: '海南', value: getRandomValue()},
          {name: '四川', value: getRandomValue()},
          {name: '贵州', value: getRandomValue()},
          {name: '云南', value: getRandomValue()},
          {name: '陕西', value: getRandomValue()},
          {name: '甘肃', value: getRandomValue()},
          {name: '青海', value: getRandomValue()},
          {name: '台湾', value: getRandomValue()},
          {name: '内蒙古', value: getRandomValue()},
          {name: '广西', value: getRandomValue()},
          {name: '西藏', value: getRandomValue()},
          {name: '宁夏', value: getRandomValue()},
          {name: '新疆', value: getRandomValue()},
          {name: '香港', value: getRandomValue()},
          {name: '澳门', value: getRandomValue()},
          {name: '南海诸岛', value: getRandomValue()},
        ],
        emphasis: {
          label: {
            show: true,  // 显示省份名称
            fontSize: 16, // 放大字体
          },
          itemStyle: {
            color: 'blue', // 鼠标悬停时的颜色
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10,
          },
          effect3D: {
            show: true,  // 启用3D效果
            scale: 1.3,   // 放大系数
          },
        },
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        // 使用鼠标悬停的省份名称和相关信息来自定义提示内容
        return `${params.name}: ${params.value}`;
      },
      backgroundColor: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0, color: 'rgba(0, 0, 255, 0.7)' // 开始颜色
          },
          {
            offset: 1, color: 'rgba(0, 255, 0, 0.7)' // 结束颜色
          }
        ]
      },
      textStyle: {
        color: '#111', // 提示文字颜色
      },
    },
    visualMap: {
      min: 1,
      max: 5000,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered']
      }
    },
  }

  optionMap.value && chinaChart.value.setOption(optionMap.value);
}
// 模拟定时刷新数据
const updateChartData = () => {
  // 第一次渲染时，生成一个随机数组并赋值给array
  array.value = randomArray();
  myChart.value && myChart.value.setOption({
    series: [
      {
        data: array.value
      },
      {
        data: array.value
      },
      {
        data: array.value
      },
      {
        data: array.value
      },
      {
        data: array.value
      }
    ]
  });
  myChart1.value && myChart1.value.setOption({
    series: [
      {
        data: array.value
      },
      {
        data: array.value
      },
      {
        data: array.value
      },
      {
        data: array.value
      },
      {
        data: array.value
      }
    ]
  });
};
const init = () => {
  myChart.value = echarts.init(chart.value);

  option.value = {
    title: {
      text: chartData.text,
      textStyle: {
        color: '#6e7079', // 设置字体颜色
        fontSize: 14 // 设置字体大小
        // 其他样式属性...
      }
    },
    animation: true, // 启用动画
    animationDuration: 1000, // 动画持续时间（毫秒）
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: chartData.bgColor
        }
      }
    },
    legend: {
      data: chartData.names,
      textStyle: {
        color: '#6e7079', // 设置字体颜色
        fontSize: 12 // 设置字体大小
        // 其他样式属性...
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: chartData.dates
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: chartData.names[0],
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: []
      },
      {
        name: chartData.names[1],
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: []
      },
      {
        name: chartData.names[2],
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: []
      },
      {
        name: chartData.names[3],
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: []
      },
      {
        name: chartData.names[4],
        type: 'line',
        stack: 'Total',
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: []
      }
    ]
  };

  option.value && myChart.value.setOption(option.value);

  myChart1.value = echarts.init(chart1.value);

  option1.value = {
    color: chartData.color,
    title: {
      text: chartData.text2,
      textStyle: {
        color: '#6e7079', // 设置字体颜色
        fontSize: 14 // 设置字体大小
        // 其他样式属性...
      }
    },
    animation: true, // 启用动画
    animationDuration: 1000, // 动画持续时间（毫秒）
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: chartData.bgColor
        }
      }
    },
    legend: {
      data: chartData.names,
      textStyle: {
        color: '#6e7079', // 设置字体颜色
        fontSize: 12 // 设置字体大小
        // 其他样式属性...
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: chartData.dates
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: chartData.names[0],
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)'
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: []
      },
      {
        name: chartData.names[1],
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 221, 255)'
            },
            {
              offset: 1,
              color: 'rgb(77, 119, 255)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: []
      },
      {
        name: chartData.names[2],
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(55, 162, 255)'
            },
            {
              offset: 1,
              color: 'rgb(116, 21, 219)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: []
      },
      {
        name: chartData.names[3],
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 0, 135)'
            },
            {
              offset: 1,
              color: 'rgb(135, 0, 157)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: []
      },
      {
        name: chartData.names[4],
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 191, 0)'
            },
            {
              offset: 1,
              color: 'rgb(224, 62, 76)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: []
      }
    ]
  };

  option1.value && myChart1.value.setOption(option1.value);
}
const resizeEcharts = () => {
  myChart.value && myChart.value.resize();
  myChart1.value && myChart1.value.resize();
  chinaChart.value && chinaChart.value.resize();
}
// watchEffect(() => {

// })
onMounted(() => {
  chartInit();
  init();
  updateChartData();
  // 5秒后再次刷新重新生成一个随机数组
  timer.value = setInterval(updateChartData, 5000);
  //监听窗口变化
  resizeObserver.observe(nav.value);
  // window.addEventListener('resize', resizeEcharts);
})
onBeforeUnmount(() => {
  //移除监听
  resizeObserver.unobserve(nav.value);
  // window.removeEventListener('resize', resizeEcharts);
  //清除定时器
  clearInterval(timer.value);
  //销毁图表实例
  myChart.value && myChart.value.dispose();
  myChart1.value && myChart1.value.dispose();
  chinaChart.value && chinaChart.value.dispose();
  myChart.value = null;
  myChart1.value = null;
  chinaChart.value = null;
})

</script>


<style lang="less" scoped>
.nav {
  height: calc(100vh - 135px); /* 设置高度为视口高度 */
  overflow: auto; /* 启用滚动条 */
  padding: 15px 10px;
  overflow-x: hidden;
}

.bottom {
  padding: 15px 0 0 !important;
}

</style>
