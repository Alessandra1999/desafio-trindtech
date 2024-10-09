const Location = require('../models/location');

// Criar novo endereço
exports.createLocation = async (req, res) => {
    try {
        const location = await Location.create(req.body);
        res.status(201).json(location);
    } catch (error) {
        console.error('Erro ao criar endereço:', error.message);
        res.status(400).json({ error: error.message });
    }
};

// Listar todos os endereços
exports.getLocations = async (req, res) => {
    try {
        const locations = await Location.findAll();
        res.json(locations);
    } catch (error) {
        console.error('Erro ao obter endereços:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Listar endereço por id específico
exports.getLocationById = async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (!location) {
            return res.status(404).json({ error: 'Endereço não encontrado.' });
        }
        res.json(location);
    } catch (error) {
        console.error('Erro ao obter endereço:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Atualizar endereço por id específico
exports.updateLocation = async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (!location) {
            return res.status(404).json({ error: 'Endereço não encontrado.' });
        }

        await location.update(req.body);
        res.json(location);
    } catch (error) {
        console.error('Erro ao atualizar endereço:', error.message);
        res.status(400).json({ error: error.message });
    }
};

// Deletar endereço por id específico
exports.deleteLocation = async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (!location) {
            return res.status(404).json({ error: 'Endereço não encontrado.' });
        }
        await location.destroy();
        res.status(204).send(); 
    } catch (error) {
        console.error('Erro ao deletar endereço:', error.message);
        res.status(500).json({ error: error.message });
    }
};
