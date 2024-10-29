import { AUTO, Game } from 'phaser';

import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

const config: Phaser.Types.Core.GameConfig = {
	type: AUTO,
	width: 1600,
	height: 900,
	scale: {
		parent: 'game-container',
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		min: {
			width: 400,
			height: 225,
		},
		max: {
			width: 2400,
			height: 1350,
		},
	},
	backgroundColor: '#000000',
	scene: [
		Boot,
		Preloader,
		MainMenu,
		MainGame,
		GameOver
	]
};

const StartGame = (parent: string) => {
	return new Game({ ...config, parent });
}

export default StartGame;
