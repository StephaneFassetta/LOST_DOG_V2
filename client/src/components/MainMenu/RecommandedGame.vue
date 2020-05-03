<template>
	<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
		<template v-slot:activator="{ on }">
			<v-btn color="#801414b5" dark v-on="on">Compositions recommandées</v-btn>
		</template>
		<v-card>
			<v-toolbar dark color="primary">
				<v-btn icon dark @click="dialog = false">
					<v-icon>mdi-close</v-icon>
				</v-btn>
				<v-toolbar-title>Compostions</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-toolbar-items>
					<v-btn dark text @click="setGame">Choisir</v-btn>
				</v-toolbar-items>
			</v-toolbar>
			<v-list three-line subheader>
				<v-subheader>Choix</v-subheader>
				<v-radio-group v-model="recommandedGameChoose">
					<v-list-item v-for="(game, key) in listRecommandedGames" :key="key">
						<v-list-item-action>
							<v-radio :key="key" :value="key"></v-radio>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ key }}</v-list-item-title>
							<ul>
								<li v-for="(role, index) in game" :key="index">{{ cards[index - 1].name }} - {{ role }}
								</li>
							</ul>
						</v-list-item-content>
					</v-list-item>
				</v-radio-group>
			</v-list>
		</v-card>
	</v-dialog>
</template>
<script>
    export default {
        name: 'RecommandedGame',
        props: {
            cards: {},
            dialog: {},
            recommandedGameChoose: {},
            listRecommandedGames: {},
            setGame: {}
        }
    }
</script>
<style scoped>


	/*
 * Design des templates pour rejoindre ou créer une partie
 */

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