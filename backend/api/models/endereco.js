const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Aluno = require('./aluno');

const Endereco = sequelize.define('Endereco', {
    id_endereco: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    id_aluno: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Aluno,
            key: 'id_aluno',
        },
        onDelete: 'CASCADE',
    },
    cep: {
        type: DataTypes.STRING(9),
        allowNull: false,
    },
    pais: {
        type: DataTypes.STRING(55),
        allowNull: false,
    },
    rua: {
        type: DataTypes.STRING(255),
    },
    bairro: {
        type: DataTypes.STRING(255),
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    complemento: {
        type: DataTypes.STRING(100),
    },
    cidade: {
        type: DataTypes.STRING(255),
    },
    estado: {
        type: DataTypes.STRING(100),
    },
}, {
    freezeTableName: true, // Desativa a pluralização do nome da tabela
    timestamps: false, // Desativa a criação automática das colunas createdAt e updatedAt
    tableName: 'enderecos' // Garante que o nome da tabela será 'enderecos'
});

module.exports = Endereco;
