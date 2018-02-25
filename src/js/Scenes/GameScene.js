import config from 'config';

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
	}

	preload() {
		this.load.image('blackTile', 'img/tiles/black.png');
		this.load.image('blueTile', 'img/tiles/blue.png');
		this.load.image('brownTile', 'img/tiles/brown.png');
		this.load.image('greenTile', 'img/tiles/green.png');
		this.load.image('greyTile', 'img/tiles/grey.png');
		this.load.image('indigoTile', 'img/tiles/indigo.png');
		this.load.image('orangeTile', 'img/tiles/orange.png');
		this.load.image('pinkTile', 'img/tiles/pink.png');
		this.load.image('purpleTile', 'img/tiles/purple.png');
		this.load.image('redTile', 'img/tiles/red.png');
		this.load.image('yellowTile', 'img/tiles/yellow.png');
	}

	create() {
		this.scene.start('GameScene');
		console.log('Game started!');

		for(let i = 0; i < GameScene.width / (128 * config.TILE_SCALE); i++) {
			for(let j = 0; j < GameScene.height / (128 * config.TILE_SCALE); j++) {
				const index = Math.floor(Math.random() * GameScene.TILES.length);
				const img = this.add.image(i * (128 * config.TILE_SCALE) + (64 * config.TILE_SCALE), j * (128 * config.TILE_SCALE) + (64 * config.TILE_SCALE), GameScene.TILES[index]);
				img.setScale(config.TILE_SCALE, config.TILE_SCALE);
			}
		}
	}

	static setWidth(width) {
		GameScene.width = width;
	}

	static setHeight(height) {
		GameScene.height = height;
	}
}

GameScene.TILES = [
	'redTile',
	'orangeTile',
	'yellowTile',
	'greenTile',
	'blueTile',
	'indigoTile',
	'blackTile',
	'brownTile',
	'greyTile',
	'pinkTile',
	'purpleTile',
];

export default GameScene;
