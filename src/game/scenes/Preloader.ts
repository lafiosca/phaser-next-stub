import { Scene } from 'phaser';

export class Preloader extends Scene {
	constructor () {
		super('Preloader');
	}

	init () {
		this.add.rectangle(800, 450, 808, 32).setStrokeStyle(1, 0xffffff);
		const bar = this.add.rectangle(112, 450, 4, 28, 0xffffff);
		this.load.on(
			'progress',
			(progress: number) => {
				bar.width = 4 + (800 * progress);
			},
		);
	}

	preload () {
		this.load.setPath('assets');
		this.load.image('logo', 'logo.png');
		this.load.image('star', 'star.png');
	}

	create () {
		this.scene.start('MainMenu');
	}
}
