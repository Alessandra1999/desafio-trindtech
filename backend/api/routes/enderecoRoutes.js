const express = require('express');
const {
    createEndereco,
    getEnderecos,
    getEnderecoById,
    updateEndereco,
    deleteEndereco,
} = require('../controllers/enderecoController');

const router = express.Router();

router.post('/', createEndereco);
router.get('/', getEnderecos);
router.get('/:id', getEnderecoById);
router.put('/:id', updateEndereco);
router.delete('/:id', deleteEndereco);

module.exports = router;
