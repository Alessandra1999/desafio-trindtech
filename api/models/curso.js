const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Curso = sequelize.define('Curso', {
    id_curso: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    nome_curso: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data_conclusao_curso: {
        type: DataTypes.DATE,
    },
}, {
    freezeTableName: true, // Desativa a pluralização do nome da tabela
    timestamps: false, // Desativa a criação automática das colunas createdAt e updatedAt
    tableName: 'cursos' // Garante que o nome da tabela será 'cursos'
});

module.exports = Curso;
