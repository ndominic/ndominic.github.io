
//var currentLevel = 1; 
var cellSize = 90;

function Game(startingLevel) {
	
	var canvas = $("canvas")[0];
	var ctx = canvas.getContext("2d");

	this.template = startingLevel;
	var map = new Map(this);
	this.currentLevel = 1;

	this.generateMap = function(newTemplate) {
		this.template = newTemplate;
		map.readTemplate(newTemplate);
	}

	this.writeMap = function(template) {
		for(var i = 0; i < template.length; i++) {
			for(var j = 0; j < template[i].length; j++) {
				if(template[i][j]==0)
					ctx.drawImage(whitepic, i*cellSize, j*cellSize, cellSize, cellSize);
				if(template[i][j]==1)
					ctx.drawImage(wallpic, i*cellSize, j*cellSize, cellSize, cellSize);
				else if(template[i][j]==2)
					ctx.drawImage(rocketpic, i*cellSize, j*cellSize, cellSize, cellSize);
				else if(template[i][j]==3)
					ctx.drawImage(planetpic, i*cellSize, j*cellSize, cellSize, cellSize);
				else if(template[i][j]==4)
					ctx.drawImage(wallpic, i*cellSize, j*cellSize, cellSize, cellSize);
				}
			}
	}

	this.resetCanvas = function() {
		//ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	this.runAI = function() {
		updatePosition(map.objectList);
	}

	function updatePosition(objectList) {
		for(var i = 0; i < objectList.length; i++) {
			objectList[i].runStep();
		}
	}
	
	this.runPlayerInput = function(userFunctionString) {
		var player = map.getPlayerList()[0];
		player.commands = new Function(userFunctionString);
		player.commands();
	}
	
}
