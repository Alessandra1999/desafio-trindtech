const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Student = require('./student');
const Course = require('./course');

const StudentCourse = sequelize.define('StudentCourse', {
    conclusion_date: {
        type: DataTypes.DATE,
    },
    id_student: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Student,
            key: 'id_student',
        },
        primaryKey: true // Define id_student como parte da chave primária
    },
    id_course: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Course,
            key: 'id_course',
        },
        primaryKey: true // Define id_course como parte da chave primária
    },
}, {
    freezeTableName: true, // Desativa a pluralização do nome da tabela
    timestamps: false, // Desativa a criação automática das colunas createdAt e updatedAt
    tableName: 'student_course', // Garante que o nome da tabela será 'student_course'
    indexes: [{ // Chave primária composta
        unique: true,
        fields: ['id_student', 'id_course']
    }]
});

// Definindo associações
Student.belongsToMany(Course, { through: StudentCourse, foreignKey: 'id_student' });
Course.belongsToMany(Student, { through: StudentCourse, foreignKey: 'id_course' });

module.exports = StudentCourse;
