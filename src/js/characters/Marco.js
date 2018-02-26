import config from 'config';

class Marco {
	constructor(scene) {
		this.scene = scene;
		this.sprites = {};
		this.direction = 'right';
		this.legAction = 'Idle';
		this.torsoAction = 'Idle';
		this.weapons = ['Pistol', 'Shotgun', 'Uzi'];
		this.currentWeaponIndex = 0;
	}

	changeDirection(direction) {
		this.sprites.legs.scaleX = (-this.sprites.legs.scaleX);
		this.sprites.torso.scaleX = (-this.sprites.torso.scaleX);

		this.direction = direction;
	}

	run(run) {
		if(run) {
			if(this.legAction != 'Run' && this.legAction != 'jump') {
				this.sprites.legs.anims.play('marcoLegsRun');
				this.legAction = 'Run';
			}
		}
		else if(this.legAction == 'Run') {
			this.sprites.legs.anims.play('marcoLegsIdle');
			this.legAction = 'Idle';
		}
	}

	changeWeapon(index) {
		if(index != this.currentWeaponIndex) {
			if(index !== undefined)
				this.currentWeaponIndex = index;
			else
				this.currentWeaponIndex = (this.currentWeaponIndex + 1) % this.weapons.length;

			this.sprites.torso.anims.play(`marcoTorso${this.weapons[this.currentWeaponIndex]}${this.torsoAction}`);
		}
	}

	fireWeapon(fire) {
		if(fire) {
			if(this.torsoAction != 'Shoot') {
				this.torsoAction = 'Shoot';
				this.sprites.torso.anims.play(`marcoTorso${this.weapons[this.currentWeaponIndex]}${this.torsoAction}`);
			}
		}
		else if(this.torsoAction == 'Shoot') {
			this.torsoAction = 'Idle';
			this.sprites.torso.anims.play(`marcoTorso${this.weapons[this.currentWeaponIndex]}${this.torsoAction}`);
		}
	}

	preload() {
		this.scene.load.spritesheet('marcoLegs', 'img/marco/marco_legs.png', {frameWidth: 116, frameHeight: 52});
		this.scene.load.spritesheet('marcoTorso', 'img/marco/marco_torso.png', {frameWidth: 116, frameHeight: 52});
	}

	create() {
		/* SETUP KEYS */

		this.key_A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.key_D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.key_Space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		/* LOAD SPRITES */

		this.sprites.legs = this.scene.physics.add.sprite(Math.floor(this.scene.width / 2), config.height - (119 * config.scaleY), 'marcoLegs');
		this.sprites.torso = this.scene.physics.add.sprite(Math.floor(this.scene.width / 2), config.height - (119 * config.scaleY), 'marcoTorso');

		/* SET SCALE */

		this.sprites.legs.scaleX = config.scaleX;
		this.sprites.legs.scaleY = config.scaleY;

		this.sprites.torso.scaleX = config.scaleX;
		this.sprites.torso.scaleY = config.scaleY;

		/* SET COLLISIONS */

		this.sprites.legs.setCollideWorldBounds(true);
		this.sprites.torso.setCollideWorldBounds(true);

		/* SET ANIMATIONS */

		this.scene.anims.create({
			key: 'marcoLegsIdle',
			frames: this.scene.anims.generateFrameNumbers('marcoLegs', {start: 0, end: 2}),
			frameRate: 5,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'marcoLegsJump',
			frames: this.scene.anims.generateFrameNumbers('marcoLegs', {start: 3, end: 3}),
			frameRate: 1,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'marcoLegsRun',
			frames: this.scene.anims.generateFrameNumbers('marcoLegs', {start: 4, end: 15}),
			frameRate: 18,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'marcoTorsoPistolIdle',
			frames: this.scene.anims.generateFrameNumbers('marcoTorso', {start: 0, end: 5}),
			frameRate: 18,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'marcoTorsoPistolShoot',
			frames: this.scene.anims.generateFrameNumbers('marcoTorso', {start: 6, end: 9}),
			frameRate: 12,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'marcoTorsoShotgunIdle',
			frames: this.scene.anims.generateFrameNumbers('marcoTorso', {start: 10, end: 15}),
			frameRate: 18,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'marcoTorsoShotgunShoot',
			frames: this.scene.anims.generateFrameNumbers('marcoTorso', {start: 16, end: 19}),
			frameRate: 12,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'marcoTorsoUziIdle',
			frames: this.scene.anims.generateFrameNumbers('marcoTorso', {start: 20, end: 25}),
			frameRate: 18,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'marcoTorsoUziShoot',
			frames: this.scene.anims.generateFrameNumbers('marcoTorso', {start: 26, end: 29}),
			frameRate: 12,
			repeat: -1,
		});

		/* START BASE ANIMATIONS */

		this.sprites.legs.anims.play('marcoLegsIdle');
		this.sprites.torso.anims.play('marcoTorsoPistolIdle');

		/* SETUP MINOR KEY ACTIONS */
		this.scene.input.keyboard.on('keydown_Z', () => {
			this.changeWeapon();
		});
	}

	update() {
		if(this.key_A.isDown) {
			if(this.direction != 'left')
				this.changeDirection('left');

			this.run(true);

			this.sprites.legs.x--;
			this.sprites.torso.x--;
		}
		else if(this.key_D.isDown) {
			if(this.direction != 'right')
				this.changeDirection('right');

			this.run(true);

			this.sprites.legs.x++;
			this.sprites.torso.x++;
		}
		else {
			this.run(false);
		}

		if(this.key_Space.isDown)
			this.fireWeapon(true);
		else
			this.fireWeapon(false);
	}
}

export default Marco;
