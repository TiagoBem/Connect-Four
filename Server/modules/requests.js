var url = require("url");
var fs = require("fs");
var crypto = require('crypto');
var processReq = require("./Server/requests.js");
var headers = require("./headers.js").headers;

module.exports.processPostRequest = function(request, response){
	var parsedUrl = url.parse(request.url, true);
	var pathname = parsedUrl.pathname;
	var body = "";

	request.on("data", function(chunk){
		body += chunk;
	});
	request.on("end", function(){
		try{
			var query = JSON.parse(body);
		}
		catch(err){
			console.log(err.message);
			response.writeHead(400, headers["plain"]);
			response.write(JSON.stringify({error: "Error parsing JSON request: " + err}));
			response.end();
			return;
		}
		switch(pathname){
			case "/register":
				if(query["nick"]==null){
					response.writeHead(400, headers["plain"]);
					response.write(JSON.stringify({error: "nick is undefined"}));
					response.end();
					break;
				}
				else if(query["pass"]==null){
					response.writeHead(400, headers["plain"]);
					response.write(JSON.stringify({error: "pass is undefined"}));
					response.end();
					break;
				}

				var ret = checkCredentials(query["nick"], query["pass"]);

				if(ret==2){
					response.writeHead(500, headers["plain"]);
					response.end();
				}
				else if(ret==1){
					response.writeHead(400, headers["plain"]);
					response.write(JSON.stringify({error: "User registered with a different password"}));
					response.end();
				}
				else{
					response.writeHead(200, headers["plain"]);
					response.write(JSON.stringify({}));
					response.end();
				}

				break;
			case "/ranking":
				if(query["size"]==null){
					response.writeHead(400, headers["plain"]);
					response.write(JSON.stringify({error: "Undefined size"}));
					response.end();
					break;
				}
				else if(query["size"].rows > 6 || query["size"].rows < 4 || query["size"].columns > 7 || query["size"].columns < 4){
					response.writeHead(400, headers["plain"]);
					response.write(JSON.stringify({error: "Invalid size"}));
					response.end();
					break;
				}

				try{
					var storage_file = fs.readFileSync("Data/users.json");
					storage_file = JSON.parse(storage_file.toString())["users"];
				}
				catch(err){
					console.log(err);
					response.writeHead(500, headers["plain"]);
					response.end();
					break;
				}

				var ranking_array;

                if(query["size"].rows == 4 && query["size"].columns == 4){
                    var ficheiro_ranking = fs.readFileSync("Data/4x4.json");
                    ficheiro_ranking = JSON.parse(ficheiro_ranking.toString())["users"];
                    ranking_array = readRanking(query["size"].rows,query["size"].columns,ficheiro_ranking);
                }

                if(query["size"].rows == 4 && query["size"].columns == 5){
                    var ficheiro_ranking = fs.readFileSync("Data/4x5.json");
                    ficheiro_ranking = JSON.parse(ficheiro_ranking.toString())["users"];
                    ranking_array = readRanking(query["size"].rows,query["size"].columns,ficheiro_ranking);
                }

                if(query["size"].rows == 4 && query["size"].columns == 6){
                    var ficheiro_ranking = fs.readFileSync("Data/4x6.json");
                    ficheiro_ranking = JSON.parse(ficheiro_ranking.toString())["users"];
                    ranking_array = readRanking(query["size"].rows,query["size"].columns,ficheiro_ranking);
                }

                if(query["size"].rows == 4 && query["size"].columns == 7){
                    var ficheiro_ranking = fs.readFileSync("Data/4x7.json");
                    ficheiro_ranking = JSON.parse(ficheiro_ranking.toString())["users"];
                    ranking_array = readRanking(query["size"].rows,query["size"].columns,ficheiro_ranking);
                }

                if(query["size"].rows == 5 && query["size"].columns == 4){
                    var ficheiro_ranking = fs.readFileSync("Data/5x4.json");
                    ficheiro_ranking = JSON.parse(ficheiro_ranking.toString())["users"];
                    ranking_array = readRanking(query["size"].rows,query["size"].columns,ficheiro_ranking);
                }

                if(query["size"].rows == 5 && query["size"].columns == 5){
                    var ficheiro_ranking = fs.readFileSync("Data/5x5.json");
                    ficheiro_ranking = JSON.parse(ficheiro_ranking.toString())["users"];
                    ranking_array = readRanking(query["size"].rows,query["size"].columns,ficheiro_ranking);
                }

                if(query["size"].rows == 5 && query["size"].columns == 6){
                    var ficheiro_ranking = fs.readFileSync("Data/5x6.json");
                    ficheiro_ranking = JSON.parse(ficheiro_ranking.toString())["users"];
                    ranking_array = readRanking(query["size"].rows,query["size"].columns,ficheiro_ranking);
                }

                if(query["size"].rows == 5 && query["size"].columns == 7){
                    var ficheiro_ranking = fs.readFileSync("Data/5x7.json");
                    ficheiro_ranking = JSON.parse(ficheiro_ranking.toString())["users"];
                    ranking_array = readRanking(query["size"].rows,query["size"].columns,ficheiro_ranking);
                }

                if(query["size"].rows == 6 && query["size"].columns == 4){
                    var ficheiro_ranking = fs.readFileSync("Data/6x4.json");
                    ficheiro_ranking = JSON.parse(ficheiro_ranking.toString())["users"];
                    ranking_array = readRanking(query["size"].rows,query["size"].columns,ficheiro_ranking);
                }

                if(query["size"].rows == 6 && query["size"].columns == 5){
                    var ficheiro_ranking = fs.readFileSync("Data/6x5.json");
                    ficheiro_ranking = JSON.parse(ficheiro_ranking.toString())["users"];
                    ranking_array = readRanking(query["size"].rows,query["size"].columns,ficheiro_ranking);
                }

                if(query["size"].rows == 6 && query["size"].columns == 6){
                    var ficheiro_ranking = fs.readFileSync("Data/6x6.json");
                    ficheiro_ranking = JSON.parse(ficheiro_ranking.toString())["users"];
                    ranking_array = readRanking(query["size"].rows,query["size"].columns,ficheiro_ranking);
                }

                if(query["size"].rows == 6 && query["size"].columns == 7){
                    var ficheiro_ranking = fs.readFileSync("Data/6x7.json");
                    ficheiro_ranking = JSON.parse(ficheiro_ranking.toString())["users"];
                    ranking_array = readRanking(query["size"].rows,query["size"].columns,ficheiro_ranking);
                }

				ranking_array = ranking_array.slice(0, 10);

				ranking_array = {ranking: ranking_array};

				response.writeHead(200, headers["plain"]);
				response.write(JSON.stringify(ranking_array));
				response.end();

				break;

			case "/join":
                var date = new Date();
                date = date.getTime();
                var gameid = crypto
                                .createHash('md5')
                                .update(date.toString())
                                .digest('hex');

                response.writeHead(200, headers["plain"]);
                response.write(JSON.stringify({game: gameid}));
                response.end();

                break;

        }
    });
    request.on("error", function(err){
        console.log(err.message);
        response.writeHead(400, headers["plain"]);
        response.end();
    });
}


