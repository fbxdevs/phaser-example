class BootScene extends Phaser.Scene {
	constructor() {
		super({key: 'BootScene'});
	}

	preload() {

	}

	create() {
		this.scene.start('BootScene');
		console.log('Booting...');

		setTimeout(() => {
			this.scene.start('GameScene');
		}, 500);
	}
}

export default BootScene;
