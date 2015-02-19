var game = {
	turn: 0,
	player: "",
	comp: "",

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
			game.setOpenSpaces(game.playerMarks, game.openSpaces);
			game.compTurn();
		});

	},

	compTurn: function () {
		//var choices = [0, 2, 6, 8];
		var idx = Math.floor((Math.random() * game.openSpaces.length));
		//var choice = choices[idx];

		$(game.openSpaces[idx]).append('<h2>' + game.comp + '</h2>');

		//// get comp moves
		var compMarks = game.marks(game.comp);
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
			game.board = game.setOpenSpaces(compMarks, game.openSpaces);
		//}
	},

	setOpenSpaces: function (currentPositions, boardIds) {
		// if symbol in game.board array, remove id/"square" from game.board
		for (var i = 0; i < currentPositions.length; i++) {
			for (var j = 0; j < boardIds.length; j++) {
				if (currentPositions[i] === j) {
					boardIds.splice(j, 1);
				}
			}
		}
		return boardIds;
	},
	// returns array of all game.board index that has specified icon
	marks: function (icon) {
		var positions = [];
		var loc;
		for (var i = 0; i < game.board.length; i++) {
			//var loc = $(game.board[i]).find('h2').text();
			if ( icon === $(game.board[i]).find('h2').text() ) {
				positions.push(i);
			}
		}
		return positions;
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
	//		game.setOpenSpaces(playerMarks, game.board);
	//	}
	//},

	// player positions
	playerMarks: function() {
		return game.marks(game.player)
	},


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
game.compTurn();
game.playerTurn();
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