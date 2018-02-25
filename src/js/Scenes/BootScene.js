class BootScene extends Phaser.Scene {
	constructor() {
		super({key: 'BootScene'});
	}

	preload() {

	}

	create() {
		this.scene.start('BootScene');
	}
}

export default BootScene;