function checkCredentials(nick, pass){
	if(nick == "" || pass == ""){
		return 1;
	}

	pass = crypto
				.createHash('md5')
				.update(pass)
				.digest('hex');

	try{
		var storage_file = fs.readFileSync("Server/Data/users.json");
		storage_file = JSON.parse(storage_file.toString())["users"];
	}
	catch(err){
		console.log(err);
		return 2;
	}

	var found = false;
	var i;
	for(i=0; i<storage_file.length; i++){
		if(storage_file[i]["nick"] == nick){
			found = true;
			break;
		}
	}
	if(found==false){
		storage_file.push({nick: nick, pass: pass});
		storage_file = {users: storage_file};
		try{
			fs.writeFileSync("Server/Data/users.json", JSON.stringify(storage_file));
		}
		catch(err){
			console.log("Error writing to file 'users.json'.");
			console.log(err);
			return 2;
		}
	}
	else{
		if(storage_file[i]["pass"] == pass){
			return 0;
		}
		else
			return 1;
	}
}


function readRanking(rows,columns,storage_file){
        var ranking_array = [];
				var i = 0;
				for(i=0; i<storage_file.length; i++){
					if(storage_file[i]["games"]["games"] != null)
						ranking_array.push({nick: storage_file[i]["nick"], victories: storage_file[i]["games"]["games"]["victories"], games: storage_file[i]["games"]["games"]["games"]});
                        //console.log({nick: storage_file[i]["nick"], victories: storage_file[i]["games"]["games"]["victories"], games: storage_file[i]["games"]["games"]["games"]});
                }
                //console.log(storage_file);
                //console.log(ranking_array);

				var j=0;
				for(i=0; i<ranking_array.length; i++){
					for(j=i+1; j<ranking_array.length; j++){
						if(ranking_array[j]["victories"] > ranking_array[i]["victories"]){
							var aux = ranking_array[i];
							ranking_array[i] = ranking_array[j];
							ranking_array[j] = aux;
						}
					}
				}
            return ranking_array;
 }
