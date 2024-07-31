const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

module.exports = auth;





// const jwt = require('jsonwebtoken'); // En resumen, JSON Web Tokens (JWT) es una forma segura y
// // compacta de transmitir información entre dos partes y es ampliamente utilizado para la autenticación y la autorización en aplicaciones web.

// module.exports = function (req, res, next) {
//     // Obtiene el token de la cabecera de autorización
//     const token = req.header('Authorization');
    
//     // Si no hay token, responde con un estado 401 (No autorizado)
//     if (!token) return res.status(401).send('Access Denied');

//     try {
//         // Verifica el token utilizando el secreto configurado en las variables de entorno
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
        
//         // Si el token es válido, agrega la información del usuario verificado a la solicitud
//         req.user = verified;
        
//         // Llama a la siguiente función middleware en la pila
//         next();
//     } catch (err) {
//         // Si el token no es válido o ha expirado, responde con un estado 400 (Solicitud incorrecta)
//         res.status(400).send('Invalid Token');
//     }
// }

/*Este middleware se encarga de verificar si el usuario que está realizando
 una solicitud a una ruta protegida tiene un token JWT válido. Si el token es válido,
  se permite el acceso a la ruta; si no, se deniega el acceso.*/ 