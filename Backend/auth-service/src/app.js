const express = require('express');
const cors = require('cors');
const setupSwagger = require('./swagger');

const authRoutes = require('./routes/auth.routes');

const app = express();

const userRoutes = require('./routes/user.routes');


app.use(cors());
app.use(express.json());

// Configurar Swagger
setupSwagger(app);

app.use('/auth', authRoutes);

module.exports = app;
