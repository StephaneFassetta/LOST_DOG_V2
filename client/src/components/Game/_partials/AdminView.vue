<template>
	<div>
		<v-container fluid>
			<p style="text-align: center">X journée passée.</p>
			<v-row align="center" justify="center" class="btn-time">
				<v-btn color="#ffc107" class="btn btn-day" role="button" id="btn-day" width="150">
					Jour
				</v-btn>

				<v-btn color="rgb(54, 31, 181)" class="btn btn-night" role="button" id="btn-night" width="150">
					Nuit
				</v-btn>
			</v-row>

			<v-row align="center" justify="center" class="btn-alive-player">
				<p>Survivant(s) {{ alivePlayer }}</p>
			</v-row>

			<v-row v-for="(player, index) in game.players" :key="index" align="center" justify="center">
				<label class="animate__animated animate__fadeInUp">
					<input type="checkbox"/>
					<div class="game-card">
						<div class="front">
							<div class="banner-top animate__animated animate__fadeInDown">
								<p class="player-name"><b>{{ player.name }}</b></p>
								<div class="icon">
									<v-icon color="red" v-if="player.alive">fas fa-heart</v-icon>
									<v-icon color="black" v-else>fas fa-skull</v-icon>
								</div>
							</div>
							<div class="front-content">IMAGE CHIEN PERDU</div>
						</div>
						<div class="back">
							<div class="back-content">
							</div>
							<div class="banner-bottom animate__animated animate__fadeInUp">
							</div>
						</div>
					</div>
				</label>
			</v-row>
		</v-container>
	</div>
</template>

<script>
    export default {
        props: ['game', 'self'],
		computed: {
            alivePlayer: function() {
                let alivePlayer = 0;

                this._.forEach(this.game.players, function (player) {
                    if (player.alive === true) {
                        alivePlayer++
                    }
                });

                return alivePlayer;
            }
		},
        name: "AdminView"
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
		left: 18%;
		top: 10%;
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

	.btn-time {
		border-radius: 0 !important;
		margin-bottom: 5%;
	}

	.btn-day {
		margin-right: 3%;
	}
</style>