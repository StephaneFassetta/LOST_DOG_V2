<template>
    <router-link exact to="/">
        <div class="game-logo">
            <img id="logo" src="images/logo-dog2.gif"/>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    /*
     * Logo du jeu
     */
    .game-logo {
        display: flex;
        align-items: center;
        flex-direction: column;
        line-height: 0.95;
    }

    #logo {
        width: 26%;
        margin: 4%;
    }

    @media (max-width: 768px) {
        #logo {
            width: 70%;
            margin-bottom: 40%;
        }
    }
</style>