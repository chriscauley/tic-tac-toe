var context;
var cursor = {'x': 0, 'y':0};
var width = 500;
var height = 500;

function drawRect(x,y,w,h, colour) {
	context.fillStyle = colour;
	context.fillRect(x,y,w,h);
}

function setBackground() {
	context.clearRect(0, 0, width, height);
	context.fillStyle = "black";
	context.fillRect(0,0, width,height);
}

var canvas = document.getElementById("canvas");
context = canvas.getContext('2d');


canvas.addEventListener('click', function(e) {
  cursor.x = e.pageX - canvas.offsetLeft;
  cursor.y = e.pageY - canvas.offsetTop;
	GAME.client.processClick(game, function(updatedGame) {
		game = updatedGame;
	});
}, false);

GAME.client.draw();

setBackground();
