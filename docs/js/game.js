(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BootScene = function (_Phaser$Scene) {
	_inherits(BootScene, _Phaser$Scene);

	function BootScene() {
		_classCallCheck(this, BootScene);

		return _possibleConstructorReturn(this, (BootScene.__proto__ || Object.getPrototypeOf(BootScene)).call(this, { key: 'BootScene' }));
	}

	_createClass(BootScene, [{
		key: 'preload',
		value: function preload() {}
	}, {
		key: 'create',
		value: function create() {
			var _this2 = this;

			this.scene.start('BootScene');
			console.log('Booting...');

			setTimeout(function () {
				_this2.scene.start('MenuScene');
			}, 500);
		}
	}]);

	return BootScene;
}(Phaser.Scene);

exports.default = BootScene;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _Marco = require('characters/Marco');

var _Marco2 = _interopRequireDefault(_Marco);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameScene = function (_Phaser$Scene) {
	_inherits(GameScene, _Phaser$Scene);

	function GameScene() {
		_classCallCheck(this, GameScene);

		var _this = _possibleConstructorReturn(this, (GameScene.__proto__ || Object.getPrototypeOf(GameScene)).call(this, {
			key: 'GameScene',
			physics: {
				default: 'arcade',
				system: 'arcade',
				gravity: 100,
				setBounds: {
					width: GameScene.width,
					height: GameScene.height
				},
				arcade: {
					gravity: { y: 200 }
				}
			}
		}));

		_this.width = GameScene.width;
		_this.height = GameScene.height;
		_this.player = new _Marco2.default(_this);
		return _this;
	}

	_createClass(GameScene, [{
		key: 'preload',
		value: function preload() {
			this.load.image('background', 'img/backgrounds/background.png');
			this.load.image('trains', 'img/backgrounds/trains.png');

			this.player.preload();
		}
	}, {
		key: 'create',
		value: function create() {
			this.scene.start('GameScene');
			console.log('Game started!');

			var background = this.add.image(0, 0, 'background');
			background.setOrigin(0, 0);
			background.scaleX = _config2.default.scaleX;
			background.scaleY = _config2.default.scaleY;

			var trainGroup = this.physics.add.staticGroup();
			var trains = trainGroup.create(0, 0, 'trains');
			trains.setOrigin(0, 0);
			trains.scaleX = _config2.default.scaleX;
			trains.scaleY = _config2.default.scaleY;

			this.player.create();
		}
	}, {
		key: 'update',
		value: function update() {
			this.player.update();
		}
	}], [{
		key: 'setWidth',
		value: function setWidth(width) {
			GameScene.width = width;
		}
	}, {
		key: 'setHeight',
		value: function setHeight(height) {
			GameScene.height = height;
		}
	}]);

	return GameScene;
}(Phaser.Scene);

exports.default = GameScene;

},{"characters/Marco":4,"config":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuScene = function (_Phaser$Scene) {
	_inherits(MenuScene, _Phaser$Scene);

	function MenuScene() {
		_classCallCheck(this, MenuScene);

		return _possibleConstructorReturn(this, (MenuScene.__proto__ || Object.getPrototypeOf(MenuScene)).call(this, { key: 'MenuScene' }));
	}

	_createClass(MenuScene, [{
		key: 'preload',
		value: function preload() {}
	}, {
		key: 'create',
		value: function create() {
			var _this2 = this;

			this.scene.start('MenuScene');
			console.log('In menu...');

			setTimeout(function () {
				_this2.scene.start('GameScene');
			}, 500);
		}
	}]);

	return MenuScene;
}(Phaser.Scene);

exports.default = MenuScene;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Marco = function () {
	function Marco(scene) {
		_classCallCheck(this, Marco);

		this.scene = scene;
		this.sprites = {};
		this.direction = 'right';
		this.legAction = 'Idle';
		this.torsoAction = 'Idle';
		this.weapons = ['Pistol', 'Shotgun', 'Uzi'];
		this.currentWeaponIndex = 0;
	}

	_createClass(Marco, [{
		key: 'changeDirection',
		value: function changeDirection(direction) {
			this.sprites.legs.scaleX = -this.sprites.legs.scaleX;
			this.sprites.torso.scaleX = -this.sprites.torso.scaleX;

			this.direction = direction;
		}
	}, {
		key: 'run',
		value: function run(_run) {
			if (_run) {
				if (this.legAction != 'Run' && this.legAction != 'jump') {
					this.sprites.legs.anims.play('marcoLegsRun');
					this.legAction = 'Run';
				}
			} else if (this.legAction == 'Run') {
				this.sprites.legs.anims.play('marcoLegsIdle');
				this.legAction = 'Idle';
			}
		}
	}, {
		key: 'changeWeapon',
		value: function changeWeapon(index) {
			if (index != this.currentWeaponIndex) {
				if (index !== undefined) this.currentWeaponIndex = index;else this.currentWeaponIndex = (this.currentWeaponIndex + 1) % this.weapons.length;

				this.sprites.torso.anims.play('marcoTorso' + this.weapons[this.currentWeaponIndex] + this.torsoAction);
			}
		}
	}, {
		key: 'fireWeapon',
		value: function fireWeapon(fire) {
			if (fire) {
				if (this.torsoAction != 'Shoot') {
					this.torsoAction = 'Shoot';
					this.sprites.torso.anims.play('marcoTorso' + this.weapons[this.currentWeaponIndex] + this.torsoAction);
				}
			} else if (this.torsoAction == 'Shoot') {
				this.torsoAction = 'Idle';
				this.sprites.torso.anims.play('marcoTorso' + this.weapons[this.currentWeaponIndex] + this.torsoAction);
			}
		}
	}, {
		key: 'preload',
		value: function preload() {
			this.scene.load.spritesheet('marcoLegs', 'img/marco/marco_legs.png', { frameWidth: 116, frameHeight: 52 });
			this.scene.load.spritesheet('marcoTorso', 'img/marco/marco_torso.png', { frameWidth: 116, frameHeight: 52 });
		}
	}, {
		key: 'create',
		value: function create() {
			var _this = this;

			/* SETUP KEYS */

			this.key_A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
			this.key_D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
			this.key_Space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

			/* LOAD SPRITES */

			this.sprites.legs = this.scene.physics.add.sprite(Math.floor(this.scene.width / 2), _config2.default.height - 119 * _config2.default.scaleY, 'marcoLegs');
			this.sprites.torso = this.scene.physics.add.sprite(Math.floor(this.scene.width / 2), _config2.default.height - 119 * _config2.default.scaleY, 'marcoTorso');

			/* SET SCALE */

			this.sprites.legs.scaleX = _config2.default.scaleX;
			this.sprites.legs.scaleY = _config2.default.scaleY;

			this.sprites.torso.scaleX = _config2.default.scaleX;
			this.sprites.torso.scaleY = _config2.default.scaleY;

			/* SET COLLISIONS */

			this.sprites.legs.setCollideWorldBounds(true);
			this.sprites.torso.setCollideWorldBounds(true);

			/* SET ANIMATIONS */

			this.scene.anims.create({
				key: 'marcoLegsIdle',
				frames: this.scene.anims.generateFrameNumbers('marcoLegs', { start: 0, end: 2 }),
				frameRate: 5,
				repeat: -1
			});

			this.scene.anims.create({
				key: 'marcoLegsJump',
				frames: this.scene.anims.generateFrameNumbers('marcoLegs', { start: 3, end: 3 }),
				frameRate: 1,
				repeat: -1
			});

			this.scene.anims.create({
				key: 'marcoLegsRun',
				frames: this.scene.anims.generateFrameNumbers('marcoLegs', { start: 4, end: 15 }),
				frameRate: 18,
				repeat: -1
			});

			this.scene.anims.create({
				key: 'marcoTorsoPistolIdle',
				frames: this.scene.anims.generateFrameNumbers('marcoTorso', { start: 0, end: 5 }),
				frameRate: 18,
				repeat: -1
			});

			this.scene.anims.create({
				key: 'marcoTorsoPistolShoot',
				frames: this.scene.anims.generateFrameNumbers('marcoTorso', { start: 6, end: 9 }),
				frameRate: 12,
				repeat: -1
			});

			this.scene.anims.create({
				key: 'marcoTorsoShotgunIdle',
				frames: this.scene.anims.generateFrameNumbers('marcoTorso', { start: 10, end: 15 }),
				frameRate: 18,
				repeat: -1
			});

			this.scene.anims.create({
				key: 'marcoTorsoShotgunShoot',
				frames: this.scene.anims.generateFrameNumbers('marcoTorso', { start: 16, end: 19 }),
				frameRate: 12,
				repeat: -1
			});

			this.scene.anims.create({
				key: 'marcoTorsoUziIdle',
				frames: this.scene.anims.generateFrameNumbers('marcoTorso', { start: 20, end: 25 }),
				frameRate: 18,
				repeat: -1
			});

			this.scene.anims.create({
				key: 'marcoTorsoUziShoot',
				frames: this.scene.anims.generateFrameNumbers('marcoTorso', { start: 26, end: 29 }),
				frameRate: 12,
				repeat: -1
			});

			/* START BASE ANIMATIONS */

			this.sprites.legs.anims.play('marcoLegsIdle');
			this.sprites.torso.anims.play('marcoTorsoPistolIdle');

			/* SETUP MINOR KEY ACTIONS */
			this.scene.input.keyboard.on('keydown_Z', function () {
				_this.changeWeapon();
			});
		}
	}, {
		key: 'update',
		value: function update() {
			if (this.key_A.isDown) {
				if (this.direction != 'left') this.changeDirection('left');

				this.run(true);

				this.sprites.legs.x--;
				this.sprites.torso.x--;
			} else if (this.key_D.isDown) {
				if (this.direction != 'right') this.changeDirection('right');

				this.run(true);

				this.sprites.legs.x++;
				this.sprites.torso.x++;
			} else {
				this.run(false);
			}

			if (this.key_Space.isDown) this.fireWeapon(true);else this.fireWeapon(false);
		}
	}]);

	return Marco;
}();

exports.default = Marco;

},{"config":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var width = Math.floor(window.innerWidth * window.devicePixelRatio * 0.95);
var height = Math.floor(window.innerHeight * window.devicePixelRatio * 0.95);

var ENV_WIDTH = 1024;
var ENV_HEIGHT = 184;

height = Math.floor(ENV_HEIGHT * width / ENV_WIDTH);

var scaleX = width / ENV_WIDTH;
var scaleY = height / ENV_HEIGHT;

exports.default = {
	width: width,
	height: height,
	scaleX: scaleX,
	scaleY: scaleY
};

},{}],6:[function(require,module,exports){
'use strict';

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _BootScene = require('Scenes/BootScene');

var _BootScene2 = _interopRequireDefault(_BootScene);

var _MenuScene = require('Scenes/MenuScene');

var _MenuScene2 = _interopRequireDefault(_MenuScene);

var _GameScene = require('Scenes/GameScene');

var _GameScene2 = _interopRequireDefault(_GameScene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var width = _config2.default.width;
var height = _config2.default.height;

_GameScene2.default.setWidth(width);
_GameScene2.default.setHeight(height);

var gameConfig = {
	type: Phaser.AUTO,
	parent: 'game',
	width: width,
	height: height,
	scene: [_BootScene2.default, _MenuScene2.default, _GameScene2.default]
};

// eslint-disable-next-line no-unused-vars
var game = new Phaser.Game(gameConfig);

},{"Scenes/BootScene":1,"Scenes/GameScene":2,"Scenes/MenuScene":3,"config":5}]},{},[6]);
