var grau_dificuldade = "facil";
var jogo_terminou = false;
var vencedor;
var adversario;

var evtSource = null;


function update(ordem,game_id){
  if(ordem == "inicia"){
    evtSource = new EventSource("http://localhost:8107/update?nick=" + username + "&game=" + game_id);
    evtSource.onmessage = function(event){
      const data1 = JSON.parse(event.data);
      vez_jogar(data1.turn);
      if(data1.turn == username){
        var coluna = data1.column;
        jogada(coluna,"adversario");
      }
      if(data1.winner != null){
        alert(data1.winner + " ganhou!");
        update("acaba",game_id);
        reiniciar();
      }
    }
  }
  else if(ordem == "acaba"){
    evtSource.close();
  }
}

function vez_jogar(turn){
  if(turn == username){
    var x = document.getElementById("butoes_pilhas");
    var botao = x.getElementsByClassName("butao_pilha");
    for(var i=0;i<botao.length;i++)
      botao[i].disabled = false;
  }
  else{
    var x = document.getElementById("butoes_pilhas");
    var botao = x.getElementsByClassName("butao_pilha");
    for(var i=0;i<botao.length;i++)
      botao[i].disabled = true;
  }
}









function get_adversario(){
  if(document.getElementById("jogador").checked == true)
    adversario = "jogador";
  else {
    adversario = "computador";
  }
}

function dificuldade() {
    if(document.getElementById("facil").checked == true)
        grau_dificuldade = "facil";
    else if(document.getElementById("medio").checked == true)
        grau_dificuldade = "medio";
    else
    	grau_dificuldade = "dificil";
}


function jogada_computador(){
    if(grau_dificuldade == "facil")
        facil();
    if(grau_dificuldade == "medio")
        medio();
    if(grau_dificuldade == "dificil")
        dificil();
}


function jogada(coluna,jogador){
    for(var i=lines-1;i>=0;i--){
        var peca = document.getElementById(coluna+"|"+i);
        if(peca.className=="peca_vazia"){
            if(jogador=="user"){
                peca.className="peca_amarela";
                return true;
            }
            else{
                peca.className="peca_vermelha";
                return true;
            }
        }
    }
    return false;
}

function facil(){
    var jogador = "computador";
    var coluna = Math.floor(Math.random()*7);
    if(jogada(coluna,jogador)==true)
        estado_de_jogo();
    else
        while(jogada(coluna,jogador)==false){
            coluna=Math.floor(Math.random()*7);
        }
}

function informa_jogada(coluna){
  var url = "http://localhost:8107/notify";
  var jogada = JSON.stringify({nick:username , pass:password , game:game_id , column:coluna});
  fetch(url,{method:'POST',body:jogada}).
    then(response=>{
      return response.json();
    });
}



function jogada_user(coluna){
    var jogador = "user";
    if(jogada(coluna,jogador)==true){
        informa_jogada(coluna);
        update();
        if(adversario=="computador"){
          jogada_computador();
          estado_de_jogo();
        }
    }
    else
        alert("Coluna cheia!! Escolhe outra.");
}


function verifica_vertical(){
    var cont=0;
    for(var i=0;i<columns;i++){
        for(var j=lines-1;j>=0;j--){
            var peca = document.getElementById(i+"|"+j);
            cont = 1;
            if((peca.className==="peca_amarela")||(peca.className==="peca_vermelha")){
                var k=j-1;
                var peca_seguinte = document.getElementById(i+"|"+k);
                while((peca_seguinte.className===peca.className)&&(cont<4)&&(k<lines)){
                    if(k==0){
                        cont++;
                        break;
                    }
                    else {
                        cont++;
                        k--;
                        peca_seguinte = document.getElementById(i+"|"+k);
                    }
                }
                if((cont==4)&&(peca.className==="peca_amarela"))
                    return 1;
                if((cont==4)&&(peca.className==="peca_vermelha"))
                    return 2;
                else
                    cont = 0;
            }
        }
        cont=0;
    }
    return 0;
}

function verifica_horizontal(){
    var cont=0;
    for(var i=lines-1;i>=0;i--){
        for(var j=0;j<columns-1;j++){
            var peca = document.getElementById(j+"|"+i);
            cont = 1;
            if((peca.className==="peca_amarela")||(peca.className==="peca_vermelha")){
                var k=j+1;
                var peca_seguinte = document.getElementById(k+"|"+i);
                while((peca_seguinte.className===peca.className)&&(cont<=4)&&(k<columns)){
                    if(k==columns-1){
                        cont++;
                        break;
                    }
                    else{
                        cont++;
                        k++;
                        peca_seguinte = document.getElementById(k+"|"+i);
                    }
                }
                if((cont==4)&&(peca.className==="peca_amarela"))
                    return 1;
                if((cont==4)&&(peca.className==="peca_vermelha"))
                    return 2;
                else
                    cont = 0;
            }
        }
        cont=0;
    }
    return 0;
}

