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
        type: DataTypes.ENUM('Masculino', 'Feminino', 'Não Binário', 'Outros', 'Prefiro Não Responder'),
    },
    email_aluno: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    data_cadastro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
}, {
    freezeTableName: true, // Desativa a pluralização do nome da tabela
    timestamps: false, // Desativa a criação automática das colunas createdAt e updatedAt
    tableName: 'alunos' // Garante que o nome da tabela será 'alunos'
});

module.exports = Aluno;
