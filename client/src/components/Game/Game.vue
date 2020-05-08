<template>
    <div class="room-container">
        <Header></Header>
        <div v-if="fullyLoaded">
            <div v-if="game.status === 'lobby'" class="lobby-div">
                <Lobby :game="game" :self="self"></Lobby>
            </div>
            <div v-if="game.status === 'in-game'" class="in-game-div">
                <h1>INGAME.</h1>
            </div>
        </div>
    </div>
</template>

<script>
    import Lobby from "./Lobby";
    import Header from "../MainMenu/Header";

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
            //__ TODO : DECLENCHER L'EVENEMENT DISCONNECT AU SERVEUR LORSQUE LE JOUEUR CHANGE DE PAGE SANS QUITTER LA PAGE LOST DOG
        },

        name: "Game",
        components: {Header, Lobby}
    }
</script>

<style scoped>

</style>