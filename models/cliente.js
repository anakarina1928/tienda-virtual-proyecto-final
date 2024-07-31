const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

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

ClienteSchema.pre('save', async function save(next) {
    if (!this.isModified('clave')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.clave = await bcrypt.hash(this.clave, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

module.exports = mongoose.model("Clientes", ClienteSchema);
