const express = require('express');
const {
    createLocation,
    getLocations,
    getLocationById,
    updateLocation,
    deleteLocation,
} = require('../controllers/locationController');

const router = express.Router();

router.post('/', createLocation); // Criar endereço
router.get('/', getLocations); // Obter todos os endereços
router.get('/:id', getLocationById); // Obter endereço por id específico
router.put('/:id', updateLocation); // Atualizar endereço por id específico
router.delete('/:id', deleteLocation); // Deletar endereço por id específico

module.exports = router;
