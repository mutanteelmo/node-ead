const express = require('express');
const router = express.Router();

// GET REQUEST
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handle GET requests to /alunos'
    });
});

// POST REQUEST
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handle POST requests to /alunos'
    });
})

module.exports = router;