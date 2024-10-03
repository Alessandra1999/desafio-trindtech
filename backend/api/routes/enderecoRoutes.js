const express = require('express');
const {
    createEndereco,
    getEnderecos,
    getEnderecoById,
    updateEndereco,
    deleteEndereco,
} = require('../controllers/enderecoController');

const router = express.Router();

router.post('/', createEndereco); // Criar endereço
router.get('/', getEnderecos); // Obter todos os endereços
router.get('/:id', getEnderecoById); // Obter endereço por id específico
router.put('/:id', updateEndereco); // Atualizar endereço por id específico
router.delete('/:id', deleteEndereco); // Deletar endereço por id específico

module.exports = router;
