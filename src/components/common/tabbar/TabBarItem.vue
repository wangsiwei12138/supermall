<template>
	<div class="tab-bar-item" @click="itemClick">
		<div v-if="!isActive">
			<slot name="item-icon"></slot>
		</div>
		<div v-else>
			<slot name="item-icon-active"></slot>
		</div>
		<div :class="{active:isActive}">
			<slot name="item-text"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TabBarItem",
		props: {
			path: String
		},
		data() {
			return {
				// isActive:true
			}
		},
		computed: {
			isActive() {
				return this.$route.path.indexOf(this.path) !== -1
			}
		},
		methods: {
			itemClick() {
				this.$router.replace(this.path)

			}
		}
		
	}
	
	
</script>

<style scoped>
	.tab-bar-item {
		flex: 1;
		text-align: center;
		height: 49px;
		font-size: 14px;
	}

	.tab-bar-item img {
		width: 24px;
		height: 24px;
		margin-top: 3px;
		vertical-align: middle;
	}

	.active {
		color: #DB331D;
	}
</style>
