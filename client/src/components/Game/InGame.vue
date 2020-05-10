<template>
	<div>
		<AdminView v-if="game.admin.socketId === self.socketId" :game="game" :self="self"></AdminView>
		<PlayerView v-else :game="game" :self="self"></PlayerView>
	</div>
</template>

<script>
    import AdminView from "./_partials/AdminView";
    import PlayerView from "./_partials/PlayerView";

    export default {
        props: ['game', 'self'],
        name: "InGame",
        components: {AdminView, PlayerView}

    }
</script>

<style scoped>

</style>