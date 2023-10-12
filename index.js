// Importação dos módulos necessários
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const { rateLimit } = require('express-rate-limit')
const cors = require('cors')



// Declarando um limite de requisições para evitar ataques DDOS
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 300, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
})

app.use(limiter)


// Declarando a variável da porta que será utilizada
const port = process.env.PORT || 3000


// Ler o JSON
app.use(
    express.urlencoded({
        extended: true
    })
) 

app.use(cors())
app.use(express.json()) // Middleware para ler os dados do corpo da requisição em formato json, se não for um objeto

// Conectando as rotas
const livroRoutes = require('./routes/livrosRoutes')

app.use('/livro', livroRoutes)

//rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Utilize a rota /livro para obter os dados da API'})
})


//Definir a porta a ser utilizada
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD) // Não deixa com que usuários externos vejam a senha do DB

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.syaxoyv.mongodb.net/?retryWrites=true&w=majority`,
    )
    .then(() => {
        console.log("Conectado ao banco de dados")
        app.listen(port)
    })
    .catch((err) => {
        console.error(`Erro na conexão com o BD ${err}`)  // erro no catch
    })
