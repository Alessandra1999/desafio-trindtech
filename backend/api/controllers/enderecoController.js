const Endereco = require('../models/endereco');

// Criar novo endereço
exports.createEndereco = async (req, res) => {
    try {
        const endereco = await Endereco.create(req.body);
        res.status(201).json(endereco);
    } catch (error) {
        console.error('Erro ao criar endereço:', error.message);
        res.status(400).json({ error: error.message });
    }
};

// Listar todos os endereços
exports.getEnderecos = async (req, res) => {
    try {
        const enderecos = await Endereco.findAll();
        res.json(enderecos);
    } catch (error) {
        console.error('Erro ao obter endereços:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Listar endereço por id específico
exports.getEnderecoById = async (req, res) => {
    try {
        const endereco = await Endereco.findByPk(req.params.id);
        if (!endereco) {
            return res.status(404).json({ error: 'Endereço não encontrado.' });
        }
        res.json(endereco);
    } catch (error) {
        console.error('Erro ao obter endereço:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Atualizar endereço por id específico
exports.updateEndereco = async (req, res) => {
    try {
        const endereco = await Endereco.findByPk(req.params.id);
        if (!endereco) {
            return res.status(404).json({ error: 'Endereço não encontrado.' });
        }

        await endereco.update(req.body);
        res.json(endereco);
    } catch (error) {
        console.error('Erro ao atualizar endereço:', error.message);
        res.status(400).json({ error: error.message });
    }
};

// Deletar endereço por id específico
exports.deleteEndereco = async (req, res) => {
    try {
        const endereco = await Endereco.findByPk(req.params.id);
        if (!endereco) {
            return res.status(404).json({ error: 'Endereço não encontrado.' });
        }
        await endereco.destroy();
        res.status(204).send(); // No Content
    } catch (error) {
        console.error('Erro ao deletar endereço:', error.message);
        res.status(500).json({ error: error.message });
    }
};
