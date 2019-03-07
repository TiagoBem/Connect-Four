var username;
var password;
var logged = false;
var lines=7;
var columns=6;
var game_id=0;


function myFunction1() {
    var x = document.getElementById("comojogar");
    var y = document.getElementById("jogo");
    var z = document.getElementById("classificações");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
        z.style.display = "none";
    } else {
        x.style.display = "none";
    }
}



function myFunction2() {
    if (logged === false)
        alert("Fazer login primeiro!");
    else{
    var x = document.getElementById("jogo");
        var y = document.getElementById("comojogar");
        var z = document.getElementById("classificações");
        if (x.style.display === "none") {
            x.style.display = "block";
            y.style.display = "none";
            z.style.display = "none";
        }
        else {
            x.style.display = "none";
        }
    }
}


function myFunction3() {
    var x = document.getElementById("classificações");
    var y = document.getElementById("jogo");
    var z = document.getElementById("comojogar");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
        z.style.display = "none";
    } else {
        x.style.display = "none";
    }
}



function login() {
    username = document.login_form.user.value;
    password = document.login_form.pass.value
    var url = "http://localhost:8107/register";
    if((username!="")&&(password!="")){
      var user_pass = JSON.stringify({nick:username , pass:password});
      fetch(url,{method:'POST',body:user_pass}).
        then(response=> {
          return response.json();
        }).
        then(function(data) {
          if(data.error!=null)
            alert("User registered with a different password");
          else{
            var string = 'Estás logado como ' ;
            var x = document.getElementById("login");
            var y = document.getElementById("pos_login");
            x.style.display = "none";
            y.style.display = "block";
            document.getElementById("pos_login").innerHTML = string + username;
            logged = true;
          }
        });
      }
}


var existe_tab = false;
var matriz_tab = new Array(7);
for (var i=0; i<matriz_tab.length; i++) {
    matriz_tab[i] = new Array(6);
}


function cria_tabuleiro(){
    var butoes = document.getElementById("butoes_pilhas");
    butoes.style.display = "block";
    console.log(game_id);
    if(game_id==0){
      var x = document.getElementById("butoes_pilhas");
      var botao = x.getElementsByClassName("butao_pilha");
      for(var i=0;i<botao.length;i++)
        botao[i].disabled = true;
    }
    if(game_id!=0){
      var x = document.getElementById("butoes_pilhas");
      var botao = x.getElementsByClassName("butao_pilha");
      for(var i=0;i<botao.length;i++)
        botao[i].disabled = false;
    }
    if(existe_tab==false){
      for(var i=0;i<columns;i++){
          var coluna = document.createElement("div");
          coluna.className = "pilha";
          document.getElementById("tabuleiro").appendChild(coluna);
          for(var j=0;j<lines;j++){
              var peca = document.createElement("div");
              peca.id = i + "|" + j;
              peca.className = "peca_vazia";
              coluna.append(peca);
              matriz_tab[i].fill(peca.id,j,j+1);
          }
          coluna.addEventListener("click",function(){jogada_user();});

      }
    }
    existe_tab=true;
}

function submeter(){
    if((existe_tab === false)||(game_id!=0)) {
        columns = document.getElementById("num_colunas").value;
        lines = document.getElementById("num_linhas").value;
        cria_tabuleiro();
        /*for (var i=0;i<matriz_tab.length;i++){
            for (var j=0;j<matriz_tab[i].length;j++){
                document.write(matriz_tab[i][j] + " ");
            }
        }
        document.write("     " + matriz_tab.length);
        document.write("     " +matriz_tab[0].length);*/
    }
    existe_tab = true;
    setInterval(setTime, 1000);
    dificuldade();
}


function reiniciar(){
    existe_tab=false;
    jogo_terminou = false;
    for(var i=0;i<columns;i++){
        for(var j=0;j<lines;j++){
            peca = document.getElementById(i+"|"+j);
            peca.className="peca_vazia";
        }
    }
    document.getElementById("tabuleiro").innerHTML="";
    cria_tabuleiro();
    totalSeconds = 0;
    join();
}


var totalSeconds = 0;
function setTime() {

  if(game_id!=0){
    ++totalSeconds;
    document.getElementById("secondsLabel").innerHTML = pad(totalSeconds % 60);
    document.getElementById("minutesLabel").innerHTML = pad(parseInt(totalSeconds / 60));
  }
  else{
    document.getElementById("secondsLabel").innerHTML = pad(0);
    document.getElementById("minutesLabel").innerHTML = pad(0);
  }
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}


