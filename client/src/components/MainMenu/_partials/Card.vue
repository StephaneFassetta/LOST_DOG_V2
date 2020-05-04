<template>
    <div class="row-card">
        <div class="card">
            <div class="card-body">
                <div class="card-top">
                    <p class="card-title">
                        {{ card.name }}
                        <i data-toggle="tooltip" data-html="true" data-placement="top" style="margin-left: 5%" class="question-mark fa fa-question-circle" aria-hidden="true"></i>
                    </p>
                    <p @click="addCard(card)" class="btn-incremented-counter btn-card-counter">+</p>
                    <p class="counter-card" :id="card.id">{{ this.cardChoose[card.id] }}</p>
                </div>
                <div class="card-bottom" :id="card.id">
                    <p @click="removeCard(card)" class="btn-decremented-counter btn-card-counter">-</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props : ["card", "cardChoose"],
        methods: {
            addCard: function (card) {
                if (this.cardChoose[card.id] < 100) {
                    this.cardChoose[card.id]++;
                    this.$emit('addCard', {'card' : card, 'counter' :  this.cardChoose[this.card.id]});
                }
            },
            removeCard: function(card) {
                if (this.cardChoose[card.id] > 0) {
                    this.cardChoose[card.id]--;
                    this.$emit('removeCard', {'card' : card, 'counter' : this.cardChoose[this.card.id]});
                }
            }
        },
        name: "Card"
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

    @media screen and (max-width: 375px) {
        .card {
            text-align: center;
            cursor: pointer;
            position: relative;
            margin: 0.3em;
            background-color: #393a40 !important;
            color: #b5a1a1;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
            user-select: none;
            width: 141px;
            height: 100%;
        }
    }
</style>