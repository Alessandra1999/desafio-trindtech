import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
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
      await updateStudent(studentData);

      // Atualiza a localização do aluno
      await updateLocation(locationData);

      // Atualiza os cursos do aluno
      await Promise.all(
        studentCourseData.map(async (sc) => {
          await updateStudentCourse(sc); // Atualiza cada associação existente
        })
      );

      if (Array.isArray(courseData) && courseData.length > 0) {
        for (let i = 0; i < courseData.length; i++) {
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
            console.error(`Missing course or conclusion date for index ${i}`);
          }
        }
      } else {
        toast.error("Nenhum curso associado ao aluno.");
      }

      toast.success("Dados atualizados com sucesso!");
      navigate("/"); // Redireciona após a atualização
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
