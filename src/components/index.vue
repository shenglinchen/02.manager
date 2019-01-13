<template>
	<div>
		main
	</div>
</template>

<script>
	export default {
		name: "index",
		beforeCreate() {
			if (!window.sessionStorage.getItem("token")) {
                this.$message.error("请先登录");
				this.$router.push("login");
			}
		}
	}
</script>

<style>
	
</style>