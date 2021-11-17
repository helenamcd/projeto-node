
const Atendimento = require('../models/atendimentos')
var cors = require('cors')

var corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type', 'Access-Control-Allow-Origin','application/x-www-form-urlencoded; charset=UTF-8'],
    optionsSuccessStatus: 200
  }

module.exports = app => {


    app.get('/atendimentos', cors(corsOptions), (req, res) => {
        app.use(cors())

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

    app.post('/atendimentos', cors(corsOptions), (req, res) => {
        //console.log(req.body)
        //res.send('Você está na rota de atendimentos e está chamando o POST')
        app.use(cors())
        

        const atendimento = req.body
        Atendimento.adiciona(atendimento, res)
    })

    app.delete('/atendimentos/:id', (req, res) =>{
        const id = parseInt(req.params.id)
        Atendimento.deleta(id, res)
    })
    
}
