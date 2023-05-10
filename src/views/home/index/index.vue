<template>
    <div class="text">
        <span class="pl-1" style="color: grey">首页</span> /
        <span class="pl-2" style="font-weight: 700">首页</span>
        <div class="pt-3" style="font-size: 18px; font-weight: 700">首页</div>
    </div>
    <div class="top">

    </div>

    <div class="bottom" style="width: 100%">
        <div id="main" ref="chart" style="width: 100%; height: 300px;"></div>
        <div id="main1" ref="chart1" style="width: 100%; height: 300px;"></div>
    </div>
</template>

<script setup>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口
import * as echarts from 'echarts/core';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent} from 'echarts/components';
// 引入柱状图图表，图表后缀都为 Chart
import {LineChart} from 'echarts/charts';
// 标签自动布局，全局过渡动画等特性
import {UniversalTransition} from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {CanvasRenderer} from 'echarts/renderers';
import {onMounted, onUnmounted, reactive, ref, watchEffect} from 'vue'

// 注册必须的组件
echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition
]);


const array = ref([]) // 这里是你的数组，初始为空

// 这个函数用来生成一个0到1500的随机整数
const randomInt = () => Math.floor(Math.random() * 1500)

// 这个函数用来生成一个长度为7的随机数组
const randomArray = () => {
    const result = []
    for (let i = 0; i < 7; i++) {
        result.push(randomInt())
    }
    return result
}

const chartData = reactive({
    text: '堆积面积图',
    bgColor: '#6a7985',
    names: ['电子邮件', '工会广告', '视频广告', '折线方向', '搜索引擎'],
    dates: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    // email: [],
    // union: [],
    // video: [],
    // direct: [],
    // search: [],
})

const chartData1 = reactive({
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    text: '渐变堆积面积图',
    bgColor: '#6a7985',
    names: ['线条 1', '线条 2', '线条 3', '线条 4', '线条 5'],
    dates: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    // line1: [],
    // line2: [],
    // line3: [],
    // line4: [],
    // line5: [],
})

const init = () => {
    // 第一次渲染时，生成一个随机数组并赋值给array
    array.value = randomArray()
    // 每隔8秒，重新生成一个随机数组并赋值给array
    let timer = setInterval(() => {
        array.value = randomArray()
        // console.log(randomArray())
    }, 3000)

    const chartDom = document.getElementById('main');
    let myChart = echarts.init(chartDom, 'dark');

    let option = {
        title: {
            text: chartData.text
        },
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
            data: chartData.names
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
                data: array.value
            },
            {
                name: chartData.names[1],
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: array.value
            },
            {
                name: chartData.names[2],
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: array.value
            },
            {
                name: chartData.names[3],
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: array.value
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
                data: array.value
            }
        ]
    };

    option && myChart.setOption(option);


    const chartDom1 = document.getElementById('main1');
    let myChart1 = echarts.init(chartDom1, 'dark');


    let option1 = {
        color: chartData1.color,
        title: {
            text: chartData1.text
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: chartData1.bgColor
                }
            }
        },
        legend: {
            data: chartData1.names
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
                data: chartData1.dates
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: chartData1.names[0],
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
                data: array.value
            },
            {
                name: chartData1.names[1],
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
                data: array.value
            },
            {
                name: chartData1.names[2],
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
                data: array.value
            },
            {
                name: chartData1.names[3],
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
                data: array.value
            },
            {
                name: chartData1.names[4],
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
                data: array.value
            }
        ]
    };



    option1 && myChart1.setOption(option1);
    watchEffect(() => {
        myChart.setOption({
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
        })
        myChart1.setOption({
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
        })
        //监听窗口变化
        window.addEventListener('resize', function () {
            myChart.resize();
            myChart1.resize();
        });
    })
    onUnmounted(() => {
        //定时器
        clearInterval(timer);
        //销毁
        myChart.dispose();
        myChart1.dispose();
    })
}
onMounted(() => {
    init();
})


</script>


<style lang="less" scoped>

</style>