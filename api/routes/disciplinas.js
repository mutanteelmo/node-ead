const express = require('express');
const { route } = require('../../app');
const router = express.Router();
const mongoose = require('mongoose');

const Disciplina = require('../models/disciplina');

// LIST ALL DISCIPLINES
router.get('/', (req, res, next) => {
    Disciplina.find()
        .select('_id nome descricao')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                disciplinas: docs.map(doc => {
                    return {
                        _id: doc._id,
                        nome: doc.nome,
                        descricao: doc.descricao,
                        requestUrl: { 
                            type: 'GET',
                            description: 'GET_DISCIPLINA',
                            url: 'http://localhost:3000/disciplinas' + doc._id
                         } 
                    }
                })
            };
            if (docs.length > 0) res.status(200).json(docs);
            else res.status(404).json({message: 'Não há disciplinas cadastradas'})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

// GET ONE DISCIPLINE
router.get('/:disciplinaId', (req, res, next) => {
    const id = req.params.disciplinaId;
    Disciplina.findById(id)
        .exec()
        .then(doc => {
            if (doc) res.status(200).json(doc)
            else res.status(404).json({message: 'Id não existente'});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// INSERT DISCIPLINE
router.post('/', (req, res, next) => {
    const disciplina = new Disciplina({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        descricao: req.body.descricao
    });
    disciplina
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Disciplina criada',
                //disciplinaCriada: disciplina
                disciplinaCriada: {
                    _id: result._id,
                    nome: result.nome,
                    descricao: result.descricao,
                    requestUrl: {
                        type: 'GET',
                        description: 'GET_DISCIPLINA',
                        url: 'http://localhost:3000/disciplinas' + result._id
                    }
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// UPDATE DISCIPLINE
router.patch('/:disciplinaId', (req, res, next) => {
    const updateOps = {};
    for(ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Disciplina.updateOne({_id: req.params.disciplinaId}, { $set: updateOps })
        .exec()
        .then((result => {res.status(200).json(result)}))
        .catch(err => {res.status(500).json({ error:err })});
});

// DELETE ONE DISCIPLINE
router.delete('/:disciplinaId', (req, res, next) => {
    Disciplina.remove({ _id: req.params.disciplinaId})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

module.exports = router;