var linhas_ranking = 6;
var colunas_ranking = 7;
var num_linhas_tabela = 1;
function cria_classificacao(){
  linhas_ranking = document.getElementById("num_linhas_ranking").value;
  colunas_ranking = document.getElementById("num_colunas_ranking").value;
  var table = document.getElementById("tabela_classificacoes");
  table.innerHTML = "";
  if(document.getElementById("local").checked==true){
    var nova_classificacao = table.insertRow(0);
    var cell1 = nova_classificacao.insertCell(0);
    var cell2 = nova_classificacao.insertCell(1);
    cell1.innerHTML = "Nick";
    cell2.innerHTML = "Tempo";
    num_linhas_tabela = 1;
    cria_tabela_classificacao("local");
  }
  else if(document.getElementById("multiplayer").checked==true){
    var nova_classificacao = table.insertRow(0);
    var cell1 = nova_classificacao.insertCell(0);
    var cell2 = nova_classificacao.insertCell(1);
    var cell3 = nova_classificacao.insertCell(2);
    cell1.innerHTML = "Nick";
    cell2.innerHTML = "Vitorias";
    cell3.innerHTML = "Jogos";
    num_linhas_tabela = 1;
    cria_tabela_classificacao("multiplayer");
  }
}

function cria_tabela_classificacao(type_ranking){
  var table = document.getElementById("tabela_classificacoes");
  if(type_ranking=="multiplayer"){
    var url = "http://localhost:8107/ranking";
    var size = JSON.stringify({size:{rows:Number(linhas_ranking) , columns:Number(colunas_ranking)}});
    console.log(size);
    fetch(url,{method:'POST',body:size}).
      then(response => {
        return response.json();
      }).
      then(function(data) {
        console.log(data);
        if(data.error==null){
          var table = document.getElementById("tabela_classificacoes");
          for(var i=0;i<data.ranking.length;i++){
            var nova_classificacao = table.insertRow(num_linhas_tabela);
            var cell1 = nova_classificacao.insertCell(0);
            var cell2 = nova_classificacao.insertCell(1);
            var cell3 = nova_classificacao.insertCell(2);
            cell1.innerHTML = data.ranking[i].nick;
            cell2.innerHTML = data.ranking[i].victories;
            cell3.innerHTML = data.ranking[i].games;
            num_linhas_tabela++;
          }
        }
    });
  }
  else if(type_ranking=="local"){
    console.log(localStorage);
    var nick = JSON.parse(localStorage.getItem("nick"));
    var tempo = JSON.parse(localStorage.getItem("tempo"));
    var linhas_tab = localStorage.getItem("linhas_tab");
    for(var i=0;i<linhas_tab;i++){
      var nova_classificacao = table.insertRow(num_linhas_tabela);
      var cell1 = nova_classificacao.insertCell(0);
      var cell2 = nova_classificacao.insertCell(1);
      cell1.innerHTML = nick[i];
      cell2.innerHTML = tempo[i];
      num_linhas_tabela++;
      console.log("nick: " + nick[i] + "  tempo: " + tempo[i]);
    }
  }
}


function join(){
  get_adversario();
  if(adversario=="jogador"){
    columns = document.getElementById("num_colunas").value;
    lines = document.getElementById("num_linhas").value;
    var url = "http://localhost:8107/join";
    var join_game = JSON.stringify({nick:username , pass:password , group:7, size:{rows:Number(lines) , columns:Number(columns)}});
    fetch(url,{method:'POST',body:join_game}).
      then(response=> {
        return response.json();
      }).
      then(function(data) {
        console.log(data);
        if(data.error!=null){
          alert("Already waiting for game");
        }
        if(data.error==null){
          game_id=data.game;
          update("inicia",game_id);
          submeter();
        }
      });
    }
    else {
      game_id=1;
      submeter();
    }
    console.log(game_id);
}



function desistir(){
  var url = "http://localhost:8107/leave";
  var desiste = JSON.stringify({game:game_id , nick:username , pass:password});
  fetch(url,{method:'POST',body:desiste}).
    then(response=>{
      return response.json();
    }).
    then(function(data) {
      if(data.error==null)
        game_id=0;
        reiniciar();
    })
}


function logout(){
  desistir();
  location.reload();
}






//         CANVAS IMAGE


function myCanvas(){
  var canvas = document.getElementById("myCanvas");
  var gc = canvas.getContext("2d");
  img = new Image();
  img.src = 'oie_transparent.png';
  img.onload = function(){
    gc.drawImage(img, 0, 0);
  }
}
