const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Debe indicar un email válido'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Debe indicar un email válido']
    },
    clave: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
    },
    direccion: {
        type: String,
    },
    telefono: {
        type: String,
    },
});

module.exports = mongoose.model("Clientes", ClienteSchema);

