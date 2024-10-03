const express = require('express');
const {
    createAluno,
    getAlunos,
    getAlunoById,
    updateAluno,
    deleteAluno,
} = require('../controllers/alunoController');

const router = express.Router();

router.post('/', createAluno); // Criar Aluno
router.get('/', getAlunos); // Obter todos os alunos
router.get('/:id', getAlunoById); //Obter aluno por id específico
router.put('/:id', updateAluno); //Atualizar aluo por id específico
router.delete('/:id', deleteAluno); //deletar aluno por id específico

module.exports = router;
