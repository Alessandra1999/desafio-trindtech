const Student = require("../models/student");
const Course = require("../models/course");
const Location = require("../models/location");

// Criar um novo aluno
exports.createStudent = async (req, res) => {
  try {
    console.log("req.body: ", req.body);
    const student = await Student.create(req.body);
    await Location.create({
      ...req.body.location,
      student_fk: student.id_student,
    });
    req.body.courses.forEach(({ id_course, conclusion_date }) => {
      Course.findOne({ where: { id_course } }).then((course) => {
        student.addCourse(course, { through: { conclusion_date } });
      });
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todos os alunos
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [{ model: Location }, { model: Course }],
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar aluno por um id específico
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [{ model: Location }, { model: Course }],
    });
    if (!student) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar aluno por um id específico
exports.updateStudent = async (req, res) => {
  try {
    // Buscar o aluno pelo ID
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    // Atualizar os dados do aluno
    await student.update(req.body);

    // Atualizar a localização associada
    if (req.body.location) {
      let location = await Location.findOne({
        where: { student_fk: student.id_student },
      });

      if (location) {
        // Se já existe uma localização associada, atualizar
        await location.update(req.body.location);
      } else {
        // Caso não exista, criar uma nova localização associada ao aluno
        location = await Location.create({
          ...req.body.location,
          student_fk: student.id_student,
        });
      }
    }

    // Atualizar cursos associados ao aluno
    if (req.body.courses && req.body.courses.length > 0) {
      // Remover todos os cursos antigos do aluno
      await student.setCourses([]);

      // Associar os novos cursos ao aluno com as datas de conclusão
      for (const { id_course, conclusion_date } of req.body.courses) {
        const course = await Course.findByPk(id_course);
        if (course) {
          await student.addCourse(course, { through: { conclusion_date } });
        }
      }
    }

    // Buscar o aluno atualizado, incluindo todas as associações
    const updatedStudent = await Student.findByPk(req.params.id, {
      include: [{ model: Location }, { model: Course }],
    });

    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar aluno por um id específico
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }
    await student.destroy({
      truncate: true,
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
