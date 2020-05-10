<template>
	<div>
		<full-page ref="fullpage" :options="options" id="fullpage">
			<v-container class="section">
				<v-row justify="center" align="center">
					<label class="animate__animated animate__fadeInUp">
						<input type="checkbox"/>
						<div class="game-card">
							<div class="front">
								<div class="banner-top animate__animated animate__fadeInDown">
									<p class="player-name"><b>{{ this._.upperCase(self.pseudo) }}</b></p>
									<div class="icon">
										<v-icon color="red" v-if="alive">fas fa-heart</v-icon>
										<v-icon color="black" v-else>fas fa-skull</v-icon>
									</div>
								</div>
								<div class="front-content">IMAGE CHIEN PERDU</div>
							</div>
							<div class="back">
								<div class="back-content">

								</div>
								<div class="banner-bottom animate__animated animate__fadeInUp">
									<ul class="pros-skills">
										<li v-for="(skill, index) in skillPros" :key="index">{{ skill.libelle }}</li>
									</ul>
									<ul class="cons-skills">
										<li v-for="(skill, index) in skillCons" :key="index">{{ skill.libelle }}</li>
									</ul>
								</div>
							</div>
						</div>
					</label>
				</v-row>
				<div class="arrow bounce" @click="$refs.fullpage.api.moveSectionDown()"></div>
			</v-container>
			<v-container fluid class="section" id="section-2">
				<ul class="logs" v-if="!this._.isEmpty(game.logs)">
					<li v-for="(log, index) in game.logs" :key="index">{{ log }}</li>
				</ul>
				<p v-else>Aucun logs pour le moment.</p>
			</v-container>
		</full-page>
	</div>
</template>

<script>
    import cards from "./../../../../public/js/cards";

    export default {
        props: ['game', 'self'],
        data() {
            return {
				cards: cards,
                options: {
                    licenseKey: 'FDF53318-281C4EF2-9930AFE4-E2D4F795'
                },
            }
        },
        computed: {
            alive: function() {
                return this.game.players.find((player) => player.socketId === this.self.socketId).alive;
            },
			card: function() {
                const idCard = parseInt(this.game.players.find((player) => player.socketId === this.self.socketId).role.id);
                return this.cards.find((card) => card.id === idCard);
            },
			skillPros: function() {
                return this.card.skills.pros;
            },
			skillCons: function() {
                return this.card.skills.cons;
            }
        },
        name: "PlayerView",
    }
</script>

<style scoped>
	label {
		-webkit-perspective: 1000px;
		perspective: 1000px;
		-webkit-transform-style: preserve-3d;
		transform-style: preserve-3d;
		display: block;
		width: 230px;
		height: 319px;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		cursor: pointer;
	}

	.game-card {
		position: relative;
		height: 100%;
		width: 100%;
		-webkit-transform-style: preserve-3d;
		transform-style: preserve-3d;
		-webkit-transition: all 600ms;
		transition: all 600ms;
		border-radius: 8%
	}

	.game-card .front, .game-card .back {
		position: absolute;
		height: 100%;
		width: 100%;
		background: #fff;
		text-align: center;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}

	.game-card .back {
		background: #222;
		color: #fff;
		-webkit-transform: rotateX(180deg);
		transform: rotateX(180deg);
		border-radius: 5%;
		overflow-y: hidden;
	}

	.game-card .front {
		background: #222;
		border-radius: 5%;
		overflow-y: hidden;
	}

	label:hover .game-card {
		-webkit-transform: rotateX(20deg);
		transform: rotateX(20deg);
		box-shadow: 0 20px 20px rgba(50, 50, 50, 0.2);
	}

	input {
		display: none;
	}

	:checked + .game-card {
		transform: rotateX(180deg);
		-webkit-transform: rotateX(180deg);
	}

	label:hover :checked + .game-card {
		transform: rotateX(160deg);
		-webkit-transform: rotateX(160deg);
		box-shadow: 0 20px 20px rgba(255, 255, 255, 0.2);
	}

	.front .banner-top {
		position: absolute;
		width: 100%;
		background: #363636;
		padding: 10px;
		box-sizing: border-box;
		color: #ffffff;
	}

	.player-name {
		float: right;
	}

	.icon {
		background: #ffffff;
		width: 47px;
		height: 41px;
		margin: 30px 5px -54px 7px;
		padding: 10px;
		border-radius: 100%;
		line-height: 20px;
		text-align: center;
		box-sizing: border-box;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	}

	.front-content {
		width: 100%;
		height: 100%;
		padding: 110px 20px;
		box-sizing: border-box;
		text-align: center;
	}

	.back .banner-bottom {
		position: absolute;
		width: 100%;
		background: #363636;
		box-sizing: border-box;
		color: #ffffff;
		bottom: 0;
	}

	.pros-skills {
		font-size: 11px;
		color: darkgreen;
		list-style-type: none;
		text-align: left;
	}

	.cons-skills {
		font-size: 11px;
		color: red;
		list-style-type: none;
		text-align: left;
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
</style>