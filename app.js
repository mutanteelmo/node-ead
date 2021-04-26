const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const alunoRoutes = require('./api/routes/alunos');
const disciplinaRoutes = require('./api/routes/disciplinas');

mongoose.connect(
    `mongodb+srv://bomjesus:${process.env.MONGO_ATLAS_PW}@cluster-bomjesus.v0gch.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {useMongoClient: true}
);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control_Allow_Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/alunos', alunoRoutes);
app.use('/disciplinas', disciplinaRoutes);

app.use((req, res, next) => {
    const error = new Error('Não encontrado');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

/*
app.use((req, res, next) => {
    res.status(200).json({
        message: 'Hello world'
    });
});
*/

module.exports = app;