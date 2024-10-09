const express = require('express');
const sequelize = require('./config/config');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studentCourseRoutes = require('./routes/studentCourseRoutes');
const locationRoutes = require('./routes/locationRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do CORS
app.use(cors({
    origin: 'http://localhost:5173', // Permitir apenas esse domínio
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));

app.use(express.json()); // Para permitir o recebimento de JSON no corpo das requisições

// Definindo as rotas
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/student-course', studentCourseRoutes);
app.use('/api/locations', locationRoutes);

// Sincronização do banco de dados
sequelize.sync()
    .then(() => {
        console.log('Banco de dados sincronizado com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar o banco de dados:', error);
    });

// Inicializar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
