var alunos = document.querySelectorAll(".aluno");

var tabela = document.querySelector("#tabela-alunos");

tabela.addEventListener("dblclick", function(event) {


    event.target.parentNode.classList.add("fadeOut");



    setTimeout(function() {

        var linha = event.target.parentNode;
        var id = linha.querySelector(".info-id").textContent;

        var xhr = new XMLHttpRequest();


        xhr.open("DELETE", `http://localhost:3000/atendimentos/${id}`, true);

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

        xhr.onload = function () {
            var users = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.table(users);
            } else {
                console.error(users);
            }
        }
        xhr.send();

    
/*         xhr.open("DELETE", "http://localhost:3000/atendimentos/");

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

    
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                alert(xhr.responseText);
            }
         }

         console.log(encodeURIComponent(id))
    
        xhr.send(encodeURIComponent(id));  */




        event.target.parentNode.remove();
    }, 500);







});
