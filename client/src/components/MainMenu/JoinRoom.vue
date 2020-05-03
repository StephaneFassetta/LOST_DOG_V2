<template >
    <div class="join-room-div">
        <Header></Header>
        <form @submit.prevent="submitFormJoinRoom" id="formJoinRoom">
            <v-text-field v-model="nameRoom" id="nameRoom" name="nameRoom" label="Nom de la partie" outlined></v-text-field>
            <v-alert v-if="roomNameError" border="top" color="red lighten-2" dark>Veuillez rentrer un nom de partie</v-alert>

            <v-text-field v-model="pseudo" name="pseudo" id="pseudoForCreate" label="Pseudo" outlined></v-text-field>
            <v-alert v-if="pseudoError" border="top" color="red lighten-2" dark>Veuillez rentrer un pseudo</v-alert>

            <div class="group-button-join">
                <v-btn to="/" role="button" class="btn btn-lg back-button" id="backCreateRoom">
                    Retour
                </v-btn>
                <v-btn type="submit" :loading="errorsExist === false" :disabled="errorsExist === false" class="ma-2 submit-button" id="submitCreateRoom">
                    Rejoindre
                </v-btn>
            </div>
        </form>
    </div>
</template>

<script>
    import Header from "./Header";
    export default {
        components: {Header},
        data() {
            return {
                nameRoom: null,
                pseudoError: null,
                pseudo: null,
                roomNameError : false,
                cardError : false,
                errorsExist: null
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

                if (!this.roomNameError && !this.pseudoError) {
                    this.errorsExist = false;
                    setTimeout(() => (this.joinGameRoom()), 2500);
                } else {
                    this.errorsExist = true;
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