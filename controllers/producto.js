const Producto = require('../models/producto.js');

const createProduct = async (req, res) => {
    try {
        const producto = new Producto(req.body);
        await producto.save();
        res.status(201).json({ message: 'Producto creado exitosamente.' });
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el producto.', error: err.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los productos.', error: err.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado.' });
        res.json(producto);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el producto.', error: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado.' });
        res.json(producto);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el producto.', error: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado.' });
        res.json({ message: 'Producto eliminado exitosamente.' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el producto.', error: err.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
};
