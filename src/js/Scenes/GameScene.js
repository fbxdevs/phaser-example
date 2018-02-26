import config from 'config';
import Marco from 'characters/Marco';

class GameScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'GameScene',
			physics: {
				default: 'arcade',
				system: 'arcade',
				gravity: 100,
				setBounds: {
					width: GameScene.width,
					height: GameScene.height,
				},
				arcade: {
					gravity: {y: 200},
				},
			},
		});

		this.width = GameScene.width;
		this.height = GameScene.height;
		this.player = new Marco(this);
	}

	preload() {
		this.load.image('background', 'img/backgrounds/background.png');
		this.load.image('trains', 'img/backgrounds/trains.png');

		this.player.preload();
	}

	create() {
		this.scene.start('GameScene');
		console.log('Game started!');

		const background = this.add.image(0, 0, 'background');
		background.setOrigin(0, 0);
		background.scaleX = config.scaleX;
		background.scaleY = config.scaleY;

		const trainGroup = this.physics.add.staticGroup();
		const trains = trainGroup.create(0, 0, 'trains');
		trains.setOrigin(0, 0);
		trains.scaleX = config.scaleX;
		trains.scaleY = config.scaleY;

		this.player.create();
	}

	update() {
		this.player.update();
	}

	static setWidth(width) {
		GameScene.width = width;
	}

	static setHeight(height) {
		GameScene.height = height;
	}
}

export default GameScene;
