const express = require('express');
const {
    createAluno,
    getAlunos,
    getAlunoById,
    updateAluno,
    deleteAluno,
} = require('../controllers/alunoController');

const router = express.Router();

router.post('/', createAluno);
router.get('/', getAlunos);
router.get('/:id', getAlunoById);
router.put('/:id', updateAluno);
router.delete('/:id', deleteAluno);

module.exports = router;
