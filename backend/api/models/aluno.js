const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Endereco = require('./endereco');

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
    id_endereco: {
        type: DataTypes.BIGINT,
        references: {
            model: Endereco,
            key: 'id_endereco',
        },
        onDelete: 'CASCADE',
    },
}, {
    freezeTableName: true, // Desativa a pluralização do nome da tabela
    timestamps: false, // Desativa a criação automática das colunas createdAt e updatedAt
    tableName: 'alunos' // Garante que o nome da tabela será 'alunos'
});

module.exports = Aluno;
