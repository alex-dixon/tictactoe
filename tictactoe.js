var game = {

	turn: 0,
	playerIcon: "",
	computerIcon: "",
	
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

	win: ['012', '345', '678',	    	  // 0  1  2
         	 '036', '147', '258',       // 3  4  5
           	 	    '048', '642'],      // 6  7  8

  changeTurn: function (turn) {
    return turn === 0 ? 1 : 0;
  }, 

  playerMove: function () {
    $(this.board.join(', ')).on('click', function() {
    $(this).append('<h2>' + game.playerIcon + '</h2>');
    }
  )}

//game
};
game.init();
game.playerMove();

// if turn 0 comp move
// if turn 1 player move
// if win state break loop state winner

/*
  // 'checkWin': function() {
  //        currentBoard = currentBoard.sort(function () { return a - b });


function turn() {

}

compMove();

function compMove() {
	if (MOVES === 0) {
		var choices = [0, 2, 6, 8];
		var idx = (Math.random( 4 - 0) * 4).toFixed();
		var choice = choices[idx];
		$(BOARD[choice]).append("<h2>" + COMP_SYMBOL + "</h2>");
	} else if (MOVES === 2) {
		$(BOARD[4]).append("<h2>" + COMP_SYMBOL + "</h2>");
	} else if (MOVES === 4) {
		$(BOARD[4]).append("<h2>" + COMP_SYMBOL + "</h2>");
	} else {
		console.log(MOVES);
	}
	MOVES++;
	playerMove();
}
function playerMove() {
	$(BOARD.join(', ')).on('click', function() {
		$(this).append("<h2>" + PLAYER_SYMBOL + "</h2>");
		// state manager function
		});

}
// WTF JQUERY
$(document).ready(function () {
	$('#myModal').modal();
	$('#x').on('click', function () {
		game.playerIcon = "X";
		game.compIcon = "O";
	});
	$('#o').on('click', function () {
		game.playerIcon = "O";
		game.compIcon = "X";
	});
});

*/