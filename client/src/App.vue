<template>
    <v-app>
        <v-content>
            <transition name="fade">
                <router-view/>
            </transition>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    components: {},
    data: () => ({}),
};
</script>

<style scoped>
</style>
