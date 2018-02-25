class GameScene extends Phaser.Scene {
	constructor(width, height) {
		super({
			key: 'GameScene',
			physics: {
				system: 'arcade',
				gravity: 100,
				setBounds: {
					width,
					height,
				},
			},
		});
	}

	preload() {

	}

	create() {
		this.scene.start('GameScene');
	}
}

export default GameScene;
