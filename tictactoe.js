//TODO. 1. A tie logs 'game over' to the console but does not show a picture of a cat.

var game = {

	gameNum: 0,
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
		if (game.gameNum > 0) {
			setTimeout(function() {
			$('h2').remove();
			}, 2000)
		}
		game.gameNum++;

		(function setBoard () {
			game.freeMoves = [];
			for (var i = 0; i < game.board.length; i++) {
				game.freeMoves.push(game.board[i]);
			}
		})();

		if ( !(game.gameNum > 1) ) {
			(function chooseXO(question) {
				question = question || 'X XOR O?';

				$('#iconModal').modal({
					show: true,
					backdrop: true,
					keyboard: false
				});

				$('#question').html(question);
				$('#leftButton').one('click', function () {
					if (question === 'X XOR O?') {
						game.player = 'X';
						game.comp = game.player === 'X' ? 'O' : 'X';
					}
					$('#rightButton').off('click');
					$('#iconModal').modal('hide');
					game.compTurn();
				});
				$('#rightButton').one('click', function () {
					if (question === 'X XOR O?') {
						game.player = 'O';
						game.comp = game.player === 'X' ? 'O' : 'X';
					}
					$('#rightButton').off('click');
					$('#iconModal').modal('hide');
					game.compTurn();
				});
			})();
		} else {
			setTimeout(function () {
				game.compTurn();
			}, 3000);
		}
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

	//variables: corner, edge, center, block
		var center = game.board[4];

		var corner = {
			topleft: game.board[0],
			topright: game.board[2],
			bottomright: game.board[8],
			bottomleft: game.board[6]
		};

		var edge = {
			top: game.board[1],
			right: game.board[5],
			bottom: game.board[7],
			left: game.board[3]
		};

		var top = [corner.topleft, edge.top, corner.topright];
		var rightSide = [corner.topright, edge.right, corner.bottomright];
		var bottom = [corner.bottomleft, edge.bottom, corner.bottomright];
		var leftSide = [corner.topleft, edge.left, corner.bottomleft];

		var moveNum = game.freeMoves.length - 8;

		//draw move to view
		function draw (id) {
			$(id).append('<h2>' + game.comp + '</h2>');
		}

		//random 0 to num - 1
		function random (num) {
			return Math.floor((Math.random() * (num)));
		}
		// get a random property from object
		var randomProperty = function (obj, random) {
			var keys = Object.keys(obj);
			return obj[keys[ random]];
		};

		function didPlayerMove (loc) {
			var lastMove = game.prevMove.slice(1);
			for (var key in loc) {
				if (loc[key] === lastMove) {
					console.log(loc[key]);
					return true;
				}
			}
			return false;
		}

		var rIdx;

		//

		if (moveNum === 1) {
			if (random(2) === 0) {
				draw(center);
					//or if first move, move in corner

				} else {
					draw(randomProperty(corner, random(4)));
				}
			}

			//} else if (moveNum === 1 && rIdx !== 0) {


			// on second move if player marked edge on their first
			//if (move === 3 && playerMoved(corner) )

			//if player marks edge
			//move in a corner on opposite side if haven't
			//else if blocked, block their win
			//comp wins this move
			//if player marks corner
			//move in corner across the middle (opposite corner)
			//if player marks edge
			//block their win or take a corner
			//comp wins this move
			//else block
			//move in corner
			//if player move in center
			// move in corner across the middle
			//if player move corner
			//move corner & block win
			//win
			//if player move edge across middle
			//move corner on same side as prev move
			//if blocked
			//move center
			//win
			//move
			//else
			//same row or column corner
			//if blocked
			//take corner
			//win
			//if first move
			//move in center

			//draw(corner[rIdx]);
			//}


			var idx = Math.floor((Math.random() * game.freeMoves.length));

		// draw letter to view
		//$(game.freeMoves[idx]).append('<h2>' + game.comp + '</h2>');
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

		//checks baked in array for an element
		function makeCheck (moves) {
			return function (input) {
				return moves.some(function (element) {
						return element === input;
				});
			};
		}
		var check = makeCheck(moves);

		function flash (element) {
			var count = 0;
			return (function recursion () {
				return setTimeout(
					function () {
					$(element).toggle();
					count++;
						console.log(count);
					if (count === 6) {
						return true;
					} else {
						recursion();
					}
				}, 300);
			}());
		}
		// win combo?
		if (moves.length > 2) {
			if (check(0)) {
				if (check(1)) {
					if (check(2)) {
						return flash('.top-horizontal');
					}
				}
				if (check(3)) {
					if (check(6)) {
						return flash('.left-vertical');
					}
				}
				if (check(4)) {
					if (check(8)) {
						return flash('.left-diagonal');
					}
				}
			}
			if (check(1) && check(4) && check(7)) {
				return flash('.middle-vertical');
			}
			if (check(2)) {
				if (check(4) && check(6)) {
					return flash('.right-diagonal');
				}
				if (check(5) && check(8)) {
					return flash('.right-vertical');
				}
			}
			if (check(3) && check(4) && check(5)) {
				return flash('.middle-horizontal');
			}
			if (check(6) && check(7) && check(8)) {
				return flash('.bottom-horizontal');
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
			game.init();
	}

}; // game object
game.init();