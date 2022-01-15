import React, { useState } from 'react';
import Box from './Box';

const TicTacToe = () => {
	let [ matrix, setMatrix ] = useState([ [ '?', '?', '?' ], [ '?', '?', '?' ], [ '?', '?', '?' ] ]);
	const [ done, setDone ] = useState(0);
	let player = 0;
	const change = async () => {
		let k = 0;
		while (true) {
			player = k;
			let a = Math.floor((Math.random() * 100) % 3),
				b = Math.floor((Math.random() * 100) % 3);
			let temp = [ ...matrix ];
			while (temp[a][b] != '?') {
				a = Math.floor((Math.random() * 100) % 3);
				b = Math.floor((Math.random() * 100) % 3);
			}
			if (player === 1) temp[a][b] = 'X';
			else temp[a][b] = 'O';
			setMatrix(temp);
			k = 1 - k;
			if (CheckWinner()) {
				setDone(1);
				break;
			}
		}
	};
	const reset = async () => {
		console.log(matrix);
		await setMatrix([ [ '?', '?', '?' ], [ '?', '?', '?' ], [ '?', '?', '?' ] ]);
	};
	const announceWinner = (p, q, r, s) => {
		if (p == 3 || r == 3) {
			alert('Player 1 wins');
			return 1;
		} else if (q == 3 || s == 3) {
			alert('Player 2 Wins');
			return 1;
		}
		return 0;
	};
	const CheckWinner = () => {
		let d11 = 0,
			d12 = 0,
			d21 = 0,
			d22 = 0;
		for (let i = 0; i < 3; i++) {
			let p = 0,
				q = 0,
				r = 0,
				s = 0;
			for (let j = 0; j < 3; j++) {
				if (matrix[i][j] == 'X') p++;
				else if (matrix[i][j] == 'O') q++;

				if (matrix[j][i] == 'X') r++;
				else if (matrix[j][i] == 'O') s++;
			}
			if (announceWinner(p, q, r, s)) return 1;

			if (matrix[i][i] == 'X') d11++;
			else if (matrix[i][i] == 'O') d12++;

			if (matrix[i][2 - i] == 'X') d21++;
			else if (matrix[i][2 - i] == 'O') d22++;

			if (announceWinner(d11, d12, d21, d22)) return 1;
		}
		let count = 0;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (matrix[i][j] != '?') count++;
			}
		}
		if (count == 9) {
			alert('Draw');
			return 1;
		}
		return 0;
	};
	useState(async () => {
		if (done == 1) {
			await setDone(0);
			await setMatrix([ [ '?', '?', '?' ], [ '?', '?', '?' ], [ '?', '?', '?' ] ]);
			console.log(done, setDone(0));
		}
	}, [done,matrix]);
	return (
		<div>
			<h2>
				Player {player + 1}
				<button onClick={() => change()}>Play</button>
			</h2>
			<br />
			<div>
				<Box val={matrix[0][0]} />
				<Box val={matrix[0][1]} />
				<Box val={matrix[0][2]} />
			</div>
			<div>
				<Box val={matrix[1][0]} />
				<Box val={matrix[1][1]} />
				<Box val={matrix[1][2]} />
			</div>
			<div>
				<Box val={matrix[2][0]} />
				<Box val={matrix[2][1]} />
				<Box val={matrix[2][2]} />
			</div>
			<div />
		</div>
	);
};

export default TicTacToe;
