<template>
    <div class="create-room-div">
        <Header></Header>
        <form @submit.prevent="submitFormCreateRoom" id="formCreateRoom">
            <div class="create-room-input">
                <v-text-field v-model="roomName" id="nameRoom" name="nameRoom" label="Nom de la partie" outlined></v-text-field>
                <v-alert v-if="roomNameError" border="top" color="red lighten-2" dark>Veuillez rentrer un nom de partie</v-alert>

                <v-text-field v-model="pseudo" name="pseudo" id="pseudoForCreate" label="Pseudo" outlined></v-text-field>
                <v-alert v-if="pseudoError" border="top" color="red lighten-2" dark>Veuillez rentrer un pseudo</v-alert>
            </div>

            <div class="text-center">
                <v-sheet color="#801414b5">Partie a {{ playerInGame }} joueur(s)</v-sheet>
            </div>

            <div class="row card-list">
                <Card v-for="(card, index) in cards" :card="card" :key="index" :cardChoose="cardChoosing" @addCard="addCardDeck" @removeCard="removeCardDeck"></Card>
            </div>
            <v-alert v-if="cardError" border="top" color="red lighten-2" dark>Veuillez choisir au moins une carte</v-alert>

            <div class="group-button-create">
                <v-btn to="/" role="button" class="btn btn-lg back-button" id="backCreateRoom">
                    Retour
                </v-btn>
                <v-btn type="submit" :loading="errorExist === false" :disabled="errorExist === false" class="ma-2 submit-button" id="submitCreateRoom">
                    Créer
                </v-btn>
                <RecommandedGame :cards="cards" :dialog="dialog" :game-personnalized-choose="gamePersonnalizedChoose" :list-game-personnalized="listGamePersonnalized" :set-game="setGame"/>
            </div>
        </form>
    </div>
</template>

<script>
    import Card from "./_partials/Card";
    import cards from "../../../public/js/cards";
    import * as _ from 'lodash';
    import Header from "./Header";
    import RecommandedGame from "./RecommandedGame";

    export default {
        data() {
            return {
                roomName: null,
                pseudo: null,
                cards: cards,
                cardChoosing: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
                roomNameError : false,
                pseudoError : false,
                cardError : false,
                errorExist: null,
                playerInGame: 0,
                listGamePersonnalized: {
                    1 : {1: 4, 2: 5, 3: 1, 4: 2, 5: 0, 6: 0, 7: 0, 8: 0},
                    2 : {1: 3, 2: 7, 3: 8, 4: 8, 5: 0, 6: 0, 7: 0, 8: 0}
                },
                gamePersonnalizedChoose: null,
                dialog: false
            }
        },
        methods: {
            submitFormCreateRoom() {
                this.cardError = false;
                this.roomNameError = false;
                this.pseudoError = false;

                if (!this.roomName) {
                    this.roomNameError = true;
                }

                if (!this.pseudo) {
                    this.pseudoError = true;
                }

                if (_.isEmpty(this.cardChoosing)) {
                    this.cardError = true;
                }

                if (!this.roomNameError && !this.pseudoError && !this.cardError) {
                    this.errorExist = false;
                    setTimeout(() => (this.createGameRoom()), 2500);
                } else {
                    this.errorExist = true;
                }
            },
            addCardDeck(cardInformation) {
                this.cardChoosing[cardInformation.card.id] = cardInformation.counter;
                this.playerInGame++
            },
            removeCardDeck(cardInformation) {
                this.cardChoosing[cardInformation.card.id] = cardInformation.counter;
                this.playerInGame--
            },
            createGameRoom() {
                this.$socket.emit('createGameRoom', {'cards': cards, 'admin': {'pseudo': this.pseudo, 'socketId': this.$socket.id}, 'gameRoom': {'roomName': this.roomName, 'playerLimit':  this.maxPlayerLimit(this.cardChoosing), 'chooseCard': this.cardChoosing}});
                this.$router.push(`/game/${this.roomName}`);
            },
            maxPlayerLimit(cardsInGame) {
                let numberTotal = 0;

                for (let number in cardsInGame) {
                    numberTotal = numberTotal + parseInt(cardsInGame[number]);
                }

                return numberTotal;
            },
            setGame() {
                this.cardChoosing = this.listGamePersonnalized[this.gamePersonnalizedChoose];
                this.playerInGame = this.maxPlayerLimit(this.cardChoosing);
                this.dialog = false;
            }
        },
        sockets: {
        },
        name: "CreateRoom",
        components: {RecommandedGame, Header, Card}
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

    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>