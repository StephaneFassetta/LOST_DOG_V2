<template>
    <div class="game-informations" style="text-align: center">
        <Header></Header>
        <h2 class="head-title-lobby">{{ game.admin.name }} <v-icon color="#801414b5">fas fa-crown</v-icon></h2>

        <div class="informations-staging">
            <span id="nameRoom">{{ this.$route.params.name }}</span><br>
            <p>{{ playerNumber }}</p>
        </div>

        <div v-if="game.players" class="list-people" id="list-people">
            <p v-for="(player, index) in game.players" :key="index" class="list-players">{{ player.name }}</p>
        </div>

        <v-btn @click="statusGame('launch')" v-if="game.admin.socketId === self.socketId" class="btn" v-bind:class="{ 'btn-ready-game': roomIsFull === true, 'btn-wait-player': roomIsFull === false}" role="button" id="btn-launch-game" :loading="btnStartGame" :disabled="roomIsFull === false">
            Lancer la partie
            <template v-slot:loader>
                <span>{{ timeBeforeLaunch }}</span>
            </template>
        </v-btn>
        <v-btn @click="statusGame('cancel')" v-if="game.admin.socketId === self.socketId && btnStartGame" class="btn btn-cancel-game" role="button" id="btn-cancel-game">Annuler</v-btn>

        <p v-if="self.socketId !== game.admin.socketId && btnStartGame">La partie débutera dans {{ timeBeforeLaunch }}</p>

        <v-snackbar v-model="adminChange" :timeout="snackbarTimeout">
            L'admin à changer, veuillez l'identifier.
            <v-btn color="blue" text @click="adminChange = false">X</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        props:['game', 'self'],
        data() {
            return {
                btnStartGame: false,
                btnCancelGame: false,
                adminChange: false,
                timeBeforeLaunch: 5,
                snackbarTimeout: 2000,
                intervalID: null
            }
        },
        computed: {
            playerNumber: function () {
                return `${this.game.players.length} / ${this.game.size}`;
            },
            roomIsFull: function() {
                return this.game.players.length === this.game.size;
            }
        },
        methods: {
            statusGame: function(action) {
                this.$socket.emit('statusGame', action);
            },
            countDownTimer(action) {
                if (action === 'launch') {
                    this.intervalID = setInterval(() => {
                        if (this.timeBeforeLaunch > 0) {
                            this.timeBeforeLaunch -= 1
                        } else {
                            this.$socket.emit('startGame', this.game);
                        }
                    }, 1000);
                } else if (action === 'cancel') {
                    this.timeBeforeLaunch = 5;

                    if (this.intervalID) {
                        clearInterval(this.intervalID);
                    }
                }

                return false;
            }
        },
        sockets: {
            adminChange: function() {
                this.adminChange = true
            },
            statusGame: function (action) {
                if (action === 'launch') {
                    this.btnStartGame = true;
                    this.btnCancelGame = false;
                } else if (action === 'cancel'){
                    this.btnStartGame = false;
                    this.btnCancelGame = true;
                }

                this.countDownTimer(action);
            }
            //__ TODO : DECLENCHER L'EVENEMENT DISCONNECT AU SERVEUR LORSQUE LE JOUEUR CHANGE DE PAGE SANS QUITTER LA PAGE LOST DOG
        },
        name: "Lobby"
    }
</script>

<style scoped>
    .btn-ready-game {
        background-color: #792020 !important;
        border-radius: 0 !important;
        margin-top: 5%;
    }

    .btn-wait-player {
        color: #c4c4c4 !important;
        border-radius: 0 !important;
        margin-top: 5%;
    }

    .btn-cancel-game {
        background-color: #792020 !important;
        border-radius: 0 !important;
        margin-top: 5%;
        margin-left: 1%;
    }

    .head-title-lobby {
        font-size: 40px;
    }

    .list-players {
        margin: auto;
        border: solid 1.5px #792020;
        width: 90%;
        color: #bfb8b8;
        border-radius: 3px;
        font-size: 1em;
        background-color: rgba(51, 50, 67, 0.35);
        padding: 0.3em;
        box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.3);
    }
</style>