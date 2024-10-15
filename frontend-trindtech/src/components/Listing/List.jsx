import { useState, useEffect } from "react";
import styled from "styled-components";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  getStudents,
  getLocations,
  getCourseById,
  getStudentCourses,
} from "../../services/apiService";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 52px;
`;

const CustomTable = styled.table`
  width: 1098px;
  height: auto;

  @media (max-width: 1200px) {
    width: 600px;
  }

  @media (max-width: 767px) {
    width: 500px;
  }

  @media (max-width: 505px) {
    width: 300px;
  }
`;

const ContainerNav = styled.div`
  margin-top: 22px;
`;

const CustomNav = styled.nav`
  width: 720px;
  height: auto;
  text-align: center;
  padding: 16px;
`;

const CustomButton = styled.button`
  border: none;
  background-color: none;
  color: #5f6368;

  &:hover {
    color: inherit;
    text-decoration: underline;
  }
`;

function List() {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  // Estado para controle da página atual e número de alunos por página
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Buscar todos os alunos
        const students = await getStudents();

        // 2. Buscar todas as localizações
        const locations = await getLocations();

        // 3. Para cada aluno, buscar sua localização e curso associado
        const studentsWithDetails = await Promise.all(
          students.map(async (student) => {
            // Busca a localização do aluno
            const location = locations.find(
              (loc) => loc.id_student == student.id_student
            );

            // Busca a associação do aluno com os cursos
            const studentCourses = await getStudentCourses();

            // Filtra os cursos associados ao aluno
            const courses = studentCourses
              .filter((sc) => sc.id_student == student.id_student) // Usa o id do aluno para filtrar
              .map(async (sc) => {
                const course = await getCourseById(sc.id_course);
                return course ? course.course_name : "Curso não encontrado"; // Retorna o nome do curso ou uma mensagem padrão
              });

            const courseNames = await Promise.all(courses);

            return {
              ...student,
              location: location ? location.state : "Estado não encontrado", // Estado da localização
              courses:
                courseNames.length > 0
                  ? courseNames.join(", ")
                  : "Nenhum curso associado", // Lista os cursos associados
            };
          })
        );

        setStudentData(studentsWithDetails);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os dados dos alunos:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para alternar a ordem de classificação
  const handleSortByDate = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Ordenar os alunos com base na data de cadastro e ordem de classificação
  const sortedStudents = [...studentData].sort((a, b) => {
    const dateA = new Date(a.student_register_date);
    const dateB = new Date(b.student_register_date);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Paginação
  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = sortedStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <Container className="container">
        <div className="table-responsive">
          <CustomTable className="table">
            <thead>
              <tr>
                <th scope="col" onClick={handleSortByDate}>
                  Data de Cadastro <HiOutlineSwitchVertical />
                </th>
                <th scope="col">Nome</th>
                <th scope="col">Estado</th>
                <th scope="col">Cursos</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => {
                const registrationDate = new Date(
                  student.student_register_date + "T00:00:00-03:00"
                );
                const formattedDate = `${String(
                  registrationDate.getDate()
                ).padStart(2, "0")}/${String(
                  registrationDate.getMonth() + 1
                ).padStart(2, "0")}/${registrationDate.getFullYear()}`;

                return (
                  <tr key={student.id_student}>
                    <td>{formattedDate}</td>
                    <td>
                      {student.student_name} {student.student_lastname}
                    </td>
                    <td>{student.location}</td>
                    <td>{student.courses}</td>
                  </tr>
                );
              })}
            </tbody>
          </CustomTable>
        </div>
      </Container>
      <ContainerNav className="d-flex justify-content-center align">
        <CustomNav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage == 1 ? "disabled" : ""}`}>
              <CustomButton
                className="page-link btn btn-custom"
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage == 1}
              >
                <FaArrowLeft /> Anterior
              </CustomButton>
            </li>
            {[...Array(totalPages).keys()].map((number) => (
              <li
                key={number + 1}
                className={`page-item ${
                  currentPage === number + 1 ? "active" : ""
                }`}
              >
                <CustomButton
                  onClick={() => setCurrentPage(number + 1)}
                  className="btn btn-custom"
                >
                  {number + 1}
                </CustomButton>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <CustomButton
                className="page-link btn btn-custom"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
              >
                Próximo <FaArrowRight />
              </CustomButton>
            </li>
          </ul>
        </CustomNav>
      </ContainerNav>
    </div>
  );
}

export default List;
