<template>
    <div class="room-container">
        <div v-if="fullyLoaded">
            <div v-if="game.status === 'lobby'" class="lobby-div">
                <Lobby :game="game" :self="self"></Lobby>
            </div>
            <div v-if="game.status === 'in-game'" class="in-game-div">
                 <InGame :game="game" :self="self"></InGame>
            </div>
        </div>
    </div>
</template>

<script>
    import Lobby from "./Lobby";
    import InGame from "./InGame";

    export default {
        data() {
            return {
                self: this.$route.params.self,
                fullyLoaded: false,
                game: null
            }
        },
        sockets: {
            refreshInfosUsersAndGame: function(params) {
                this.game = params.game;
                this.fullyLoaded = true;
            }
        },
        name: "Game",
        components: {InGame, Lobby}
    }
</script>

<style scoped>

</style>