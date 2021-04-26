const mongoose = require('mongoose');

const disciplinaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome: { type: String, required: true },
    descricao: { type: String, required: true }, 
});

module.exports = mongoose.model('Disciplina', disciplinaSchema);