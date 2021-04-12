const express = require('express');
const app = express();

const alunoRoutes = require('./api/routes/alunos');

app.use('/alunos', alunoRoutes);

/*
app.use((req, res, next) => {
    res.status(200).json({
        message: 'Hello world'
    });
});
*/

module.exports = app;