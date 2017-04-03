var timerId = null;

function Start(){
  var nivel_jogo = document.getElementById('nivel_jogo').value;

  window.location.href = 'jogo.html?' + nivel_jogo;

}

function IniciaJogo(){

  var url = window.location.search;
  var nivel_jogo = url.replace("?", "");
  var tempo_segundos = 0;
  var qtd_baloes = 20;

  if (nivel_jogo == 1 ) {
  //1 - Fácil   = 120 segundos
    tempo_segundos = 120;

  } else if (nivel_jogo == 2 ) {
  //2 - Normal  = 60 segundos
    tempo_segundos = 60;

  } else {
  //3 - Difícil = 30 segundos
    tempo_segundos = 30;

  }

  document.getElementById('cronometro').innerHTML = tempo_segundos;

  CriaBaloes(qtd_baloes);

  document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;
  document.getElementById('baloes_estourados').innerHTML = 0;

  ContagemTempo(tempo_segundos+1);

}

function CriaBaloes(qtd_baloes){

  for (var i = 1; i <= qtd_baloes; i++) {

    var balao = document.createElement("img");
    balao.src = 'imagens/balao_azul_pequeno.png';
    balao.style.margin = '10px';
    balao.id = 'b'+i;
    balao.onclick = function(){ EstouraBalao(this) ;};

    document.getElementById('cenario').appendChild(balao);

  }

}

function ContagemTempo(segundos){

  segundos--;

  if (segundos == -1) {

    clearTimeout(timerId);
    GameOver();

    return false;

  }

  document.getElementById('cronometro').innerHTML = segundos;

  timerId = setTimeout("ContagemTempo("+segundos+")", 1000);

}

function GameOver(){
  alert("O tempo acabou =[");
}

function EstouraBalao(b){

  var idBalao = b.id;

  document.getElementById(idBalao).setAttribute("onclick", "");
  document.getElementById(idBalao).src = 'imagens/balao_azul_pequeno_estourado.png'

  Pontuacao(-1);

}

function Pontuacao(acao){

    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    StatusJogo(baloes_inteiros);

}

function StatusJogo(baloes_inteiros){
  if (baloes_inteiros == 0) {
    alert('Parabens, todos os baloes foram estourados');
    clearTimeout(timerId);
  }
}

function PararJogo(){
  clearTimeout(timerId);

}
