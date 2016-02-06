game = new Game(levels["level1"]);
game.generateMap(levels["level1"]);
game.writeMap(levels["level1"]);

$("#submit-button").click(function() {
	var editor = ace.edit("editor");
	var code = editor.getValue();
	game.runPlayerInput(code);		
})

$("#reset-button").click(function() {
	var currentLevel = "level" + game.currentLevel;
	game.resetCanvas();
	game.generateMap(levels[currentLevel]);
})

//CHECKING WITH JSLINT????
