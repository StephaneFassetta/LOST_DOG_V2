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

            <v-btn class="btn btn-lg recommended-composition" color="#801414b5" dark v-on:click="dialog = true">Compositions recommandées</v-btn>

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
                <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <v-card>
                        <v-toolbar dark color="#801414b5">
                            <v-btn icon dark @click="dialog = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <v-toolbar-title>Compostions</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                                <v-btn dark text @click="setRecommendedGame">Choisir</v-btn>
                            </v-toolbar-items>
                        </v-toolbar>
                        <v-list three-line subheader>
                            <v-subheader>General</v-subheader>
                            <v-radio-group v-model="recommendedGameChoose">
                                <v-list-item v-for="(game, key) in listRecommendedGame" :key="key">
                                    <v-list-item-action>
                                        <v-radio :key="key" :value="key">{{ key }}</v-radio>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title>{{ game.libelle }}</v-list-item-title>
                                        <ul>
                                            <li v-for="(role, index) in game.recommendedGame" :key="index">{{ cards[index - 1].name }} - {{ role }}</li>
                                        </ul>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-radio-group>
                        </v-list>
                    </v-card>
                </v-dialog>
            </div>
        </form>
    </div>
</template>

<script>
    import Card from "./_partials/Card";
    import Header from "./Header";
    import cards from "../../../public/js/cards";
    import recommendedGame from "../../../public/js/recommended_game";
    import * as _ from 'lodash';

    export default {
        data() {
            return {
                cards: cards,
                listRecommendedGame: recommendedGame,
                roomName: null,
                pseudo: null,
                cardChoosing: null,
                errorExist: null,
                recommendedGameChoose: null,
                roomNameError : false,
                pseudoError : false,
                cardError : false,
                dialog: false,
                playerInGame: 0
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
                let resumeGame = {'cards': cards, 'admin': {'pseudo': this.pseudo, 'socketId': this.$socket.id}, 'gameRoom': {'roomName': this.roomName, 'playerLimit':  this.maxPlayerLimit(this.cardChoosing), 'chooseCard': this.cardChoosing}};
                this.$socket.emit('createGameRoom', resumeGame);
                this.$router.push({name: 'game', params: {name: this.roomName, self: resumeGame.admin}});
            },
            maxPlayerLimit(cardsInGame) {
                let numberTotal = 0;

                for (let number in cardsInGame) {
                    numberTotal = numberTotal + parseInt(cardsInGame[number]);
                }

                return numberTotal;
            },
            setRecommendedGame() {
                this.cardChoosing = this.listRecommendedGame[this.recommendedGameChoose].recommendedGame;
                this.playerInGame = this.maxPlayerLimit(this.cardChoosing);
                this.dialog = false;
            },
        },
        created() {
            const card = {};

            _.forEach(this.cards, function(value) {
                card[value.id] = 0;
            });

            this.cardChoosing = card;
        },
        sockets: {
        },
        name: "CreateRoom",
        components: {Header, Card}
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

    .recommended-composition {
        background-color: #801414b5 !important;
        color: #c4c4c4 !important;
        border-radius: 0 !important;
        margin-bottom: 5px;
        width: 100%;
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