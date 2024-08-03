const jwt = require('jsonwebtoken');
const Cliente = require('../models/cliente.js');

const register = async (req, res) => {
    const { email, clave, nombre, direccion, telefono } = req.body;

    try {
        const existingClient = await Cliente.findOne({ email });
        if (existingClient) {
            return res.status(400).json({ message: 'El email ya está registrado.' });
        }

        const cliente = new Cliente({ email, clave, nombre, direccion, telefono });
        await cliente.save();
        res.status(201).json({ message: 'Cliente registrado exitosamente.' });
    } catch (err) {
        res.status(500).json({ message: 'Error al registrar el cliente.', error: err.message });
    }
};

const login = async (req, res) => {
    const { email, clave } = req.body;

    try {
        const cliente = await Cliente.findOne({ email });
        if (!cliente) {
            return res.status(400).json({ message: 'Email o contraseña incorrectos.' });
        }

        // Compara directamente la clave en texto plano
        if (clave !== cliente.clave) {
            return res.status(400).json({ message: 'Email o contraseña incorrectos.' });
        }

        const token = jwt.sign({ id: cliente._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error al iniciar sesión.', error: err.message });
    }
};

module.exports = {
    register,
    login
};




// const jwt = require('jsonwebtoken');
// const Cliente = require('../models/cliente.js');
// //const bcrypt = require('bcryptjs');

// const register = async (req, res) => {
//     const { email, clave, nombre, direccion, telefono } = req.body;

//     try {
//         const existingClient = await Cliente.findOne({ email });
//         if (existingClient) {
//             return res.status(400).json({ message: 'El email ya está registrado.' });
//         }

//         const cliente = new Cliente({ email, clave, nombre, direccion, telefono });
//         await cliente.save();
//         res.status(201).json({ message: 'Cliente registrado exitosamente.' });
//     } catch (err) {
//         res.status(500).json({ message: 'Error al registrar el cliente.', error: err.message });
//     }
// };

// const login = async (req, res) => {
//     const { email } = req.body;

//     try {
//         const cliente = await Cliente.findOne({ email });
//         if (!cliente) {
//             return res.status(400).json({ message: 'Email o contraseña incorrectos.' });
//         }

//         // const isMatch = await bcrypt.compare(clave, cliente.clave);
//         // if (!isMatch) {
//         //     return res.status(400).json({ message: 'Email o contraseña incorrectos.' });
//         // }

//         const token = jwt.sign({ id: cliente._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token });
//     } catch (err) {
//         res.status(500).json({ message: 'Error al iniciar sesión.', error: err.message });
//     }
// };

// module.exports = {
//     register,
//     login
// };

