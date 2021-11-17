var campoFiltro = document.querySelector("#filtrar-tabela");

campoFiltro.addEventListener("input", function() {
    var alunos = document.querySelectorAll(".aluno");

    if (this.value.length > 0) {
        for (var i = 0; i < alunos.length; i++) {
            var aluno = alunos[i];
            var tdNome = aluno.querySelector(".info-nome");
            var nome = tdNome.textContent;
            var expressao = new RegExp(this.value, "i");

            if (!expressao.test(nome)) {
                aluno.classList.add("invisivel");
            } else {
                aluno.classList.remove("invisivel");
            }
        }
    } else {
        for (var i = 0; i < alunos.length; i++) {
            var aluno = alunos[i];
            aluno.classList.remove("invisivel");
        }
    }
});
