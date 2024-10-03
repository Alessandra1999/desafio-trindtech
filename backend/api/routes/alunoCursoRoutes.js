const express = require('express');
const {
    createAlunoCurso,
    getAlunoCursos,
    getAlunoCursoById,
    updateAlunoCurso,
    deleteAlunoCurso,
} = require('../controllers/alunoCursoController');

const router = express.Router();

router.post('/', createAlunoCurso); // Criar associação entre aluno e curso
router.get('/', getAlunoCursos); // Obter todas as associações entre aluno e curso
router.get('/:id_aluno/:id_curso', getAlunoCursoById); // Obter associação entre aluno e curso por id específico
router.put('/:id_aluno/:id_curso', updateAlunoCurso); // Atualizar associação entre aluno e curso por id específico
router.delete('/:id_aluno/:id_curso', deleteAlunoCurso); // Deletar associação entre aluno e curso por id específico

module.exports = router;
