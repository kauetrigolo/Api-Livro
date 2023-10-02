const router = require('express').Router()
const res = require('express/lib/response')
const Livro = require('../models/livro')

// Criação de dados
router.post('/', async (req, res) => {

    // req.body faz com que se criem as variáveis e junte a seus respectivos valores
    const { titulo, ano, capa, genero, autor, paginas, sinopse, escolaLiteraria, linkCompra } = req.body


    // Validação para a entrada dos dados
    if(!titulo || !ano || !capa || !genero || !autor || !paginas || !sinopse || !escolaLiteraria || !linkCompra){
        res.status(422).json({error: 'Algum dado obrigatório não foi inserido'})
        return
    }


    const livro = { // Criando uma variável que contenha todos os dados da requisição(req.body)
        titulo,
        ano,
        capa,
        genero,
        autor,
        paginas,
        sinopse,
        escolaLiteraria,
        linkCompra
    }

    try {
        // Criando os dados
        await Livro.create(livro)

        res.status(201).json({message: 'Livro inserido no sistema com sucesso!'})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Leitura de dados
router.get('/', async (req,res)=>{

    try {
        
        const livros = await Livro.find()

        res.status(200).json(livros)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {

    // extrair o dado da requisição
    const id = req.params.id

    try {
        
        const livro = await Livro.findOne({_id: id})

        if(!livro){
            res.status(422).json({message: 'O livro não foi encontrado' })
            return
        }

        res.status(200).json(livro)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// atualização de dados
router.patch("/:id", async (req, res) =>  {
    const id = req.params.id
    const { titulo, ano, capa, genero, autor, paginas, sinopse, escolaLiteraria, linkCompra } = req.body

    const livro = { // Criando uma variável que contenha todos os dados da requisição(req.body)
        titulo,
        ano,
        capa,
        genero,
        autor,
        paginas,
        sinopse,
        escolaLiteraria,
        linkCompra
    }


    
    try {
        const updatedLivro = await Livro.updateOne({_id: id}, livro)

        // Verificando se existe um usuário com o ID selecionado
        if(updatedLivro.matchedCount === 0){
            res.status(422).json({ message: "Não há nenhum registro com esse ID"})
            return
        }

        res.status(200).json(livro)

    } catch (error) {
        res.status(500).json({error: error})
    }

})


// Deletar dados
router.delete("/:id", async (req, res) => {

    const id = req.params.id

    const livro = await Livro.findOne({_id: id})

    if(!livro){
        res.status(422).json({message: 'O livro não foi encontrado' })
        return
    }

    try {
        
        await Livro.deleteOne({_id: id})

        res.status(200).json({ message: "Livro deletado com sucesso"})

    } catch (error) {
        res.status(500).json({error: error})
    }

})


module.exports = router