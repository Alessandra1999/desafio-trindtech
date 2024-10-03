const express = require('express');
const {
    createCurso,
    getCursos,
    getCursoById,
    updateCurso,
    deleteCurso,
} = require('../controllers/cursoController');

const router = express.Router();

router.post('/', createCurso); // Criar curso
router.get('/', getCursos); // Obter todos os cursos
router.get('/:id', getCursoById); // Obter curso por id específico
router.put('/:id', updateCurso); // Atualizar curso por id específico
router.delete('/:id', deleteCurso); // Deletar curso por id específico

module.exports = router;
