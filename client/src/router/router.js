import Vue from "vue";
import Router from "vue-router";
import CreateRoom from "../components/MainMenu/CreateRoom";
import JoinRoom from "../components/MainMenu/JoinRoom";
import MainMenu from "../components/MainMenu/MainMenu";
import Game from "../components/Game/Game";

Vue.use(Router);

export default new Router({
    routes: [
        {
            name: "mainMenu",
            component: MainMenu,
            path: "/"
        },
        {
            name: "createRoom",
            component: CreateRoom,
            path: "/create"
        },
        {
            name: "joinRoom",
            component: JoinRoom,
            path: "/join"
        },
        {
            name: "game",
            component: Game,
            path: "/game/:name",
            props: true
        }
    ]
});