const StudentCourse = require('../models/studentCourse');

// Criar nova associação
exports.createStudentCourse = async (req, res) => {
    try {
        // Validação simples dos dados recebidos
        const { id_student, id_course } = req.body;
        if (!id_student || !id_course) {
            return res.status(400).json({ error: 'Os campos id_aluno e id_curso são obrigatórios.' });
        }

        // Criar a associação
        const studentCourse = await StudentCourse.create(req.body);
        res.status(201).json(studentCourse);
    } catch (error) {
        console.error('Erro ao criar associação:', error.message);
        res.status(400).json({ error: error.message });
    }
};

// Listar as associações
exports.getStudentCourses = async (req, res) => {
    try {
        const studentCourses = await StudentCourse.findAll();
        res.json(studentCourses);
    } catch (error) {
        console.error('Erro ao obter associações:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Listar as associações por id específico
exports.getStudentCourseById = async (req, res) => {
    const { id_student, id_course } = req.params; 
    try {
        const studentCourse = await StudentCourse.findOne({ where: { id_student, id_course } });
        if (!studentCourse) {
            return res.status(404).json({ error: 'Associação não encontrada.' });
        }
        res.json(studentCourse);
    } catch (error) {
        console.error('Erro ao obter associação:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Atualizar associações por id específico
exports.updateStudentCourse = async (req, res) => {
    const { id_student, id_course } = req.params; 
    try {
        const studentCourse = await StudentCourse.findOne({ where: { id_student, id_course } });
        if (!studentCourse) {
            return res.status(404).json({ error: 'Associação não encontrada.' });
        }

        // Validação dos dados para atualização
        const { id_student: newIdStudent, id_course: newIdCourse } = req.body; 
        if (newIdStudent === undefined || newIdCourse === undefined) {
            return res.status(400).json({ error: 'Os campos id_aluno e id_curso são obrigatórios para atualização.' });
        }

        await studentCourse.update(req.body);
        res.json(studentCourse);
    } catch (error) {
        console.error('Erro ao atualizar associação:', error.message);
        res.status(400).json({ error: error.message });
    }
};

// Deletar associações por id específico
exports.deleteStudentCourse = async (req, res) => {
    const { id_student, id_course } = req.params; 
    try {
        const studentCourse = await StudentCourse.findOne({ where: { id_student, id_course } });
        if (!studentCourse) {
            return res.status(404).json({ error: 'Associação não encontrada.' });
        }
        await studentCourse.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar associação:', error.message);
        res.status(500).json({ error: error.message });
    }
};
