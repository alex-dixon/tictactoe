var MOVES = 9;	
var PLAYER_SYMBOL = "";
var COMP_SYMBOL = "";	
var BOARD = [
	'#top-left',					// 0
	'#top-middle',				// 1
	'#top-right',				  // 2
	'#center-left',			  // 3
	'#center-middle',		  // 4
	'#center-right',			// 5
	'#bottom-left',			  // 6
	'#bottom-middle',		  // 7
	'#bottom-right'			  // 8
];

var win = ['012', '345', '678',	      // 0  1  2
           '036', '147', '258',       // 3  4  5
                  '048', '642'];      // 6  7  8

(function setSymbols() {
	PLAYER_SYMBOL = prompt("X or O?");
	if (/[XxOo]/.test(PLAYER_SYMBOL)) {
		if (PLAYER_SYMBOL === "x") { COMP_SYMBOL = "o"; }
    if (PLAYER_SYMBOL === "X") { COMP_SYMBOL = "O"; }
    if (PLAYER_SYMBOL === "o") { COMP_SYMBOL = "x"; }
    if (PLAYER_SYMBOL === "O") { COMP_SYMBOL = "X"; }
		return alert('Thank you.' + '\n' + 'Game on!!!');
	} else {
		alert("You're doing it wrong!");
	}
}());

compMove();

function compMove() {
	if (MOVES === 9) {
		var choices = [0, 2, 6, 8];
		var idx = (Math.random( 4 - 0) * 4).toFixed();
		var choice = choices[idx];
		$(BOARD[choice]).append("<h2>" + COMP_SYMBOL + "</h2>");
	} else if (0 < MOVES < 9) {
		$(BOARD[4]).append("<h2>" + COMP_SYMBOL + "</h2>");
		MOVES--;
		playerMove();
	}
}
function playerMove() {
	$(BOARD.join(', ')).on('click', function() {
		$(this).append("<h2>" + PLAYER_SYMBOL + "</h2>");
		MOVES--;
		if (MOVES > 0) {
			compMove();
		}
	});
}

