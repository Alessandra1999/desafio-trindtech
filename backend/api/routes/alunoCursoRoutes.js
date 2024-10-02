const express = require('express');
const {
    createAlunoCurso,
    getAlunoCursos,
    getAlunoCursoById,
    updateAlunoCurso,
    deleteAlunoCurso,
} = require('../controllers/alunoCursoController');

const router = express.Router();

// Criar associação entre Aluno e Curso
router.post('/', createAlunoCurso);

// Obter todas as associações entre Aluno e Curso
router.get('/', getAlunoCursos);

// Obter associação específica por ID
router.get('/:id_aluno/:id_curso', getAlunoCursoById);

// Atualizar associação por ID
router.put('/:id_aluno/:id_curso', updateAlunoCurso);

// Deletar associação por ID
router.delete('/:id_aluno/:id_curso', deleteAlunoCurso);

module.exports = router;
