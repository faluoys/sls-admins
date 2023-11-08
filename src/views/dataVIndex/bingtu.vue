<template>
    <div id="yuan" ref="yuan" style="width: 100%;height: 200px;"></div>
</template>

<script setup>
import {onMounted, ref, onUnmounted,onBeforeUnmount} from 'vue'
import * as echarts from 'echarts/core'
import {BarChart, PictorialBarChart, PieChart} from 'echarts/charts'
import {CanvasRenderer} from 'echarts/renderers'
import {GridComponent, TooltipComponent, LegendComponent, TitleComponent, GraphicComponent} from 'echarts/components';
import {LabelLayout} from 'echarts/features';

echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout,
    GridComponent,
    BarChart,
    PictorialBarChart,
    GraphicComponent,
]);
const yuan = ref(null)
const init = () => {
    let chartDom = yuan.value
    let myChart = echarts.init(chartDom, '#021536');
    let option;
    option = {
        backgroundColor: '#021536',
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['30%', '75%'],
                center: ['50%', '50%'],
                data: [
                    {
                        value: 335,
                        name: '直接访问',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(152,251,152,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(64,224,208,1)'
                            }]),
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    {
                        value: 310,
                        name: '邮件营销',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(5,15,88,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(235,122,255,1)'
                            }]),
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    {
                        value: 274,
                        name: '联盟广告',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(5,193,255,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(15,15,90,1)'
                            }]),
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    {
                        value: 235,
                        name: '视频广告',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(255,34,34,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(80,123,45,1)'
                            }]),
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    {
                        value: 400,
                        name: '搜索引擎',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(75,0,130,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(176,196,222,1)'
                            }]),
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                ].sort(function (a, b) {
                    return a.value - b.value;
                }),
                roseType: 'radius',
                label: {
                    color: 'rgba(255, 255, 255, 1)'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 1)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }, {
                name: '内环',
                type: 'pie',
                silent: true,
                clockwise: true,
                emphasis: {             // 使用 emphasis.scale 代替
                    scale: true          // hoverAnimation
                },
                animationType: 'scale',
                radius: ['22%', '25%'],
                label: {
                    position: 'center'
                },
                data: [{
                    value: 100,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(152,251,152,1)'
                        }, {
                            offset: 1,
                            color: 'rgba(64,224,208,1)'
                        }])
                    }
                }]
            }, {
                name: '线1',
                type: 'pie',
                silent: true,
                clockwise: true,
                emphasis: {             // 使用 emphasis.scale 代替
                    scale: true          // hoverAnimation
                },
                animationType: 'scale',
                radius: ['80%', '80.5%'],
                label: {
                    position: 'center'
                },
                data: [{
                    value: 100,
                    itemStyle: {
                        color: 'rgba(255,255,255,0.3)'
                    }
                }]
            }, {
                name: '线2',
                type: 'pie',
                silent: true,
                clockwise: true,
                emphasis: {             // 使用 emphasis.scale 代替
                    scale: true          // hoverAnimation
                },
                animationType: 'scale',
                radius: ['70%', '70.3%'],
                label: {
                    position: 'center'
                },
                data: [{
                    value: 100,
                    itemStyle: {
                        color: 'rgba(255,255,255,0.15)',
                        borderType: 'dotted'
                    }
                }]
            }
        ]
    }

    option && myChart.setOption(option);
}
onMounted(() => {
    init()
})
onUnmounted(() => {
    if (yuan.value) {
        yuan.value.dispose()
        yuan.value = null
    }
})
</script>

<style scoped>

</style>
