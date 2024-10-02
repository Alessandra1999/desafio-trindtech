const Aluno = require('../models/aluno');

exports.createAluno = async (req, res) => {
    try {
        const aluno = await Aluno.create(req.body);
        res.status(201).json(aluno);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.findAll();
        res.json(alunos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAlunoById = async (req, res) => {
    try {
        const aluno = await Aluno.findByPk(req.params.id);
        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }
        res.json(aluno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAluno = async (req, res) => {
    try {
        const aluno = await Aluno.findByPk(req.params.id);
        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }
        await aluno.update(req.body);
        res.json(aluno);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteAluno = async (req, res) => {
    try {
        const aluno = await Aluno.findByPk(req.params.id);
        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }
        await aluno.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
