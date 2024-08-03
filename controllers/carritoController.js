const Carrito = require('../models/pedido');
const Producto = require('../models/producto');

const agregarProducto = async (req, res) => {
    const { productId, cantidad } = req.body;
    const userId = req.user._id;

    try {
        let carrito = await Carrito.findOne({ userId });

        if (carrito) {
            const index = carrito.productos.findIndex(p => p.productId.toString() === productId);

            if (index !== -1) {
                carrito.productos[index].cantidad += cantidad;
            } else {
                carrito.productos.push({ productId, cantidad });
            }
        } else {
            carrito = new Carrito({
                userId,
                productos: [{ productId, cantidad }]
            });
        }

        await carrito.save();
        res.status(200).json(carrito);
    } catch (err) {
        res.status(500).json({ message: 'Error al agregar el producto al carrito', error: err });
    }
};

const obtenerCarrito = async (req, res) => {
    const userId = req.user._id;

    try {
        const carrito = await Carrito.findOne({ userId }).populate('productos.productId');

        if (!carrito) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        res.status(200).json(carrito);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el carrito', error: err });
    }
};

const actualizarProducto = async (req, res) => {
    const { productId, cantidad } = req.body;
    const userId = req.user._id;

    try {
        let carrito = await Carrito.findOne({ userId });

        if (!carrito) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const index = carrito.productos.findIndex(p => p.productId.toString() === productId);

        if (index !== -1) {
            carrito.productos[index].cantidad = cantidad;
            await carrito.save();
            return res.status(200).json(carrito);
        } else {
            return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el producto en el carrito', error: err });
    }
};

const eliminarProducto = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    try {
        let carrito = await Carrito.findOne({ userId });

        if (!carrito) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        carrito.productos = carrito.productos.filter(p => p.productId.toString() !== productId);

        await carrito.save();
        res.status(200).json(carrito);
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el producto del carrito', error: err });
    }
};

module.exports = {
    agregarProducto,
    obtenerCarrito,
    actualizarProducto,
    eliminarProducto
};
