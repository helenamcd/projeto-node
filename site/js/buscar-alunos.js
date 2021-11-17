var botaoAdicionar = document.querySelector("#buscar-alunos");

botaoAdicionar.addEventListener("click", function() {
    var xhr = new XMLHttpRequest();
    

    xhr.open("GET", "http://localhost:3000/atendimentos/");

    xhr.addEventListener("load", function() {
        var erroAjax = document.querySelector("#erro-ajax");

        if (xhr.status == 200) {
            erroAjax.classList.add("invisivel");
            var resposta = xhr.responseText;
            var alunos = JSON.parse(resposta);

            alunos.forEach(function(aluno) {
                adicionaAlunoNaTabela(aluno);
            });
        } else {
            erroAjax.classList.remove("invisivel");
        }
    });

    xhr.send();
});
