const express = require('express');
const sequelize = require('./config/config');
const alunoRoutes = require('./routes/alunoRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const alunoCursoRoutes = require('./routes/alunoCursoRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');
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
app.use('/api/alunos', alunoRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/aluno-curso', alunoCursoRoutes);
app.use('/api/enderecos', enderecoRoutes);

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