function verifica_diagonal_principal(x,y){
    var cont=0;
    var linha_seguinte;
    var coluna_seguinte;
    var peca = document.getElementById(x+"|"+y);
    cont++;
    for(var i=1;i<4;i++){
        if((peca.className==="peca_amarela")||(peca.className==="peca_vermelha")){
            coluna_seguinte=x+i;
            linha_seguinte=y+i;
            var peca_seguinte = document.getElementById(coluna_seguinte+"|"+linha_seguinte);
            if(peca_seguinte.className==peca.className){
                cont++;
            }
        }
    }
    if((cont==4)&&(peca.className==="peca_amarela"))
        return 1;
    if((cont==4)&&(peca.className==="peca_vermelha"))
        return 2;
    return 0;
}

function verifica_diagonal_secundaria(x,y){
    var cont=0;
    var linha_seguinte;
    var coluna_seguinte;
    var peca = document.getElementById(x+"|"+y);
    cont++;
    for(var i=1;i<4;i++){
        if((peca.className==="peca_amarela")||(peca.className==="peca_vermelha")){
            coluna_seguinte=x-i;
            linha_seguinte=y+i;
            var peca_seguinte = document.getElementById(coluna_seguinte+"|"+linha_seguinte);
            if(peca_seguinte.className==peca.className){
                cont++;
            }
        }
    }
    if((cont==4)&&(peca.className==="peca_amarela"))
        return 1;
    if((cont==4)&&(peca.className==="peca_vermelha"))
        return 2;
    return 0;
}


function verifica_diagonais(){
    for(var i=0;i<=columns-4;i++){
        for(var j=lines-4;j>=0;j--){
            if(verifica_diagonal_principal(i,j) == 1){
                jogo_terminou=true;
                alert("Jogador ganhou na diagonal!");
                vencedor="user";
                return true;
            }
            if(verifica_diagonal_principal(i,j) == 2){
                jogo_terminou=true;
                alert("Computador ganhou na diagonal!");
                vencedor="computador";
                return true;
            }
        }
    }
    for(var i=columns-1;i>=columns-4;i--){
        for(var j=lines-4;j>=0;j--){
            if(verifica_diagonal_secundaria(i,j) == 1){
                jogo_terminou=true;
                alert("Jogador ganhou na diagonal!");
                vencedor="user";
                return true;
            }
            if(verifica_diagonal_secundaria(i,j) == 2){
                jogo_terminou=true;
                alert("Computador ganhou na diagonal!");
                vencedor="computador";
                return true;
            }
        }
    }
    return false;
}


function empate(){
    var cont=0;
    for(var i=0;i<columns;i++){
        for(var j=0;j<lines;j++){
            var peca = document.getElementById(i+"|"+j);
            if(peca.className!="peca_vazia")
                cont++;
        }
    }
    if(cont==(columns*lines)){
        jogo_terminou=true;
        alert("Empate!");
        return true;
    }
    else
        return false;
}

function vitoria(){
    if(jogo_terminou===false){
        if(verifica_vertical()===1){
            jogo_terminou=true;
            alert("Jogador ganhou na vertical!");
            vencedor = "user";
            return true;
        }
        if(verifica_vertical()===2){
            jogo_terminou=true;
            alert("Computador ganhou na vertical!");
            vencedor = "computador";
            return true;
        }
        if(verifica_horizontal()===1){
            jogo_terminou=true;
            alert("Jogador ganhou na horizontal!");
            vencedor = "user";
            return true;
        }
        if(verifica_horizontal()===2){
            jogo_terminou=true;
            alert("Computador ganhou na horizontal!");
            vencedor = "computador";
            return true;
        }
        if(verifica_diagonais()===true){
            jogo_terminou=true;
            return true;
        }
    }
    else
        return false;
}

function estado_de_jogo(){
    if((vitoria()==true) || (empate()==true)){
      if(vencedor=="user")
        appendToStorage(username,pad(parseInt(totalSeconds / 60)) + ":" + pad(totalSeconds % 60));
      reiniciar();
      return true;
    }
    else
        return false;
}

var list1 = [];
var list2 = [];
function appendToStorage(name, data){
  list1.push(name);
  list2.push(data);
  localStorage.setItem("nick", JSON.stringify(list1));
  localStorage.setItem("tempo", JSON.stringify(list2))
  var linhas_tab = list1.length;
  localStorage.setItem("linhas_tab",linhas_tab);
}


function dificil(){
    jogo.minimax();
}
