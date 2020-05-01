<template>
    <full-page ref="fullpage" :options="options" id="fullpage">
        <v-container fluid class="section">
            <Header></Header>
            <v-row>
                <v-col cols="12">
                    <v-row align="center" justify="center">
                        <v-menu top offset-x>
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" role="button" class="btn btn-lg main-button" id="btnCreateRoom" height="60">Crée une partie</v-btn>
                            </template>

                            <v-list>
                                <v-list-item to="/create">
                                    <v-list-item-title>Partie personnalisée</v-list-item-title>
                                </v-list-item>
                                <v-list-item to="/create">
                                    <v-list-item-title>Partie préremplie</v-list-item-title>
                                </v-list-item>
                                <v-list-item disabled>
                                    <v-list-item-title disabled="true">Mode enragé (soon)</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-btn to="/join" role="button" class="btn btn-lg main-button" id="btnJoinRoom" height="60">Rejoindre une partie</v-btn>
                    </v-row>
                </v-col>
            </v-row>
            <div class="arrow bounce" @click="$refs.fullpage.api.moveSectionDown()"></div>
        </v-container>
        <v-container fluid class="section" id="section-2">
            <v-row>
                <v-col cols="12">
                    <v-row align="center" justify="center">
                        <div>
                            <h3 class="head-title-form">L'histoire de chien perdu</h3>
                            <p>
                                La légende raconte qu'il y a fort longtemps, un homme abandonna un chien dans la forêt perdu de Black Lake City.
                                Le chien serait resté des années à errer dans la forêt.
                                On ne saura jamais ce qu'il est devenu mais chaque année la légende raconte que l'esprit du Chien perdu revient prendre
                                possession d'une personne dans la ville pour essayer de tuer des humains en les emmenant dans la forêt perdu et en les abandonnant.
                            </p>
                        </div>
                    </v-row>
                    <v-row align="center" justify="center">
                        <div class="role-description">
                            <h3 class="head-title-form">Les rôles</h3>
                            <v-list dense flat width="100%">
                                <v-list-item-group color="indigo">
                                    <v-list-item v-for="(card, i) in cards" :key="i">
                                        <v-list-item-icon>
                                            <v-icon v-text="card.icon"></v-icon>
                                        </v-list-item-icon>

                                        <v-list-item-content>
                                            <v-list-item-title @click="hydrateDialog(i)" v-text="card.name"></v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                            <div class="text-center">
                                <v-dialog v-model="dialog" width="500" scrollable>
                                    <v-card>
                                        <v-card-title class="headline grey lighten-2" primary-title v-html="cardTitle">
                                        </v-card-title>

                                        <v-card-text v-html="cardDescription">
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                            </div>
                        </div>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </full-page>
</template>

<script>
    import cards from "../../../public/js/cards";
    import Header from "./Header";
    export default {
        name: "MainMenu",
        components: {Header},
        data() {
            return {
                options: {
                    licenseKey: 'FDF53318-281C4EF2-9930AFE4-E2D4F795'
                },
                cards : cards,
                dialog: false,
                cardTitle: null,
                cardDescription: null
            }
        },
        methods: {
            hydrateDialog: function (idCard) {
                this.cardTitle = cards[idCard].name;
                this.cardDescription = cards[idCard].description;
                this.dialog = true;
                return true;
            }
        }
    }
</script>

