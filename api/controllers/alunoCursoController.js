const AlunoCurso = require('../models/alunoCurso');

exports.createAlunoCurso = async (req, res) => {
    try {
        // Validação simples dos dados recebidos
        const { id_aluno, id_curso } = req.body;
        if (!id_aluno || !id_curso) {
            return res.status(400).json({ error: 'Os campos id_aluno e id_curso são obrigatórios.' });
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
    const { id_aluno, id_curso } = req.params; // Agora pegamos os dois parâmetros
    try {
        const alunoCurso = await AlunoCurso.findOne({ where: { id_aluno, id_curso } });
        if (!alunoCurso) {
            return res.status(404).json({ error: 'Associação não encontrada.' });
        }
        res.json(alunoCurso);
    } catch (error) {
        console.error('Erro ao obter associação:', error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.updateAlunoCurso = async (req, res) => {
    const { id_aluno, id_curso } = req.params; // Agora pegamos os dois parâmetros
    try {
        const alunoCurso = await AlunoCurso.findOne({ where: { id_aluno, id_curso } });
        if (!alunoCurso) {
            return res.status(404).json({ error: 'Associação não encontrada.' });
        }

        // Validação dos dados para atualização
        const { id_aluno: newIdAluno, id_curso: newIdCurso } = req.body; // Altere para refletir os novos campos
        if (newIdAluno === undefined || newIdCurso === undefined) {
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
    const { id_aluno, id_curso } = req.params; // Agora pegamos os dois parâmetros
    try {
        const alunoCurso = await AlunoCurso.findOne({ where: { id_aluno, id_curso } });
        if (!alunoCurso) {
            return res.status(404).json({ error: 'Associação não encontrada.' });
        }
        await alunoCurso.destroy();
        res.status(204).send(); // No Content
    } catch (error) {
        console.error('Erro ao deletar associação:', error.message);
        res.status(500).json({ error: error.message });
    }
};
