$("#botao_frase").click(fraseAleatoria);
$("#botao_frase_id").click(buscaFrase);

function fraseAleatoria() {
    $("#spinner").toggle();
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
        .fail(function () {
            $("#erro").toggle();
            setTimeout(function () {
                $("#erro").toggle();
            }, 3000);
        })
        .always(function () {
            $("#spinner").toggle();
        });
}

function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase() {
    $("#spinner").toggle();
    var fraseId = $("#frase_id").val();
    var dados = { id: fraseId }
    $.get("http://localhost:3000/frases", dados, trocaFrase)
        .fail(function () {
            $("#erro_frase").toggle();
            setTimeout(function () {
                $("#erro_frase").toggle();
            }, 3000);
        })
        .always(function () {
            $("#spinner").toggle();
        });

    function trocaFrase(data) {
        var frase = $(".frase");
        frase.text(data.texto);
        atualizaTamanhoFrase();
        atualizaTempoInicial(data.tempo);
    }
}