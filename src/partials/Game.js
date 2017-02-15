import {
	SVG_NS,
	KEYS
} from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.pause = false;
		this.gameElement = document.getElementById(this.element);
		this.magentaBallExist = false;
		this.boardGap = 10;
		this.paddleWidth = 8;
		this.paddleHeight = 56;


		this.board = new Board(this.width, this.height);
		this.paddle1 = new Paddle(this.height,

			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			((this.height - this.paddleHeight) / 2),
			KEYS.a,
			KEYS.z);

		this.paddle2 = new Paddle(this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			((this.height - this.paddleHeight) / 2),
			KEYS.up,
			KEYS.down);

		this.ball = new Ball(8, this.width, this.height);
		this.magentaBall = new Ball(8, this.width, this.height);
		this.score1 = new Score(this.width / 2 - 50, 30, 30);
		this.score2 = new Score(this.width / 2 + 50, 30, 30);

		document.addEventListener('keydown', event => {
			switch (event.keyCode) {
				case KEYS.spaceBar:
					this.pause = !this.pause;
					break;
				case KEYS.n:
					this.magentaBallExist = true;
					break;
			}
		});
	}

	render() {

		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width)
		svg.setAttributeNS(null, 'height', this.height)
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);
		let gameOver

		if (this.paddle1.score === 7 || this.paddle2.score === 7) {
			let endGame = document.createElementNS(SVG_NS, 'text')
			endGame.setAttributeNS(null, 'fill', 'magenta');
			endGame.setAttributeNS(null, 'stroke', 'purple')
			endGame.setAttributeNS(null, 'stroke-width', '5px')
			endGame.setAttributeNS(null, 'x', 10);
			endGame.setAttributeNS(null, 'y', 150);
			endGame.setAttributeNS(null, 'font-size', '50px');

			if (this.paddle2.score === 1) {
				endGame.innerHTML = 'Player 2 Wins';
			} else {
				endGame.innerHTML = 'Player 1 Wins';
			}

			svg.appendChild(endGame);
			gameOver = 1
		}
		if (this.pause || gameOver === 1) {
			return;
		}

		this.board.render(svg);
		this.ball.render(svg, this.paddle1, this.paddle2);
		this.paddle1.render(svg);
		this.paddle2.render(svg);
		this.score1.render(svg, this.paddle1.score);
		this.score2.render(svg, this.paddle2.score);
		if (this.magentaBallExist) {
			this.magentaBall.render(svg, this.paddle1, this.paddle2, 1);
		}
	}
}