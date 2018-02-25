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
				_this2.scene.start('GameScene');
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
		return _this;
	}

	_createClass(GameScene, [{
		key: 'preload',
		value: function preload() {
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
	}, {
		key: 'create',
		value: function create() {
			this.scene.start('GameScene');
			console.log('Game started!');

			for (var i = 0; i < GameScene.width / (128 * _config2.default.TILE_SCALE); i++) {
				for (var j = 0; j < GameScene.height / (128 * _config2.default.TILE_SCALE); j++) {
					var index = Math.floor(Math.random() * GameScene.TILES.length);
					var img = this.add.image(i * (128 * _config2.default.TILE_SCALE) + 64 * _config2.default.TILE_SCALE, j * (128 * _config2.default.TILE_SCALE) + 64 * _config2.default.TILE_SCALE, GameScene.TILES[index]);
					img.setScale(_config2.default.TILE_SCALE, _config2.default.TILE_SCALE);
				}
			}
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

GameScene.TILES = ['redTile', 'orangeTile', 'yellowTile', 'greenTile', 'blueTile', 'indigoTile', 'blackTile', 'brownTile', 'greyTile', 'pinkTile', 'purpleTile'];

exports.default = GameScene;

},{"config":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var width = Math.floor(window.innerWidth * window.devicePixelRatio * 0.95);
var height = Math.floor(window.innerHeight * window.devicePixelRatio * 0.95);

var modulus = function modulus(n, k) {
	var iters = 0;

	while (n > k) {
		iters++;
		n -= k;
	}

	return iters;
};

var TILE_SCALE = 0.125;

width = modulus(width, 128 * TILE_SCALE) * 128 * TILE_SCALE;
height = modulus(height, 128 * TILE_SCALE) * 128 * TILE_SCALE;

exports.default = {
	width: width,
	height: height,
	TILE_SCALE: TILE_SCALE
};

},{}],4:[function(require,module,exports){
'use strict';

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _BootScene = require('Scenes/BootScene');

var _BootScene2 = _interopRequireDefault(_BootScene);

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
	scene: [_BootScene2.default, _GameScene2.default]
};

// eslint-disable-next-line no-unused-vars
var game = new Phaser.Game(gameConfig);

},{"Scenes/BootScene":1,"Scenes/GameScene":2,"config":3}]},{},[4]);
