const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Aluno = sequelize.define('Aluno', {
    id_aluno: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    nome_aluno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sobrenome_aluno: {
        type: DataTypes.STRING,
    },
    data_nascimento_aluno: {
        type: DataTypes.DATE,
    },
    cpf_aluno: {
        type: DataTypes.STRING(14),
        unique: true,
    },
    genero_aluno: {
        type: DataTypes.ENUM('Masculino', 'Feminino', 'Não Binário', 'Outros'),
    },
    email_aluno: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
});

module.exports = Aluno;
