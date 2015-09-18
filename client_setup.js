function setupClient(client) {
	client.base_url = "http://localhost:3000";

	client.name = 'xyz';

	client.startNewGame = function() {
		http.get({
	    url: "http://localhost:3000/game/play?name=" + client.name,
	    onload: function() { 
	    	game = JSON.parse(this.responseText);
	    	client.players = game.players;
	    	var players = Object.keys(game.players);
	    	for (var i = 0; i < players.length; i++) {
	    		var player = game.players[players[i]];
	    		alert("account" + player.piece);
	    		if (player.account_name === client.name) {
	    			client.player = player.piece;
	    			console.log("assigning player piece: " + client.player);
	    		}
	    	}
	    	installRendering(client);
	    }
		});
	}

	client.processClick = function(x, y) {
		//server.move({game_id:})
		//server.move[0](game_id...)
		//server.move[1](game_id...)
		//server.move[client.offlineOrOnlineServerId](params);
		var url = client.base_url;
		url = url + "/game/" + game.game_id;
		url = url + "/move?player=" + client.player + "&x=" + x + "&y=" + y;

		http.get({
	    url: url,
	    onload: function() { 
	    	game = JSON.parse(this.responseText);
	    	if (game.winner != undefined) {
	    		alert("Winner is " + game.winner);
	    	} else if (game.error) {
	    		alert("Error: " + game.error);
	    	}
	    }
		});
	}

	client.downloadGame = function() {
		if (game && game.game_id) {
			var url = client.base_url;
			url = url + "/game/" + game.game_id + "/status";
			http.get({
		    url: url,
		    onload: function() { 
		    	game = JSON.parse(this.responseText);
		    	if (game.winner != undefined) {
		    		alert("Winner is " + game.winner);
		    	} else if (game.error) {
		    		alert("Error: " + game.error);
		    	}
		    }
			});
		}
	}

	return client;
}
