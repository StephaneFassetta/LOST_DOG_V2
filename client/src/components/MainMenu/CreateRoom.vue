<template>
    <div class="create-room-div">
        <h2 class="head-title-form">CREE UNE PARTIE</h2>

        <form @submit.prevent="submitFormCreateRoom" id="formCreateRoom">
            <div class="create-room-input">
                <label class="main-menu-label">Nom de la partie
                    <span>
                        <input v-model="roomName" type="text" class="form-control" aria-label="nameRoom" id="nameRoom" name="nameRoom" aria-describedby="basic-addon1">
                        <p v-if="roomNameError" class="game-name-error error">Veuillez rentrer un nom de partie</p>
                    </span>
                </label>

                <label class="main-menu-label">Pseudo
                    <span>
                        <input v-model="pseudo" type="text" class="form-control" aria-label="pseudoToCreate" name="pseudo" id="pseudoForCreate" aria-describedby="basic-addon1">
                        <p v-if="pseudoError" class="player-name-error error">Veuillez rentrer un pseudo</p>
                    </span>
                </label>
            </div>

            <p v-if="cardError" class=" error">Veuillez choisir au moins une carte</p>
            <div class="row card-list">
                <Card v-for="(card, index) in cards" :card="card" :key="index" @addCard="addCardDeck" @removeCard="removeCardDeck"></Card>
            </div>

            <div class="group-button-create">
                <router-link to="/" role="button" class="btn btn-lg back-button hvr-icon-back hvr-shutter-out-horizontal" id="backCreateRoom"><i class="fa fa-chevron-circle-left hvr-icon"></i>  Retour</router-link>
                <button type="submit" role="button" class="btn btn-lg submit-button hvr-icon-forward" id="submitCreateRoom">Crée <i class="fa fa-chevron-circle-right hvr-icon"></i></button>
            </div>
        </form>
    </div>
</template>

<script>
    import Card from "./_partials/Card";
    import cards from "../../../public/js/cards";
    import * as _ from 'lodash';

    export default {
        data() {
            return {
                roomName: null,
                pseudo: null,
                cards: cards,
                chooseCard: {},
                roomNameError : false,
                pseudoError : false,
                cardError : false
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

                if (_.isEmpty(this.chooseCard)) {
                    this.cardError = true;
                }

                if (!this.roomNameError && !this.pseudoError && !this.cardError) {
                    this.createGameRoom();
                }
            },
            addCardDeck(cardInformation) {
                this.chooseCard[cardInformation.card.id] = cardInformation.counter;
            },
            removeCardDeck(cardInformation) {
                this.chooseCard[cardInformation.card.id] = cardInformation.counter;
            },
            createGameRoom() {
                this.$socket.emit('createGameRoom', {'cards': cards, 'admin': {'pseudo': this.pseudo, 'socketId': this.$socket.id}, 'gameRoom': {'roomName': this.roomName, 'playerLimit':  this.maxPlayerLimit(this.chooseCard), 'chooseCard': this.chooseCard}});
                this.$router.push(`/game/${this.roomName}`);
            },
            maxPlayerLimit(cardsInGame) {
                let numberTotal = 0;

                for (const number in cardsInGame) {
                    numberTotal = numberTotal + parseInt(cardsInGame[number]);
                }

                return numberTotal;
            }
        },
        sockets: {
        },
        name: "CreateRoom",
        components: {Card}
    }
</script>

<style scoped>
    /*
 * Design carte des différents rôles
 */
    .btn-card-counter {
        margin-right: 2%;
        display: inline;
        font-size: 50px;
        cursor: pointer;
        user-select: none;
    }

    .counter-card {
        width: 100%;
        text-align: left;
        display: block;
        font-size: 30px;
    }

    .card-list {
        margin-bottom: 2em;
    }

    .card {
        text-align: center;
        cursor: pointer;
        position: relative;
        margin: 0.3em;
        background-color: #393a40 !important;
        color: #b5a1a1;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
        user-select: none;
        width: 157px;
        height: 100%;
    }

    .card:hover {
        background-color: #55565c !important;
    }

    .row-card {
        height: 214px;
        margin-bottom: 1%;
    }

    .card-title {
        font-size: 15px;
        display: block;
        text-align: left;
        font-weight: bold;
    }

    .card-body {
        padding: 5% !important;
    }

    .btn-incremented-counter {
        float: right;
    }

    .btn-decremented-counter {
        float: right;
        margin-right: 4%;
    }

    .card-body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

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

    @media screen and (max-width: 370px) {
        .card {
            text-align: center;
            cursor: pointer;
            position: relative;
            margin: 0.3em;
            background-color: #393a40 !important;
            color: #b5a1a1;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
            user-select: none;
            width: 130px;
            height: 100%;
        }
    }
</style>