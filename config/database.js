const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Cargar las variables de entorno

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log(err));

module.exports = mongoose;

