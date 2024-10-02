const express = require('express');
const sequelize = require('./config/config');
const alunoRoutes = require('./routes/alunoRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const alunoCursoRoutes = require('./routes/alunoCursoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/alunos', alunoRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/aluno-curso', alunoCursoRoutes);

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
