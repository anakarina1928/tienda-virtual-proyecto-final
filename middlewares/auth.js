const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');

    // Remueve el prefijo 'Bearer' del token
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7, authHeader.length) : authHeader;
    console.log('Received Token:', token);  // Imprime el token recibido
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Verified Token:', verified);  // Imprime los datos verificados
        req.user = verified;
        next();
    } catch (err) {
        console.log('Token Verification Error:', err.message);  // Imprime el error de verificación
        res.status(400).send('Invalid Token');
    }
};

module.exports = auth;

