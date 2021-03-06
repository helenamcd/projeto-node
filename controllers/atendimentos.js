
const Atendimento = require('../models/atendimentos')


module.exports = app => {


    app.get('/atendimentos',(req, res) => {

        Atendimento.lista(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
       const id = parseInt(req.params.id)
       Atendimento.buscaPorId(id, res)
    })
    
    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        Atendimento.altera(id, valores, res)
     })

    app.post('/atendimentos', (req, res) => {
        //console.log(req.body)
        //res.send('Você está na rota de atendimentos e está chamando o POST')    

        const atendimento = req.body
        Atendimento.adiciona(atendimento, res)
    })

    app.delete('/atendimentos/:id', (req, res) =>{
        console.log(req.body)
        
        console.log(req.params.id)
        const id = parseInt(req.params.id)
        Atendimento.deleta(id, res)
    })
    
}
