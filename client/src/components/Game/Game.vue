<template>
    <div class="room-container">
        <div id="overlay-informations" style="display: none">
        </div>

        <div>
            <div class="lobby-div">
                <Lobby :game="game"></Lobby>
            </div>
            <div v-if="game.status == 'in-game'" class="in-game-div">
                <h1>INGAME.</h1>
            </div>
        </div>
    </div>
</template>

<script>
    import Lobby from "./Lobby";

    export default {
        data() {
            return {
                game: null
                //__ TODO : Lancer la partie et mettre des effets de chargements
            }
        },
        sockets: {
            refreshInfosUsersAndGame: function(params) {
                this.game = params.game;
            }
        },
        name: "Game",
        components: {Lobby}
    }
</script>

<style scoped>

</style>