const Curso = require('../models/curso');

// Criar novo curso
exports.createCurso = async (req, res) => {
    try {
        const curso = await Curso.create(req.body);
        res.status(201).json(curso);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Listar todos os cursos
exports.getCursos = async (req, res) => {
    try {
        const cursos = await Curso.findAll();
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar curso por id especifico
exports.getCursoById = async (req, res) => {
    try {
        const curso = await Curso.findByPk(req.params.id);
        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }
        res.json(curso);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar curso por id específico
exports.updateCurso = async (req, res) => {
    try {
        const curso = await Curso.findByPk(req.params.id);
        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }
        await curso.update(req.body);
        res.json(curso);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Deletar curso por id especifico
exports.deleteCurso = async (req, res) => {
    try {
        const curso = await Curso.findByPk(req.params.id);
        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }
        await curso.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
