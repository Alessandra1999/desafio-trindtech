const express = require('express');
const {
    createCurso,
    getCursos,
    getCursoById,
    updateCurso,
    deleteCurso,
} = require('../controllers/cursoController');

const router = express.Router();

router.post('/', createCurso);
router.get('/', getCursos);
router.get('/:id', getCursoById);
router.put('/:id', updateCurso);
router.delete('/:id', deleteCurso);

module.exports = router;
