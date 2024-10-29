import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';

import StartGame from './main';
import { EventBus } from './EventBus';

export interface IRefPhaserGame {
	game: Phaser.Game | null;
	scene: Phaser.Scene | null;
}

interface IProps {
	currentActiveScene?: (scene_instance: Phaser.Scene) => void
}

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(
	function PhaserGame({ currentActiveScene }, ref) {
		const game = useRef<Phaser.Game | null>(null);
		useLayoutEffect(
			() => {
				if (game.current === null) {
					game.current = StartGame("game-container");
					if (typeof ref === 'function') {
						ref({ game: game.current, scene: null });
					} else if (ref) {
						ref.current = { game: game.current, scene: null };
					}
				}

				return () => {
					if (game.current) {
						game.current.destroy(true);
						game.current = null;
					}
				};
			},
			[ref],
		);

		useEffect(
			() => {
				EventBus.on(
					'current-scene-ready',
					(scene: Phaser.Scene) => {
						currentActiveScene?.(scene);
						if (typeof ref === 'function') {
							ref({ scene, game: game.current });
						} else if (ref) {
							ref.current = { scene, game: game.current };
						}
					},
				);

				return () => {
					EventBus.removeListener('current-scene-ready');
				};
			},
			[currentActiveScene, ref],
		);

		return (
			<div id="game-container"></div>
		);
	},
);
