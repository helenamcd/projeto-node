class Tabelas {
    init (conexao){
        console.log('Tabelas foram chamadas')

        this.conexao = conexao

        this.criarAtendimento()
    }

    criarAtendimento(){
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, aluno varchar(50), solicitacao text, data datetime, dataCriacao datetime, status varchar(20), PRIMARY KEY(id))'
        
        this.conexao.query(sql, erro =>{
            if (erro){
                console.log(erro)
            }else{
                console.log('Tabela Atendimentos foi criada com sucesso')
            }
            
        })
    }
    
}


module.exports = new Tabelas