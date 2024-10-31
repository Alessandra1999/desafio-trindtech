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
      include: [
        { model: Location },
        { model: Course, through: { attributes: ["conclusion_date"] } },
      ],
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
    const student = await Student.findByPk(req.params.id, {
      include: [{ model: Location }, { model: Course }],
    });
    if (!student) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    // Atualizar os dados do aluno
    await student.update(req.body);

    // Atualizar a localização associada
    if (req.body.Location) {
      let location = await Location.findOne({
        where: { student_fk: student.id_student },
      });

      if (location) {
        // Atualizar localização existente
        await location.update(req.body.Location);
      } else {
        // Criar nova localização associada
        await Location.create({
          ...req.body.Location,
          student_fk: student.id_student,
        });
      }
    }

    // 4. Atualizar cursos associados ao aluno (Many-to-Many)
    if (req.body.Courses && req.body.Courses.length > 0) {
      // Remover cursos antigos do aluno
      await student.setCourses([]);

      // Associar novos cursos ao aluno
      for (const courseData of req.body.Courses) {
        const { id_course, StudentCourse } = courseData;
        const course = await Course.findByPk(id_course);
        if (course) {
          await student.addCourse(course, {
            through: { conclusion_date: StudentCourse.conclusion_date },
          });
        }
      }
    }
    // Buscar o aluno atualizado, incluindo todas as associações
    const updatedStudent = await Student.findByPk(req.params.id, {
      include: [{ model: Location }, { model: Course }],
    });

    res.json(updatedStudent);
  } catch (error) {
    console.error("Erro ao atualizar o aluno:", error);
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
