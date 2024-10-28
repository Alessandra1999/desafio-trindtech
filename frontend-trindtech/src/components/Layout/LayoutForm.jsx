import { useState } from "react";
import DynamicHeader from "../Header/DynamicHeader";
import StudentForm from "../Forms/StudentForm";
import LocationForm from "../Forms/LocationForm";
import CourseForm from "../Forms/CourseForm";
import {
  createStudent,
  deleteStudent
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

function LayoutForm() {
  const [studentData, setStudentData] = useState({
    student_name: "",
    student_lastname: "",
    student_birthdate: "",
    student_cpf: "",
    student_gender: "",
    student_email: "",
    student_register_date: "",
  });

  //posso botar tudo no studentData, passando como objetos, não deixar o mesmo nome das colunas da tabela

  const [locationData, setLocationData] = useState({
    cep: "",
    country: "",
    street: "",
    district: "",
    number: "",
    complement: "",
    city: "",
    state: "",
  });

  const [courseData, setCourseData] = useState([
    {
      id_course: "",
      course_name: "",
    },
  ]);

  const [studentCourseData, setStudentCourseData] = useState([
    {
      conclusion_date: "",
    },
  ]);

  const [studentId, setStudentId] = useState(null);
  const [emailValid, setEmailValid] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(studentData.student_email)) {
      toast.error("Por favor, insira um e-mail válido antes de enviar."); // Mensagem de erro
      return; // Impede o envio se o e-mail for inválido
    }

    // Registrar a data atual no formato ISO
    const currentDate = new Date().toISOString();

    // Atualizar o estado com a data de registro do aluno
    const updatedStudentData = {
      ...studentData,
      student_register_date: currentDate,
    };

    try {
      // Criar aluno
      console.log(
        "Dados do aluno que estão sendo enviados: ",
        updatedStudentData
      );

      const newStudent = {
        ...updatedStudentData,
        courses: courseData.map((course, index) => ({
          ...course,
          conclusion_date: studentCourseData[index].conclusion_date,
        })),
        location: locationData
      };

      const student = await createStudent(newStudent);
      setStudentId(student.id_student);

      toast.success("Dados criados com sucesso!");
    } catch (error) {
      console.error("Erro ao criar dados: ", error);
      toast.error("Erro ao criar os dados");
    }
  };

  const handleDelete = async () => {
    if (!studentId) {
      toast.error("Nenhum aluno encontrado para deletar.");
      return;
    }

    try {
      await deleteStudent(studentId);
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
      setStudentCourseData({ //courses: id_course, course_name, conclusion_date
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
        studentName=""
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
      <CourseForm
        courseData={courseData}
        setCourseData={setCourseData}
        studentCourseData={studentCourseData}
        setStudentCourseData={setStudentCourseData}
      />
      <div className="d-flex justify-content-center mt-3">
        <CustomButton type="submit" onClick={handleSubmit} className="btn mt-3">
          Salvar
        </CustomButton>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LayoutForm;
