var game = {

	turn: 0,
	player: '',
	comp: '',
	prevMove: '',

	init: function() {
		this.turn = 0;
		this.player = prompt('X XOR O?');
		this.comp = this.player === 'X' ? 'O' : 'X';
	},

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


	playerTurn: function () {
		var allSquares = this.openSpaces.join(', ');
		$(allSquares).one('click', function () {
			$(this).append('<h2>' + game.player + '</h2>');
			game.prevMove = '#' + $(this).attr('id');
			//var playerMarks = game.marks(game.player);
			//game.openSpaces = game.disableSpace(playerMarks, game.openSpaces);
			if (game.openSpaces.length > 0) {
				game.compTurn();
			} else {
				game.over();
			}
		});
	},

	over: function() {
		console.log('game over');
	},

	compTurn: function () {
		//var playerMarks = game.marks(game.player);

		game.openSpaces = game.disableSpace(game.prevMove, game.openSpaces);
		var idx = Math.floor((Math.random() * game.openSpaces.length));
		// draw letter to view
		$(game.openSpaces[idx]).append('<h2>' + game.comp + '</h2>');
		// set prevMove to last move
		game.prevMove = '#' + $(game.openSpaces[idx]).attr('id');
		// remove lastMove from openSpaces
		game.openSpaces = game.disableSpace(game.prevMove, game.openSpaces);
		//
		//var compMarks = game.marks(game.comp);
		//if (compMarks.length > 0) {
		//	// check for comp win
		//	var compWin = game.checkWin(game.comp, compMarks);
		//}
		//if (compWin) {
		//	console.log('compWin');
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
	//TODO. Debug disableSpace(). Check parameters and loops.
	//resets openSpaces array based on where marks(computer or player) exist
	//marks should be one value to remove so that only one space is removed per turn,
	// instead of all moves made by player or computer like it is now
	//prevMove needs to be content/idname, not idx
	disableSpace: function disableSpace (lastMove, remaining) {
		remaining = remaining || this.openSpaces;
		for (var i = 0; i < remaining.length; i++) {
			if (remaining[i] === lastMove) {
				remaining.splice(i, 1);
			}
		}
		return remaining;
	},

	// returns array of all game.board index that has specified icon
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
	checkWin: function (currentBoard) {
		var check = function (num) {
			currentBoard.some(function (elem) { return elem === num })
		};
	// sort
	//currentBoard = currentBoard.sort(function (a, b) { return a < b });
		if (currentBoard.length > 2) {

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
	// while (!win) {
//game.compTurn();
//game.playerTurn();
	// }
	//game.over();


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