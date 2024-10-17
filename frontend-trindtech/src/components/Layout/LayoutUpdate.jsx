import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DynamicHeader from "../Header/DynamicHeader";
import StudentForm from "../Forms/StudentForm";
import LocationForm from "../Forms/LocationForm";
import CourseForm from "../Forms/CourseForm";
import {
  updateStudent,
  updateLocation,
  updateCourse,
  updateStudentCourse,
  createStudentCourse,
  fetchStudentData,
  deleteAllStudentData,
} from "../../services/apiService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const CustomButton = styled.button`
  background-color: #ea394e;
  color: #f2f2f2;
  font-weight: 700;
  margin-bottom: 30px;

  &:hover {
    background-color: #c7293c;
    color: #f2f2f2;
  }
`;

function LayoutUpdate() {
  const { id_student } = useParams();
  const [studentData, setStudentData] = useState("");
  const [locationData, setLocationData] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [studentCourseData, setStudentCourseData] = useState([]);
  const [studentId, setStudentId] = useState(null);
  const [emailValid, setEmailValid] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const completeData = await fetchStudentData(id_student);
        console.log("Dados do Aluno: ", completeData);
        setStudentData(completeData.student);
        setLocationData(completeData.location);
        setCourseData(completeData.coursesWithConclusionDate);
        setStudentCourseData(completeData.coursesWithConclusionDate);
      } catch (error) {
        console.error("Erro ao buscar dados do aluno:", error);
        toast.error("Erro ao carregar os dados do aluno.");
      }
    };
    fetchData();
  }, [id_student]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(studentData.student_email)) {
      toast.error("Por favor, insira um e-mail válido antes de enviar."); // Mensagem de erro
      return; // Impede o envio se o e-mail for inválido
    }

    try {
      // Atualiza os dados do aluno
      await updateStudent(studentData.id_student);
      console.log("studentData: " + JSON.stringify(studentData, null, 2));

      // Atualiza a localização do aluno
      await updateLocation(locationData.id_location);
      console.log("locationData: " + JSON.stringify(locationData, null, 2));

      // Atualiza os cursos do aluno
      await Promise.all(
        studentCourseData.map(async (sc) => {
          const id_student = studentData.id_student;
          const id_course = sc.idCourse;
          console.log("Updating student-course association for:", {
            id_student,
            id_course,
            courseName: sc.courseName,
            conclusionDate: sc.conclusionDate,
          });

          if (id_student && id_course) {
            const courseAssociationExists = studentCourseData.some(
              (sc) => sc.idCourse == id_course && sc.id_student == id_student
            );
            const data = {
              conclusion_date: sc.conclusionDate, // Outros dados necessários
            };

            if (courseAssociationExists) {
              // Se a associação já existe, atualiza os dados
              console.log(
                `Atualizando a associação aluno-curso para o curso ${id_course}`
              );
              await updateStudentCourse(id_student, id_course, data);
            } else {
              // Se a associação não existe, cria uma nova
              console.log(`Criando nova associação para o curso ${id_course}`);
              await createStudentCourse({
                id_student,
                id_course,
                conclusion_date: sc.conclusionDate,
              });
            }

            // Atualiza o curso em si, caso necessário
            await updateCourse(id_course);
          } else {
            console.error(
              "Erro: id_student ou id_course indefinidos para a associação",
              course
            );
          }
        })
      );

      if (Array.isArray(courseData) && courseData.length > 0) {
        for (let i = studentCourseData.length; i < courseData.length; i++) {
          const course = courseData[i];
          const conclusionDate = studentCourseData[i]?.conclusion_date || "";

          if (course && conclusionDate) {
            console.log("Course data: ", JSON.stringify(course, null, 2));

            await createStudentCourse({
              conclusion_date: conclusionDate, // Data de conclusão do curso
              id_student: studentData.id_student, // ID do aluno
              id_course: course.id_course, // ID do curso
            });
          } else {
            console.error(
              `Falta curso ou data de conclusão para o aluno do índice ${i}`
            );
          }
        }
      } else {
        toast.error("Nenhum curso associado ao aluno.");
      }

      toast.success("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
      toast.error("Erro ao atualizar os dados.");
    }
  };

  const handleDelete = async () => {
    if (!studentId) {
      toast.error("Nenhum aluno encontrado para deletar.");
      return;
    }

    try {
      await deleteAllStudentData(studentId);
      setStudentData({
        // Limpar os dados do aluno
        student_name: "",
        student_lastname: "",
        student_birthdate: "",
        student_cpf: "",
        student_gender: "",
        student_email: "",
        student_register_date: "",
      });
      setLocationData({
        // Limpar os dados do endereço
        cep: "",
        country: "",
        street: "",
        district: "",
        number: "",
        complement: "",
        city: "",
        state: "",
      });
      setStudentCourseData({
        // Limpar a data de conclusão
        conclusion_date: "",
      });

      setStudentId(null); // Resetar o ID do aluno
      toast.success("Dados deletados com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar dados:", error);
      toast.error("Erro ao deletar os dados!");
    }
  };

  return (
    <div>
      <DynamicHeader
        showLogo={false}
        backIcon={() => navigate("/")}
        studentName={studentData ? studentData.student_name : ""}
        onDelete={handleDelete}
      />
      <StudentForm
        studentData={studentData}
        setStudentData={setStudentData}
        setEmailValid={setEmailValid}
      />
      <LocationForm
        locationData={locationData}
        setLocationData={setLocationData}
      />
      {courseData.length > 0 ? (
        courseData.map((courseWithConclusionDate, index) => (
          <CourseForm
            key={index}
            courseData={courseWithConclusionDate}
            setCourseData={(updatedCourse) => {
              const newCourseData = [...courseData];
              newCourseData[index] = updatedCourse;
              setCourseData(newCourseData);
            }}
          />
        ))
      ) : (
        <CourseForm
          courseData={courseData}
          setCourseData={setCourseData}
          studentCourseData={studentCourseData}
          setStudentCourseData={setStudentCourseData}
        />
      )}
      <div className="d-flex justify-content-center mt-3">
        <CustomButton type="submit" onClick={handleSubmit} className="btn mt-3">
          Salvar
        </CustomButton>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LayoutUpdate;
