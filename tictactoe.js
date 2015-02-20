var game = {

	turn: 0,
	player: '',
	comp: '',
	prevMove: '',

	board: [
		'#top-left', 			//0
		'#top-middle', 		//1
		'#top-right', 		//2
		'#center-left', 	//3
		'#center-middle', //4
		'#center-right', 	//5
		'#bottom-left', 	//6
		'#bottom-middle', //7
		'#bottom-right' 	//8
	],

	openSpaces: [
		'#top-left', 			//0
		'#top-middle', 		//1
		'#top-right', 		//2
		'#center-left', 	//3
		'#center-middle', //4
		'#center-right', 	//5
		'#bottom-left', 	//6
		'#bottom-middle', //7
		'#bottom-right' 	//8
	],

	init: function init () {
		this.turn = 0;
		this.player = prompt('X XOR O?');
		this.comp = this.player === 'X' ? 'O' : 'X';
	},


	playerTurn: function playerTurn () {
		var allSquares = this.openSpaces.join(', ');
		$(allSquares).one('click', function () {
			$(this).append('<h2>' + game.player + '</h2>');
			game.prevMove = '#' + $(this).attr('id');
			var playerMarks = game.marks(game.player);
			if (game.openSpaces.length > 0) {
				game.compTurn();
			} else {
				game.over();
			}
		});
	},

	over: function over () {
		console.log('game over');
	},

	compTurn: function compTurn () {
		// get all player moves
		var playerMoves = game.marks(game.player);

		// check player win
		var playerWin = game.checkWin(playerMoves);

		if (playerWin) {
			console.log('player win message here');
		} else if (compWin) {
			console.log('comp win message here');
		}

		// set avail spaces after player moves
		game.openSpaces = game.disableSpace(game.prevMove, game.openSpaces);
		var idx = Math.floor((Math.random() * game.openSpaces.length));

		// draw letter to view
		$(game.openSpaces[idx]).append('<h2>' + game.comp + '</h2>');

		// set prevMove to last move
		game.prevMove = '#' + $(game.openSpaces[idx]).attr('id');

		// remove lastMove from openSpaces
		game.openSpaces = game.disableSpace(game.prevMove, game.openSpaces);

		// get all comp moves to check if comp win
		var compMarks = game.marks(game.comp);

		if (compMarks.length > 0) {
			// check for comp win
			var compWin = game.checkWin(compMarks);
		}
		if (compWin) {
			console.log('compWin');
		}
		//	//this.gameOver();
		//} else {
		//	console.log('line65');
		//	// set available moves after comp turn

		//if (game.openSpaces.length > 0) {
		//	game.playerTurn();
		//} else {
		//	game.over();
		//}
		//}
	},

	disableSpace: function disableSpace (lastMove, remaining) {
		remaining = remaining || this.openSpaces;
		for (var i = 0; i < remaining.length; i++) {
			if (remaining[i] === lastMove) {
				remaining.splice(i, 1);
			}
		}
		return remaining;
	},

	// returns array showing where all player or comp marks are
	marks: function marks (icon) {
		var played = [];
		var loc;
		for (var i = 0; i < game.board.length - 1; i++) {
			//var loc = $(game.board[i]).find('h2').text();
			if ( icon === $(game.board[i]).find('h2').text() ) {
				played.push(i);
			}
		}
		return played;
	},

	// sets remaining moves by removing last move from board array
	// INPUT >> marks(), game.board

	// check for player win
	//	if (playerMarks.length > 0) {
	//		var playerWin = game.checkWin(playerMarks);
	//	}
	//	if (playerWin) {
	//		console.log(playerWin);
	//	} else {
	//		// set available moves after player turn
	//		game.disableSpace(playerMarks, game.board);
	//	}
	//},

	//// player positions
	//playerMarks: function() {
	//	return game.marks(game.player)
	//},


	// >> currentPositions();
	checkWin: function checkWin (moves) {
		//var check = function (testNum) {
		//	moves.some(function (elem) { return elem === testNum });
		//};
	// sort
	//moves = moves.sort(function (a, b) { return a < b });
		if (moves.length > 2) {

		// win combo?
			if (moves.check(0)) {
				if (moves.check(1)) {
					if (moves.check(2)) {
						console.log('win');
					}
				}
				if (moves.check(3)) {
					if (moves.check(6)) {
						console.log('win');
					}
				}
				if (moves.check(4)) {
					if (moves.check(8)) {
						console.log('win');
					}
				}
			}
			if (moves.check(1) && moves.check(4) && moves.check(7)) {
				console.log('win');
			}
			if (moves.check(2)) {
				if (moves.check(4) && moves.check(6)) {
					console.log('win');
				}
				if (moves.check(5) && moves.check(8)) {
					console.log('win');
				}
			}
			if (moves.check(3) && moves.check(4) && moves.check(5)) {
				console.log('win');
			}
			if (moves.check(6) && moves.check(7) && moves.check(8)) {
				console.log('win');
			}

		}
	}
}; // game object

game.init();
	// while (!win) {
//game.compTurn();
game.playerTurn();
	// }
	//game.over();

Array.prototype.check = function(e) {
	return this.some(function(a) {
		return a === e;
	});
};

// jQuery that I can't get to play nice
// $(document).ready(function () {
// 	$('#myModal').modal();
// 	$('#x').on('click', function () {
// 		game.player = "X";
// 		game.comp = "O";
// 	});
// 	$('#o').on('click', function () {
// 		game.player = "O";
// 		game.comp = "X";
// 	});
// });