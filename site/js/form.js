var botaoAdicionar = document.querySelector("#adicionar-aluno");
botaoAdicionar.addEventListener("click", function(event) {

    adicionaNoBanco();
    adicionaNaTela(event);

});

function adicionaNoBanco(){

    var form = document.querySelector("#form-adiciona");

    var aluno = obtemAlunoDoFormulario(form);

    var data_retirada = moment(form.retirada.value, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');

    var details = {
        'nome': form.nome.value,
        'solicitacao': form.solicitacao.value,
        'status': 'solicitado'
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    var xhr = new XMLHttpRequest();
    
    xhr.open("POST", "http://localhost:3000/atendimentos/");

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
     }

     xhr.send(formBody);

}


function adicionaNaTela(event, form){
    event.preventDefault();
    var form = document.querySelector("#form-adiciona");


    var aluno = obtemAlunoDoFormulario(form);

    var erros = validaAluno(aluno);

    if (erros.length > 0) {
        exibeMensagensDeErro(erros);

        return;
    }

    adicionaAlunoNaTabela(aluno);

    form.reset();

    var mensagensErro = document.querySelector("#mensagens-erro");
    mensagensErro.innerHTML = "";
}


function deletaDoBanco(id){

}

function obtemAlunoDoFormulario(form) {

    var aluno = {
        nome: form.nome.value,
        solicitacao: form.solicitacao.value,
        data: form.retirada.value,
    }

    return aluno;
}

function montaTr(aluno) {
    var alunoTr = document.createElement("tr");
    alunoTr.classList.add("aluno");

    alunoTr.appendChild(montaTd(aluno.id, "info-id"));

    alunoTr.appendChild(montaTd(aluno.nome, "info-nome"));
    alunoTr.appendChild(montaTd(aluno.solicitacao, "info-solicitacao"));

    var data_solicitacao = moment(aluno.data, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');

    alunoTr.appendChild(montaTd(data_solicitacao, "info-data-solicitacao"));

    var data_retirada = moment(aluno.dataCriacao, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');

    alunoTr.appendChild(montaTd(data_retirada, "info-data-retirada"));
    alunoTr.appendChild(montaTd(aluno.status, "info-status"));

    return alunoTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.classList.add(classe);
    td.textContent = dado;

    return td;
}

function validaAluno(aluno) {

    var erros = [];

    if (aluno.nome.length == 0) {
        erros.push("O nome não pode ser em branco");
    }

    if (aluno.solicitacao.length == 0) {
        erros.push("A solicitação não pode ser em branco");
    }

    if (aluno.data.length == 0) {
        erros.push("A data não pode ser em branco");
    }

    return erros;
}

function exibeMensagensDeErro(erros) {
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";

    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function adicionaAlunoNaTabela(aluno) {
    var alunoTr = montaTr(aluno);
    var tabela = document.querySelector("#tabela-alunos");
    tabela.appendChild(alunoTr);
}
