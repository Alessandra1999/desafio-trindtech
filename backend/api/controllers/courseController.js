const Course = require('../models/course');

// Criar novo curso
exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Listar todos os cursos
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar curso por id especifico
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar curso por id específico
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }
        await course.update(req.body);
        res.json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Deletar curso por id especifico
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }
        await course.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
