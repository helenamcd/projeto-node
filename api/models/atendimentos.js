const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Atendimento {
    adiciona(atendimento, res){

        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const alunoEhValido = atendimento.aluno.length >=2

        const validacoes = [
            {
                nome: "data",
                valido: dataEhValida,
                mensagem: "Data deve ser maior ou igual a data atual"
            },
            {
                nome: "aluno",
                valido: alunoEhValido,
                mensagem: "O aluno deve possuir pelo menos 2 caracteres"
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros){
            res.status(400).json(erros)
        }else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}

            const sql = 'INSERT INTO atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro){
                    res.status(400).json(erro)
                }else{
                    res.status(201).json(atendimento)
                }
            })
        }


    }

    lista(res){
        const sql='SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if (erro){
                res.status.json(400)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`


        conexao.query(sql, (erro, resultados) =>{
            if (erro){
                res.status(400).json(erro)
            }else{
                const atendimento = resultados[0]
                res.setRequestHeader('Content-Type', 'application/json')
                res.status(200)
                res.onreadystatechange = handler;
                res.withCredentials = true;
                res.end(JSON.stringify(atendimento));
                
            }
        })
    }

    altera(id, valores, res){
        if (valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) =>{
            if (erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res){
        const sql='DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento