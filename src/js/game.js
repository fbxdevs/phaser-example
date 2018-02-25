import BootScene from 'Scenes/BootScene';
import GameScene from 'Scenes/GameScene';

const width = Math.floor(window.innerWidth * window.devicePixelRatio * 0.8);
const height = Math.floor(window.innerHeight * window.devicePixelRatio * 0.8);

const gameConfig = {
	type: Phaser.AUTO,
	parent: 'game',
	width,
	height,
	scene: [
		BootScene,
		GameScene,
	],
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(gameConfig);
