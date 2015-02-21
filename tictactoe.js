//TODO. 1. Comp doesn't move first
//TODO. 2. Player can click on a comp move and move
//TODO. 3. game.init() should reset the game, or game.reset() should do this

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
			//game.openSpaces = game.disableSpace(playerMarks, game.openSpaces);
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

		if (moves.length > 2) {

		// win combo?
			if (check(0)) {
				if (check(1)) {
					if (check(2)) {
						console.log('win');
					}
				}
				if (check(3)) {
					if (check(6)) {
						console.log('win');
					}
				}
				if (check(4)) {
					if (check(8)) {
						console.log('win');
					}
				}
			}
			if (check(1) && check(4) && check(7)) {
				console.log('win');
			}
			if (check(2)) {
				if (check(4) && check(6)) {
					console.log('win');
				}
				if (check(5) && check(8)) {
					console.log('win');
				}
			}
			if (check(3) && check(4) && check(5)) {
				console.log('win');
			}
			if (check(6) && check(7) && check(8)) {
				console.log('win');
			}

		}
	}
}; // game object

game.init();
game.playerTurn();

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