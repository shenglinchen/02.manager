<template>
	<el-breadcrumb separator-class="el-icon-arrow-right">
	  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
	  <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
	  <el-breadcrumb-item>{{level3}}</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script>
	export default {
		props: ["level3", "level2"]
	}
</script>

<style>
	
</style>