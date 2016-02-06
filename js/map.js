/*

*/

var idMap = {
	wall: 1, 
	player: 2, 
	flag: 3,
	fog: 4
}

function Map(game) {
	this.template;
	var totalList;
	var objectList = [0];
	var playerList = [0];


	this.readTemplate = function(newTemplate) {
		this.template = newTemplate;
		for(var i = 0; i < this.template.length; i++) {
			for(var j = 0; j < this.template[i].length; j++) {
				console.log(this.template[i][j]);
				if(this.template[i][j]==1) {
					wall = new Wall(i, j, this);
					objectList[objectList.length-1] = wall;
				}
				if(this.template[i][j]==2) {
					player = new Player(i, j, this, game);
					playerList[0] = player;
				}
				if(this.template[i][j]==3) {
					flag = new Flag(i, j, this);
					objectList[objectList.length-1] = flag;
				}
				if(this.template[i][j]==4) {
					//obstacles? fog? whatever man......
				}
			}
		}
		totalList = objectList.concat(playerList);
		game.writeMap(this.template);
	}

	this.getPlayerList = function() {
		return playerList;
	}

	this.updateTemplate = function(oldXPos, oldYPos, newXPos, newYPos, id) {
		this.template[oldXPos][oldYPos] = 0;
		if(id=="player")
			this.template[newXPos][newYPos] = idMap[id];
	}


}

function Player(x, y, map, game) {
	var id = "player";
	var xParam = x;
	var yParam = y;
	var map = map;
	var game = game;
	var collision; 

	this.moveRight = function() {
		var oldXPos = xParam;
		var oldYPos = yParam;
		//game.runAI();
		var collision = collisionCheck(oldXPos+1, oldYPos);
		var victory = victoryCheck(oldXPos+1, oldYPos);
		if(collision) {
			//do nothing
		} else if(victory) {
			alert("You beat the level!");
			game.currentLevel++;
			var currentLevel = "level" + game.currentLevel;
			game.resetCanvas();
			document.getElementById("level-state").innerHTML = currentLevel;
			game.generateMap(levels[currentLevel]);
		} else {
			xParam += 1;	
			map.updateTemplate(oldXPos, oldYPos, xParam, yParam, id);
			game.writeMap(map.template);
		}
	}

	this.moveUp = function(){
		var oldXPos = xParam;
		var oldYPos = yParam;
		//game.runAI();
		var collision = collisionCheck(oldXPos, oldYPos-1);
		var victory = victoryCheck(oldXPos+1, oldYPos);
		if(collision) {
			//do nothing
		} else if(victory) {
			alert("You beat the level!");
			game.currentLevel++;
			var currentLevel = "level" + game.currentLevel;
			game.resetCanvas();
			document.getElementById("level-state").innerHTML = currentLevel;
			game.generateMap(levels[currentLevel]);
		} else {
			yParam -= 1;	
			map.updateTemplate(oldXPos, oldYPos, xParam, yParam, id);
			game.writeMap(map.template);
		}
	}

	this.moveLeft = function(){
		var oldXPos = xParam;
		var oldYPos = yParam;
		//game.runAI();
		var collision = collisionCheck(oldXPos-1, oldYPos);
		var victory = victoryCheck(oldXPos+1, oldYPos);
		if(collision) {
			//do nothing
		} else if(victory) {
			alert("You beat the level!");
			game.currentLevel++;
			var currentLevel = "level" + game.currentLevel;
			game.resetCanvas();
			document.getElementById("level-state").innerHTML = currentLevel;
			game.generateMap(levels[currentLevel]);
		} else {
			xParam -= 1;	
			map.updateTemplate(oldXPos, oldYPos, xParam, yParam, id);
			game.writeMap(map.template);
		}
	}

	this.moveDown = function(){
		var oldXPos = xParam;
		var oldYPos = yParam;
		//game.runAI();
		var collision = collisionCheck(oldXPos, oldYPos+1);
		var victory = victoryCheck(oldXPos+1, oldYPos);
		if(collision) {
			//do nothing
		} else if(victory) {
			alert("You beat the level!");
			game.currentLevel++;
			var currentLevel = "level" + game.currentLevel;
			game.resetCanvas();
			document.getElementById("level-state").innerHTML = currentLevel;
			game.generateMap(levels[currentLevel]);
		} else {
			yParam += 1;
			map.updateTemplate(oldXPos, oldYPos, xParam, yParam, id);
			game.writeMap(map.template);
		}
	}

	function collisionCheck(x, y) {
		if(x<0 || y<0 || x>map.template.length || y > map.template.length) 
			return true;
		else if(map.template[x][y]==1)
			return true;
		else
			return false;
	}

	function victoryCheck(x, y) {
		if(map.template[x][y]==3)
			return true;
		else
			return false;
	}

	this.commands = "";

	this.rightClear = function(){
		if(map.template[xParam+1][yParam]==3) {
			alert("You beat the level!");
			game.currentLevel++;
			var currentLevel = "level" + game.currentLevel;
			game.resetCanvas();
			document.getElementById("level-state").innerHTML = currentLevel;
			game.generateMap(levels[currentLevel]);
		} else if(map.template[xParam+1][yParam]!=1)
			return true;
		else 
			return false;
	}

	this.upClear = function(){
		if(map.template[xParam][yParam-1]==3) {
			alert("You beat the level!");
			game.currentLevel++;
			var currentLevel = "level" + game.currentLevel;
			game.resetCanvas();
			document.getElementById("level-state").innerHTML = currentLevel;
			game.generateMap(levels[currentLevel]);
		} else if(map.template[xParam][yParam-1]!=1)
			return true;
		else
			return false;
	}

	this.skipLevel = function(x) {
		var nextLevel = "level" + x;
		game.currentLevel = x;
		game.resetCanvas();
		document.getElementById("level-state").innerHTML = nextLevel;
		game.generateMap(levels[nextLevel]);
	}

}

function Wall(x, y, map) {
	this.id = "wall";
	this.sprite = //add sprite
	this.xParam = x;
	this.yParam = y;
	this.map = map;

	this.runStep = new function() {
		//empty; walls can't move duh
	}
}

function Flag(x, y) {
	this.id = "flag";
	this.sprite = //add sprite
	this.xParam = x;
	this.yParam = y;

	this.runStep = new function() {
		//flags don't move much more than walls, duh
	}
}
