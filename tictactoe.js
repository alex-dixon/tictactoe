var game = {

	turn: 0,
	playerIcon: "",
	compIcon: "",
	
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

	winners:     ['012', '345', '678',	    // 0  1  2
         	      '036', '147', '258',      // 3  4  5
           	 	      '048', '642'],        // 6  7  8


  // currentBoard: function () {
  //   var i = 0;
  //   var square = game.board[i];
  //   var icon = $(square).find('h2').text();    
    function getPositions (icon) {
      var array = [];
        for (; i < game.board.length - 1; i++) {
          if (icon === "X") {
            array.push(i);
          }
        }
      return array;
    }
    getPositions(playerIcon);
    getPositions(computerIcon);
  },


  // win: function () {

  //     if () {
  //       return true;
  //     } else {
  //       return false;
  //     }

  // },

  changeTurn: function (turn) {
    return turn === 0 ? 1 : 0;
  }, 

  play: function () {
    var allSquares = this.board.join(', ');
    $(allSquares).on('click', function () {
    $(this).append('<h2>' + game.playerIcon + '</h2>');
    changeTurn();
    }
  )}
  }

  // over: function () {
  //   return true;
  // }




  // playerMove: function () {
  //   var square = this.board.join(', ');
  //   $(square).on('click', function() {
  //   $(this).append('<h2>' + game.playerIcon + '</h2>');
  //   }
  // )},
  // computerMove: function () {
  //   var choices = [0, 2, 6, 8];
  //   var idx = (Math.random(4) * 4).toFixed();
  //   var choice = choices[idx];
  //   $(game.board[choice]).append('<h2>' + game.compIcon + '</h2>');
  // }

//game
// };
game.init();
// while (!win) {
game.play();
// }
//game.over();






// if turn 0 comp move
// if turn 1 player move
// if win state break loop state winner


  // 'checkWin': function() {
  //        currentBoard = currentBoard.sort(function () { return a - b });




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