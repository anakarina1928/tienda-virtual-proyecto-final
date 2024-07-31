const express = require('express');
require('./config/database.js'); // Importamos el archivo para establecer la conexión a la base de datos
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/cliente.js');

dotenv.config();  // Cargar las variables de entorno

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});