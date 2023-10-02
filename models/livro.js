const mongoose = require('mongoose')

const livro = mongoose.model('livro', {
    titulo: String,
    ano: Number,
    capa: String,
    genero: String,
    autor: String,
    paginas: Number,
    sinopse: String,
    escolaLiteraria: String,
    linkCompra: String,

})

module.exports = livro