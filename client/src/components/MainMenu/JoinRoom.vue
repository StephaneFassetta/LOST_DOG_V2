<template >
    <div class="join-room-div">
        <h2 class="head-title-form">REJOINDRE UNE PARTIE</h2>

        <form @submit.prevent="submitFormJoinRoom" id="formJoinRoom">
            <label class="main-menu-label">Nom de la partie
                <span>
                    <input v-model="nameRoom" type="text" class="form-control" aria-label="roomToJoin" id="roomToJoin" name="roomToJoin" aria-describedby="basic-addon1">
                    <p class="game-name-error error"></p>
                </span>
            </label>

            <label class="main-menu-label">Pseudo
                <span>
                    <input v-model="pseudo" type="text" class="form-control" aria-label="pseudoForJoin" name="pseudo" id="pseudoForJoin" aria-describedby="basic-addon1">
                    <p class="player-name-error error"></p>
                </span>
            </label>

            <div class="group-button-join">
                <router-link role="button" class="btn btn-lg back-button hvr-icon-back hvr-shutter-out-horizontal" id="backJoinRoom" to="/"><i class="fa fa-chevron-circle-left hvr-icon"></i>  Retour</router-link>
                <button type="submit" role="button" class="btn btn-lg submit-button hvr-icon-forward" id="submitJoinRoom">Rejoindre  <i class="fa fa-chevron-circle-right hvr-icon"></i></button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                nameRoom: null,
                pseudo: null,
                roomNameError : false,
                pseudoError : false,
                cardError : false
            }
        },
        methods: {
            submitFormJoinRoom() {
                this.roomNameError = false;
                this.pseudoError = false;

                if (!this.nameRoom) {
                    this.roomNameError = true;
                }

                if (!this.pseudo) {
                    this.pseudoError = true;
                }

                if (!this.roomNameError && !this.pseudoError && !this.cardError) {
                    this.joinGameRoom();
                }
            },
            joinGameRoom() {
                this.$socket.emit('joinGameRoom', {'nameRoom': this.nameRoom, 'player': {'pseudo': this.pseudo, 'socketId': this.$socket.id}});
                this.$router.push(`/game/${this.nameRoom}`);
            }
        },
        sockets: {
        },
        name: "Join"
    }
</script>

<style scoped>
    /*
 * Design des templates pour rejoindre ou créer une partie
 */

    .create-room-div {
        padding: 3em;
    }

    .join-room-div {
        padding: 3em;
    }

    .submit-button {
        background-color: #801414b5 !important;
        color: #c4c4c4 !important;
        border-radius: 0 !important;
    }

    .back-button {
        background-color: #801414b5 !important;
        color: #c4c4c4 !important;
        border-radius: 0 !important;
    }

    .error {
        color: red;
    }

    .group-button-create {
        text-align: left;
    }

    .group-button-join {
        text-align: left;
    }

    .head-title-form {
        filter: drop-shadow(2px 2px 4px black);
        color: #992626;
        text-align: left;
        margin-bottom: 1em;
        font-size: 4em;
    }

    .head-title {
        filter: drop-shadow(2px 2px 4px black);
        color: #992626;
        margin-bottom: 5%;
        font-size: 4em;
        text-align: center;
        margin-top: 5%;
    }

    input[type=text] {
        background-color: transparent;
        border: 1px solid #8a7a81;
        caret-color: gray;
        margin: 0.5em 0 0em 0;
        color: #ab3f3f !important;
        padding: 0.9em;
        height: 1.2em;
        width: 12em;
        border-radius: 5px;
        font-size: 1.1em;
    }

    input:focus {
        background-color: transparent !important;
    }
</style>