const express = require('express');
const { route } = require('../../app');
const router = express.Router();
const mongoose = require('mongoose');

//const Disciplina = require('../models/disciplina');
const Aluno = require('../models/aluno');

// LISTA ALUNOS
router.get('/', (req, res, next) => {
    Aluno.find()
        .select('-_id nome email')
        .populate('disciplinas', '-_id nome')
        .exec()
        .then(docs => {
            if (docs.length > 0) res.status(200).json(docs)
            else res.status(404).json({message: "Nenhum aluo cadastrado"})
        })
        .catch(err => res.status(500).json({error: err}));
});

// POST REQUEST
router.post('/', (req, res, next) => {

    const aluno = new Aluno({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        email: req.body.email,
        disciplinas: req.body.disciplinas
        /* Matrix Example
            [ { "_id": "" }, { "_id": "" } ]
        */
    });
    
    aluno.save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                result: result,
                message: 'Handle POST requests to /alunos',
                alunoCriado: aluno
            })
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        });
});

// GET ALUNO
router.get('/:alunoId', (req, res, next) => {
    const id = req.params.alunoId;
    mensagem = "O id do aluno é " + id;
    res.json({
        message: mensagem
    })
});

router.patch('/:alunoId', (req, res, next) => {
    res.status(200).json({
        message: 'Aluno atualizado'
    });
});

router.delete('/:alunoId', (req, res, next) => {
    res.status(200).json({
        message: 'Aluno deletado'
    });
});


module.exports = router;