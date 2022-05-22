var tempoInicial = $("#tempo_digitacao").text();
var campo = $(".campo_digitacao");

$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    atualizaPlacar();
    $("#botao_reiniciar").click(reiniciaJogo);
    $("#usuarios").selectize({
        create: true,
        sortField: "text",
    });
    $('.tooltip').tooltipster({ trigger: "custom" });
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(/\S+/).length - 1;
    var tamanhoFrase = $("#tamanho_frase");
    tamanhoFrase.text(numPalavras);
}

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo_digitacao").text(tempo);
}

function inicializaContadores() {
    campo.on("input", function () {
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador_palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador_caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    campo.one("focus", function () {
        var tempoRestante = $("#tempo_digitacao").text();
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo_digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
        $("#botao_reiniciar").attr("disabled", true);
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    $("#botao_reiniciar").attr("disabled", false);
    campo.toggleClass("campo_desativado");
    inserePlacar();
}

function inicializaMarcadores() {
    campo.on("input", function () {
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        if (digitado == comparavel) {
            campo.addClass("borda_verde");
            campo.removeClass("borda_vermelha")
        }
        else {
            campo.addClass("borda_vermelha");
            campo.removeClass("borda_verde")
        }
    });
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador_palavras").text("0");
    $("#contador_caracteres").text("0");
    $("#tempo_digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo_desativado");
    campo.removeClass("borda_verde");
    campo.removeClass("borda_vermelha");
};


