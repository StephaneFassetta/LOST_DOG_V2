<template>
    <div class="game-informations" style="text-align: center">
        <h2 class="head-title-lobby">LOBBY</h2>

        <div class="informations-staging">
            <span id="nameRoom">{{ this.$route.params.name }}</span><br>
            <p>{{ playerNumber }}</p>
        </div>

        <div v-if="game.players" class="list-people" id="list-people">
            <p class="list-players">{{ game.admin.name }}</p>
            <p v-for="player in game.players" :key="player" class="list-players">{{ player.pseudo }}</p>
        </div>

        <a v-if="roomFull" class="btn btn-primary" href="#" role="button" id="btn-launch-game">Lancer la partie</a>
    </div>
</template>

<script>
    export default {
        props: ['game'],
        data() {
            return {
            }
        },
        computed: {
            playerNumber: function () {
                return `${this.game.players.length} / ${this.game.size}`;
            },
            roomFull: function() {
                return this.game.players.length === this.game.size;
            }
        },
        name: "Lobby"
    }
</script>

<style scoped>

</style>