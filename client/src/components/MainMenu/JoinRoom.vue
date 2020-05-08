<template >
    <div class="join-room-div">
        <Header></Header>
        <form @submit.prevent="submitFormJoinRoom" id="formJoinRoom">
            <v-text-field v-model="roomName" id="nameRoom" name="nameRoom" label="Nom de la partie" outlined></v-text-field>
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
                roomName: null,
                pseudo: null,
                pseudoError: null,
                errorsExist: null,
                roomNameError : false,
                cardError : false
            }
        },
        methods: {
            submitFormJoinRoom() {
                this.roomNameError = false;
                this.pseudoError = false;

                if (!this.roomName) {
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
                let self = {'nameRoom': this.roomName, 'player': { 'pseudo': this.pseudo, 'socketId': this.$socket.id }};
                this.$socket.emit('joinGameRoom', self);
                this.$router.push({name: 'game', params: {name: this.roomName, self: self.player}});
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

    .group-button-join {
        text-align: left;
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