import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene {
	logo: GameObjects.Image;
	title: GameObjects.Text;
	logoTween: Phaser.Tweens.Tween | null;

	constructor () {
		super('MainMenu');
	}

	create () {
		this.logo = this.add.image(800, 450, 'logo')
			.setAlpha(0.8)
			.setDepth(100)
			.setInteractive()
			.on(
				'pointerdown',
				() => {
					this.moveLogo();
				},
			);

		this.title = this.add.text(
			800,
			500,
			'Main Menu',
			{
				fontFamily: 'Arial Black',
				fontSize: 38,
				color: '#ffffff',
				stroke: '#000000',
				strokeThickness: 8,
				align: 'center',
			},
		)
			.setOrigin(0.5)
			.setDepth(100);

		this.moveLogo();

		EventBus.emit('current-scene-ready', this);
	}

	changeScene () {
		if (this.logoTween) {
			this.logoTween.stop();
			this.logoTween = null;
		}

		this.scene.start('Game');
	}

	moveLogo (vueCallback?: ({ x, y }: { x: number, y: number }) => void) {
		if (this.logoTween) {
			if (this.logoTween.isPlaying()) {
				this.logoTween.pause();
			} else {
				this.logoTween.play();
			}
		} else {
			this.logoTween = this.tweens.add({
				targets: this.logo,
				x: { value: 1200, duration: 3000, ease: 'Back.easeInOut' },
				y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
				yoyo: true,
				repeat: -1,
				onUpdate: vueCallback && (() => {
					vueCallback({
						x: Math.floor(this.logo.x),
						y: Math.floor(this.logo.y)
					});
				}),
			});
		}
	}
}
