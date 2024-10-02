const AlunoCurso = require('../models/alunoCurso');

exports.createAlunoCurso = async (req, res) => {
    try {
        // Validação simples dos dados recebidos
        const { id_aluno, id_curso } = req.body;
        if (!id_aluno || !id_curso) {
            return res.status(400).json({ error: 'Os campos aluno_id e curso_id são obrigatórios.' });
        }

        // Criar a associação
        const alunoCurso = await AlunoCurso.create(req.body);
        res.status(201).json(alunoCurso);
    } catch (error) {
        console.error('Erro ao criar associação:', error.message);
        res.status(400).json({ error: error.message });
    }
};

exports.getAlunoCursos = async (req, res) => {
    try {
        const alunoCursos = await AlunoCurso.findAll();
        res.json(alunoCursos);
    } catch (error) {
        console.error('Erro ao obter associações:', error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.getAlunoCursoById = async (req, res) => {
    try {
        const alunoCurso = await AlunoCurso.findByPk(req.params.id);
        if (!alunoCurso) {
            return res.status(404).json({ error: 'Aluno_Curso não encontrado.' });
        }
        res.json(alunoCurso);
    } catch (error) {
        console.error('Erro ao obter associação:', error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.updateAlunoCurso = async (req, res) => {
    try {
        const alunoCurso = await AlunoCurso.findByPk(req.params.id);
        if (!alunoCurso) {
            return res.status(404).json({ error: 'Aluno_Curso não encontrado.' });
        }

        // Validação dos dados para atualização
        const { id_aluno, id_curso } = req.body;
        if (id_aluno === undefined || id_curso === undefined) {
            return res.status(400).json({ error: 'Os campos id_aluno e id_curso são obrigatórios para atualização.' });
        }

        await alunoCurso.update(req.body);
        res.json(alunoCurso);
    } catch (error) {
        console.error('Erro ao atualizar associação:', error.message);
        res.status(400).json({ error: error.message });
    }
};

exports.deleteAlunoCurso = async (req, res) => {
    try {
        const alunoCurso = await AlunoCurso.findByPk(req.params.id);
        if (!alunoCurso) {
            return res.status(404).json({ error: 'Aluno_Curso não encontrado.' });
        }
        await alunoCurso.destroy();
        res.status(204).send(); // No Content
    } catch (error) {
        console.error('Erro ao deletar associação:', error.message);
        res.status(500).json({ error: error.message });
    }
};