<style scoped>
    /*
 * Design du body, html et container
 */
    html, body {
        margin: 0 auto;
        width: 100%;
        height: 100%;
        color: #bfb8b8;
        font-family: sans-serif;
        background-color: #23282b !important;
    }

    #home-container {
        width: 100%;
        height: 100%;
        text-align: center;
        background: linear-gradient(0deg, rgba(35,40,43,0.7959558823529411) 18%, rgba(131,131,131,0.6222864145658263) 100%);
    }

    /*
 * Design sur écran principal
 */
    .main-menu-row {
        display: block !important;
    }

    .main-menu-label {
        color: #d6cccc;
        font-size: 20px;
        display: block !important;
        margin-bottom: 2em;
        text-align: left;
    }

    .main-menu-label span input {
        height: 3em;
    }

    .group-button-game {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .main-button {
        width: 60% !important;
        padding: 1.2em !important;
        font-size: 13px !important;
        box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.4) !important;
        background-color: #992626 !important;
        color: #bfb8b8 !important;
        margin-bottom: 4% !important;
    }

    @-moz-keyframes bounce {
        20%, 50%, 20%, 20%, 20% {
            -moz-transform: translateY(0);
            transform: translateY(0);
        }
        40% {
            -moz-transform: translateY(-30px);
            transform: translateY(-30px);
        }
        60% {
            -moz-transform: translateY(-15px);
            transform: translateY(-15px);
        }
    }
    @-webkit-keyframes bounce {
        20%, 50%, 20%, 20%, 20% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
        40% {
            -webkit-transform: translateY(-30px);
            transform: translateY(-30px);
        }
        60% {
            -webkit-transform: translateY(-15px);
            transform: translateY(-15px);
        }
    }
    @keyframes bounce {
        20%, 50%, 20%, 20%, 20% {
            -moz-transform: translateY(0);
            -ms-transform: translateY(0);
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
        40% {
            -moz-transform: translateY(-30px);
            -ms-transform: translateY(-30px);
            -webkit-transform: translateY(-30px);
            transform: translateY(-30px);
        }
        60% {
            -moz-transform: translateY(-15px);
            -ms-transform: translateY(-15px);
            -webkit-transform: translateY(-15px);
            transform: translateY(-15px);
        }
    }

    .arrow {
        position: fixed;
        bottom: 50%;
        left: 50%;
        margin-left: -20px;
        width: 40px;
        height: 40px;
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yOTMuNzUxLDQ1NS44NjhjLTIwLjE4MSwyMC4xNzktNTMuMTY1LDE5LjkxMy03My42NzMtMC41OTVsMCwwYy0yMC41MDgtMjAuNTA4LTIwLjc3My01My40OTMtMC41OTQtNzMuNjcyICBsMTg5Ljk5OS0xOTBjMjAuMTc4LTIwLjE3OCw1My4xNjQtMTkuOTEzLDczLjY3MiwwLjU5NWwwLDBjMjAuNTA4LDIwLjUwOSwyMC43NzIsNTMuNDkyLDAuNTk1LDczLjY3MUwyOTMuNzUxLDQ1NS44Njh6Ii8+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMjIwLjI0OSw0NTUuODY4YzIwLjE4LDIwLjE3OSw1My4xNjQsMTkuOTEzLDczLjY3Mi0wLjU5NWwwLDBjMjAuNTA5LTIwLjUwOCwyMC43NzQtNTMuNDkzLDAuNTk2LTczLjY3MiAgbC0xOTAtMTkwYy0yMC4xNzgtMjAuMTc4LTUzLjE2NC0xOS45MTMtNzMuNjcxLDAuNTk1bDAsMGMtMjAuNTA4LDIwLjUwOS0yMC43NzIsNTMuNDkyLTAuNTk1LDczLjY3MUwyMjAuMjQ5LDQ1NS44Njh6Ii8+DQo8L3N2Zz4=);
        background-size: contain;
    }

    .bounce {
        -moz-animation: bounce 3s infinite;
        -webkit-animation: bounce 3s infinite;
        animation: bounce 3s infinite;
    }

    @media screen and (max-width: 570px) {
        .create-room-div {
            padding: 1em;
        }

        .join-room-div {
            padding: 1em;
        }

        .head-title-form {
            filter: drop-shadow(2px 2px 4px black);
            color: #992626;
            text-align: left;
            margin-bottom: 5%;
            font-size: 35px;
        }

        .row {
            margin: 0 !important;
        }

        .group-button-join {
            margin-top: 3%;
            width: 100%;
        }

        .group-button-create {
            margin-top: 3%;
            width: 100%;
        }
    }
</style>