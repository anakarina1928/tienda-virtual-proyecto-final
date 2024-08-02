const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El producto debe tener un nombre']
    },
    sku: {
        type: String,
        required: [true, 'Debe indicar el SKU o número de parte']
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String
    },
    proveedor: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Productos", ProductoSchema);
