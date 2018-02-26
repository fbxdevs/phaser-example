import config from 'config';
import BootScene from 'Scenes/BootScene';
import MenuScene from 'Scenes/MenuScene';
import GameScene from 'Scenes/GameScene';

const width = config.width;
const height = config.height;

GameScene.setWidth(width);
GameScene.setHeight(height);

const gameConfig = {
	type: Phaser.AUTO,
	parent: 'game',
	width,
	height,
	scene: [
		BootScene,
		MenuScene,
		GameScene,
	],
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(gameConfig);
