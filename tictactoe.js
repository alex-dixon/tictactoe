// $(document).ready(function() {

	var PLAYER_SYMBOL = "";
	var COMP_SYMBOL = "";
	var BOARD = [
		$('#top-left'),					// 0
		$('#top-middle'),				// 1
		$('#top-right'),				// 2
		$('#center-left'),			// 3
		$('#center-middle'),		// 4
		$('#center-right'),			// 5
		$('#bottom-left'),			// 6
		$('#bottom-middle'),		// 7
		$('#bottom-right')			// 8
	];
	var win = ['012', '345', '678',	      // 0  1  2
	           '036', '147', '258',       // 3  4  5
	                '048', '642'];      // 6  7  8
	
	(function setSymbols() {
			PLAYER_SYMBOL = prompt("X or O?");
			if (/[XxOo]/.test(PLAYER_SYMBOL)) {
				return alert('Thank you.' + '\n' + 'Game on!!!');
			} else {
				alert("You're doing it wrong!");
			}
	}());

	if (PLAYER_SYMBOL === "x") { COMP_SYMBOL = "o"; }
	if (PLAYER_SYMBOL === "X") { COMP_SYMBOL = "O"; }
	if (PLAYER_SYMBOL === "o") { COMP_SYMBOL = "x"; }
	if (PLAYER_SYMBOL === "O") { COMP_SYMBOL = "X"; }

	var movesAvailable = function(decrease) {
		this.count = this.count || 9;
			return (function() {
				count = count + decrease;
				return count;
			})();
	};
	// function computerMove() {
	// 	if (movesAvailable === 9) {
	// 		function selector() { 
	// 			var firstMove = [0, 2, 6, 8];
	// 			var idx = Math.random(4 - 0) + 0;
	// 			return firstMove[idx];
	// 		};
	// 	}
	// };
	function playerMove() {
		if (movesAvailable > 0) {
			$('div').click(function() {
				$(this).append("<h2>" + PLAYER_SYMBOL + "</h2>");
				movesAvailable(-1);
			});
		}
	};
	playerMove();

// while (movesAvailable > 0) {
// 	if(movesAvailable % 2 !== 0) {
// 		computerMove();
// 	} else {
// 		playerMove();
// 	}
// }

// game over



// $(document)
// });
