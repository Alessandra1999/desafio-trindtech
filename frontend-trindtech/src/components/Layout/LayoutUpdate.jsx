import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DynamicHeader from "../Header/DynamicHeader";
import StudentForm from "../Forms/StudentForm";
import LocationForm from "../Forms/LocationForm";
import CourseForm from "../Forms/CourseForm";
import {
  getStudentCourseById,
  updateStudent,
  updateLocation,
  updateStudentCourse,
  createStudentCourse,
  fetchStudentData,
  checkStudentCourseAssociation,
  deleteAllStudentData,
} from "../../services/apiService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  const [updatedStudentCourseData, setUpdatedStudentCourseData] = useState([]);
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
  const [emailValid, setEmailValid] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const completeData = await fetchStudentData(id_student);
        console.log("Dados do Aluno: ", completeData);
        setStudentData(completeData.student);
        setLocationData(completeData.location);
        setUpdatedStudentCourseData(completeData.coursesWithConclusionDate);
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
      await updateStudent(studentData.id_student, studentData);
      console.log(
        "Atualizando studentData: " + JSON.stringify(studentData, null, 2)
      );

      // Atualiza a localização do aluno
      await updateLocation(locationData.id_location, locationData);
      console.log(
        "Atualizando locationData: " + JSON.stringify(locationData, null, 2)
      );

      // Atualiza ou cria os cursos associados ao aluno
      await Promise.all(
        updatedStudentCourseData.map(async (sc) => {
          const id_student = studentData.id_student;
          const id_course = sc.idCourse;
          console.log("Processando curso:", {
            id_student,
            id_course,
            courseName: sc.courseName,
            conclusionDate: sc.conclusionDate,
          });

          if (id_student && id_course) {
            const associationExists = await checkStudentCourseAssociation(
              id_student,
              id_course
            );
            console.log("Associação existente: ", associationExists);

            if (associationExists == true) {
              // Obtém os dados atuais para comparação
              const currentCourseData = await getStudentCourseById(
                id_student,
                id_course
              );

              console.log("currentCourseData: ", currentCourseData);

              const currentDate = new Date(currentCourseData.conclusion_date)
                .toISOString()
                .split("T")[0];
              const newDate = new Date(sc.conclusionDate)
                .toISOString()
                .split("T")[0];

              console.log("Data atual armazenada:", currentDate);
              console.log("Nova data fornecida:", newDate);

              // Compara os dados atuais com os novos dados
              if (currentDate !== newDate) {
                console.log(
                  `Atualizando a associação aluno-curso para o curso ${id_course}`
                );
                await updateStudentCourse(
                  id_student,
                  id_course,
                  sc.conclusionDate
                );
              } else {
                console.log(
                  `Nenhuma alteração para o curso ${id_course}, pulando atualização.`
                );
              }
            } else if (associationExists == false) {
              // Se a associação não existe, cria uma nova
              console.log(`Criando nova associação para o curso ${id_course}`);
              await createStudentCourse({
                id_student: studentData.id_student,
                id_course: sc.id_course,
                conclusion_date: sc.conclusionDate,
              });
            }
          } else {
            console.error(
              "Erro: id_student ou id_course indefinidos para a associação",
              sc
            );
          }
        })
      );

      toast.success("Dados atualizados com sucesso!");
      console.log(studentData, locationData, updatedStudentCourseData);
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
      toast.error("Erro ao atualizar os dados.");
    }
  };

  const handleDelete = async () => {
    if (!id_student) {
      toast.error("Nenhum aluno encontrado para deletar.");
      return;
    }

    try {
      await deleteAllStudentData(id_student);
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
      setUpdatedStudentCourseData({
        // Limpar a data de conclusão
        conclusion_date: "",
      });

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
        studentName={
          studentData
            ? studentData.student_name + " " + studentData.student_lastname
            : ""
        }
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
      {updatedStudentCourseData.length > 0
        ? updatedStudentCourseData.map(
            ({ idCourse, courseName, conclusionDate }) => (
              <CourseForm
                key={idCourse}
                idCourse={idCourse}
                conclusionDate={conclusionDate}
                courseName={courseName}
                setStudentCourseData={setStudentCourseData}
              />
            )
          )
        : updatedStudentCourseData.length === 0 && (
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
