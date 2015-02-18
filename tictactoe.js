var game = {
	turn: 0,
	playerIcon: "",
	compIcon: "",
												// TODO. There is no win. Win logs 3 times.
play: function () {
	//computer turn
	var choices = [0, 2, 6, 8];
	var idx = (Math.random(4) * 4).toFixed();
	var choice = choices[idx];
	$(game.board[choice]).append('<h2>' + game.compIcon + '</h2>');

	// get comp moves
	var currentPositions = game.getPositions(game.compIcon);

	// check for comp win
	var compWin = game.checkWin(currentPositions, this.winCombo);

	if (compWin) {
		console.log('from 20');
		//this.gameOver();
	} else {

		// based on moves made, set available moves
		// TODO. This means comp needs to check if move is valid before moving.
		//var currentPositions = game.getPositions(game.compIcon);
		game.setAvailableMoves(currentPositions, game.board);
	}
	// player move
	var allSquares = this.board.join(', ');
	$(allSquares).on('click', function () {
		$(this).append('<h2>' + game.playerIcon + '</h2>');
	});
},
// sets remaining moves by removing last move from board array
// INPUT >> getPositions(), game.board

setAvailableMoves: function (currentPositions, boardIds) {
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
	
init: function() {
	this.turn = 0;
	this.playerIcon = prompt('X XOR O?');
	this.compIcon = this.playerIcon === 'X' ? 'O' : 'X';
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

winCombo: [
	'012',
	'345',
	'678',	    // 0  1  2
	'036',
	'147',
	'258',      // 3  4  5
	'048',
	'246'],     // 6  7  8

	// if 0
			 // check 1 check 2.
			 // check 3 check 6.
			 // check 4 check 8.
	// if 1
			 // check 4 check 7.
	// if 2
			 // check 4 check 6.
			 // check 5 check 8.
	// if 3
			 // check 4 check 5.
	// if 6
			 // check 7 check 8.

// returns array of all game.board index that has specified icon
getPositions: function (icon) {
  var found = [];
  var idx = 0;
  while (idx < game.board.length) {
    var loc = $(game.board[idx]).find('h2').text();
    if (icon === loc) {
      found.push(idx);
    }
    idx += 1;
  }
  return found;
// }
// getPositions(playerIcon);
// getPositions(computerIcon);
},

//changeTurn: function (turn) {
//  return turn === 0 ? 1 : 0;
//},


// >> currentPositions()
checkWin: function(currentBoard) {
	// sort
	currentBoard = currentBoard.sort(function (a, b) { return a - b });
	if (currentBoard.length > 2) {
		function check(num, array) {
			array.some(function (a) { return a == num });
		}
		// win combo?
			if (check(0)) {
				if (check(1)) {
					if (check(2)) {
						//win
					}
				}
				if (check(3)) {
					if (check(6)) {
						//win
					}
				}
				if (check(4)) {
					if (check(8)) {
						//win
					}
				}
			}
			if(check(1) && check(4) && check(7)) {
				//win
			}
			if (check(2)) {
				if (check(4) && check(6)) {
					//win
				}
				if (check(5) && check(8)) {
					//win
				}
			}
			if (check(3) && check(4) && check(5)) {
				//win
			}
			if (check(6) && check(7) && check(8)) {
				//win
			}
		}
	}


// over: function () {
//   return true;
// }
}; // game object

game.init();
// while (!win) {
game.play();
// }
//game.over();





// WTF JQUERY????????????????????????
// $(document).ready(function () {
// 	$('#myModal').modal();
// 	$('#x').on('click', function () {
// 		game.playerIcon = "X";
// 		game.compIcon = "O";
// 	});
// 	$('#o').on('click', function () {
// 		game.playerIcon = "O";
// 		game.compIcon = "X";
// 	});
// });