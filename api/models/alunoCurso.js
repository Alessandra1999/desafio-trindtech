const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Aluno = require('./aluno');
const Curso = require('./curso');

const AlunoCurso = sequelize.define('AlunoCurso', {
    id_aluno: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Aluno,
            key: 'id_aluno',
        },
        primaryKey: true // Define id_aluno como parte da chave primária
    },
    id_curso: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Curso,
            key: 'id_curso',
        },
        primaryKey: true // Define id_curso como parte da chave primária
    },
}, {
    freezeTableName: true, // Desativa a pluralização do nome da tabela
    timestamps: false, // Desativa a criação automática das colunas createdAt e updatedAt
    tableName: 'aluno_curso', // Garante que o nome da tabela será 'AlunoCurso'
    indexes: [{ // Chave primária composta
        unique: true,
        fields: ['id_aluno', 'id_curso']
    }]
});

// Definindo associações
Aluno.belongsToMany(Curso, { through: AlunoCurso, foreignKey: 'id_aluno' });
Curso.belongsToMany(Aluno, { through: AlunoCurso, foreignKey: 'id_curso' });

module.exports = AlunoCurso;
