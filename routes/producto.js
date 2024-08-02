const express = require('express');
const auth = require('../middlewares/auth.js');  // Middleware de autenticación
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/producto.js');

const router = express.Router();

router.post('/create', auth, createProduct);
router.get('/list', getProducts);
router.get('/:id', getProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
