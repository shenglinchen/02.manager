<template>
	<div class="users">
		<el-row>
		    <el-col :span="24" class="user-search bg-purple">
				<myBreadcrumb  :level2="level2" :level3="level3"></myBreadcrumb>
		    </el-col>
		</el-row>
		<el-card>
			<div style="height:500px" ref="echarts">
				
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: "users",
		data() {
			return {
				level2: "数据统计",
				level3: "数据报表",
				// 列表数据
				echartsData: {
				    title: {
				        text: '用户来源'
				    },
				    tooltip : {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            label: {
				                backgroundColor: '#6a7985'
				            }
				        }
				    },
				    legend: {
				        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
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
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : false,
				            data : ['周一','周二','周三','周四','周五','周六','周日']
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'邮件营销',
				            type:'line',
				            stack: '总量',
				            areaStyle: {},
				            data:[120, 132, 101, 134, 90, 230, 210]
				        },
				        {
				            name:'联盟广告',
				            type:'line',
				            stack: '总量',
				            areaStyle: {},
				            data:[220, 182, 191, 234, 290, 330, 310]
				        },
				        {
				            name:'视频广告',
				            type:'line',
				            stack: '总量',
				            areaStyle: {},
				            data:[150, 232, 201, 154, 190, 330, 410]
				        },
				        {
				            name:'直接访问',
				            type:'line',
				            stack: '总量',
				            areaStyle: {normal: {}},
				            data:[320, 332, 301, 334, 390, 330, 320]
				        },
				        {
				            name:'搜索引擎',
				            type:'line',
				            stack: '总量',
				            label: {
				                normal: {
				                    show: true,
				                    position: 'top'
				                }
				            },
				            areaStyle: {normal: {}},
				            data:[820, 932, 901, 934, 1290, 1330, 1320]
				        }
				    ]
				},
				dataQuery: {
					pagenum: 1,
					pagesize: 10
				},
				total: 0
			}
		},
		async mounted(){
			// this.getData();

			var echarts = require('echarts');

			// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(this.$refs.echarts);

			let res = await this.$axios.get("reports/type/1");
			console.log(res)

			for (let key in res.data.data) {
				this.echartsData[key] = res.data.data[key];
				console.log(key)
			}

			this.echartsData.xAxis[0].boundaryGap = false;





			// 绘制图表
			myChart.setOption(this.echartsData);

		},

		methods: {
			async getData(){
				// let res = await this.$axios.get("reports/type/1");
				// this.tableData = res.data.data.goods;
				// console.log(this.tableData)
				// this.total = res.data.data.total;
				// this.echartsData = res.data.data;

				console.log(res.data.data);
			},
			pageChange(val) {
				this.dataQuery.pagenum = val;
				this.getData();
			},
			sizeChange(val) {
				this.dataQuery.pagesize = val;
				this.getData();
			}
		}
	}
</script>

<style lang="scss">

</style>