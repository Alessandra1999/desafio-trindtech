const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Student = require('./student');

const Location = sequelize.define('Location', {
    id_location: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    id_student: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Student,
            key: 'id_student',
        },
        onDelete: 'CASCADE',
    },
    cep: {
        type: DataTypes.STRING(9),
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING(55),
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING(255),
    },
    district: {
        type: DataTypes.STRING(255),
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    complement: {
        type: DataTypes.STRING(100),
    },
    city: {
        type: DataTypes.STRING(255),
    },
    state: {
        type: DataTypes.STRING(100),
    },
}, {
    freezeTableName: true, // Desativa a pluralização do nome da tabela
    timestamps: false, // Desativa a criação automática das colunas createdAt e updatedAt
    tableName: 'locations' // Garante que o nome da tabela será 'locations'
});

module.exports = Location;