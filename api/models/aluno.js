const mongoose = require('mongoose');
//const Disciplina = require('./disciplina');
Schema = mongoose.Schema

const alunoSchema = Schema({
    _id: Schema.Types.ObjectId,
    nome: { 
        type: String, required: true 
    },
    email: { 
        type: String, required: true 
    },
    disciplinas: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Disciplina' 
        }
    ]
});

module.exports = mongoose.model('Aluno', alunoSchema);

/*
nome: req.body.nome,
email: req.body.email,
disciplinaId: req.body.disciplinaId
*/