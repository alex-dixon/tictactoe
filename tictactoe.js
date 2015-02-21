//TODO. 1. Prompt player for another game after game ends
//TODO. 2. playerTurn and compTurn should be able to be combined and called from game.init so that only init needs to be invoked for the game to run.
//TODO. 3. A tie currently logs 'game over' to the console instead of showing a picture of a cat.
//TODO. 4. Easy, medium, and hard difficulty levels
//TODO. 5. Modals instead of prompts

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

	freeMoves: [
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
		$('h2').remove();
		this.turn = 0;
		this.player = prompt('X XOR O?');
		this.comp = this.player === 'X' ? 'O' : 'X';
		(function setBoard () {
			game.freeMoves = [];
			for (var i = 0; i < game.board.length; i++) {
				game.freeMoves.push(game.board[i]);
			}
		})();
		game.compTurn();
	},

	playerTurn: function playerTurn () {
		// when a free square is clicked, draw X or O, disable click functionality
		var allSquares = this.freeMoves.join(', ');
		$(allSquares).one('click', function () {
			$(this).append('<h2>' + game.player + '</h2>');
			$(allSquares).off('click');
			game.prevMove = '#' + $(this).attr('id');

			//update freeMoves after player moves
			game.freeMoves = game.disableSpace(game.prevMove, game.freeMoves);

			// get all player moves
			var playerMoves = game.marks(game.player);

			// check them for winning combo
			var playerWin = game.checkWin(playerMoves);

			if (playerWin) {
				game.over('player wins');
			} else if (game.freeMoves.length > 0) {
				game.move = game.move || true;
				game.compTurn();
			} else {
				game.over();
			}
		});
	},

	compTurn: function compTurn () {
		var idx = Math.floor((Math.random() * game.freeMoves.length));
		// draw letter to view
		$(game.freeMoves[idx]).append('<h2>' + game.comp + '</h2>');
		// set prevMove to last move
		game.prevMove = '#' + $(game.freeMoves[idx]).attr('id');
		// remove lastMove from freeMoves
		game.freeMoves = game.disableSpace(game.prevMove, game.freeMoves);
		// get all comp moves to check if comp win
		var compMarks = game.marks(game.comp);
		if (compMarks.length > 0) {
			// check for comp win
			var compWin = game.checkWin(compMarks);
		}
		if (compWin) {
			game.over('computer wins');
		} else if (game.freeMoves.length === 0) {
			game.over('tie');
		} else {
			game.playerTurn();
		}
	},

	disableSpace: function disableSpace (lastMove, remaining) {
		remaining = remaining || this.freeMoves;
		for (var i = 0; i < remaining.length; i++) {
			if (remaining[i] === lastMove) {
				remaining.splice(i, 1);
			}
		}
		return remaining;
	},

	// Returns array showing where all player or comp marks are.
	marks: function marks (icon) {
		var played = [];
		for (var i = 0; i < game.board.length; i++) {
			if ( icon === $(game.board[i]).find('h2').text() ) {
				played.push(i);
			}
		}
		return played;
	},

	checkWin: function checkWin (moves) {
		function makeCheck (moves) {
			return function (input) {
				return moves.some(function (element) {
						return element === input;
				});
			};
		}
		var check = makeCheck(moves);

		// win combo?
		if (moves.length > 2) {
			if (check(0)) {
				if (check(1)) {
					if (check(2)) {
						return true;
					}
				}
				if (check(3)) {
					if (check(6)) {
						return true;
					}
				}
				if (check(4)) {
					if (check(8)) {
						return true;
					}
				}
			}
			if (check(1) && check(4) && check(7)) {
				return true;
			}
			if (check(2)) {
				if (check(4) && check(6)) {
					return true;
				}
				if (check(5) && check(8)) {
					return true;
				}
			}
			if (check(3) && check(4) && check(5)) {
				return true;
			}
			if (check(6) && check(7) && check(8)) {
				return true;
			}
		}
	},

	over: function over (type) {
		if (type === 'player wins') {
			console.log('from game.over, player wins');
		} else if (type === 'computer wins') {
			console.log('from game.over, computer wins');
		} else if (type === 'tie') {
			console.log('from game.over, tie');
		}
		if ( window.confirm('Play again?') ) {
			game.init();
		} else {
			console.log('That is all.');
		}
	}

}; // game object
game.init();

//Array.prototype.check = function(e) {
//	return this.some(function(a) {
//		return a === e;
//	});
//};

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