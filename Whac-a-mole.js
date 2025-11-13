var acertos = 0;
var perdidos = 0;
var errados = 0;
var intervalo = 1000;
var janela = 2000;
var timer = null

onload = function () {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('gramado').addEventListener('mousedown', marteloBaixo)
    document.getElementById('gramado').addEventListener('mouseup', marteloCima)
    document.getElementById('buraco0').addEventListener('click', martelada)
    document.getElementById('buraco1').addEventListener('click', martelada)
    document.getElementById('buraco2').addEventListener('click', martelada)
    document.getElementById('buraco3').addEventListener('click', martelada)
    document.getElementById('buraco4').addEventListener('click', martelada)
}

function start () {
    var botao = document.getElementById('start');

    botao.removeEventListener('click', start);
    botao.disable = true;
    sobeToupeira();
}

function sobeToupeira () {
    var buraco = Math.floor(Math.random() * 5);
    var objBuraco = document.getElementById('buraco'+buraco);
    objBuraco.src = 'imagens/hole-mole.png';
    timer = setTimeout(tiraToupeira, janela, buraco);
    setTimeout(sobeToupeira, intervalo);
}

function tiraToupeira (buraco) {
    var objBuraco = document.getElementById('buraco'+buraco);
    objBuraco.src = 'imagens/hole.png';
    perdidos++;
    mostrarPontuacao();
}

function mostrarPontuacao() {
    mostrarPontuacaoDe('acertos', acertos)
    mostrarPontuacaoDe('perdidos', perdidos)
    mostrarPontuacaoDe('errados', errados)
    mostrarPontuacaoDe('saldo', Math.max(acertos - perdidos - errados, 0));
}

function mostrarPontuacaoDe (display, valor) {
    let objCentena = document.getElementById(display).firstChild;
    let objDezena = objCentena.nextSibling;
    let objUnidade = objDezena.nextSibling;

    let centena = parseInt(valor/100)
    let dezena = parseInt((valor/10)%10)
    let unidade = valor%10

    objCentena.src = 'imagens/caractere_'+centena+'.gif'
    objCentena.alt = centena;
    objDezena.src = 'imagens/caractere_'+dezena+'.gif'
    objDezena.alt = dezena;
    objUnidade.src = 'imagens/caractere_'+unidade+'.gif'
    objUnidade.alt = unidade;
}

function marteloBaixo () {
    document.getElementById('gramado').style.cursor = 'url(imagens/hammerDown.png), default';
}

function marteloCima () {
    document.getElementById('gramado').style.cursor = 'url(imagens/hammer.png), default';
}

function martelada (evento) {
    if (evento.target.src.includes('hole-mole')){
        acertos ++
        evento.target.src = 'imagens/hole.png';
        clearTimeout(timer);
    }
    else {
        errados++
    }
    mostrarPontuacao();
}

