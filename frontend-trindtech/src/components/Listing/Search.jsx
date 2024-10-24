import { useState } from "react";
import styled from "styled-components";
import { RiSearchLine } from "react-icons/ri";
import { MdPersonAdd } from "react-icons/md";
import {
  getStudents,
  getLocations,
  getCourseById,
  getStudentCourses,
} from "../../services/apiService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  margin-top: 59px;
  width: 1044px;
  height: auto;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
`;

const CustomInput = styled.input`
  background-color: #fff;

  &:focus {
    background-color: #fff;
    outline: none;
    border-color: black;
    box-shadow: none;
  }
`;

const CustomSpan = styled.span`
  background-color: #fff;

  &:hover {
    cursor: pointer;
    background-color: #f2f2f2;
  }
`;

const CustomButton = styled.button`
  background-color: #fff;
  border-color: #e6e6e6;
  font-weight: 600;

  &:hover {
    border-color: #e6e6e6;
    background-color: #f2f2f2;
  }
`;

function Search({ setSearchResults }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const allStudents = await getStudents();
      const locations = await getLocations(); // Buscar as localizações
      const studentCourses = await getStudentCourses(); // Buscar os cursos dos alunos

      const filteredStudents = await Promise.all(
        allStudents
          .filter((student) =>
            student.student_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
          .map(async (student) => {
            // Buscar o estado e os cursos para cada aluno
            const location = locations.find(
              (loc) => loc.id_student === student.id_student
            );
            const courses = studentCourses
              .filter((sc) => sc.id_student === student.id_student)
              .map(async (sc) => {
                const course = await getCourseById(sc.id_course);
                return course ? course.course_name : "Curso não encontrado";
              });

            const courseNames = await Promise.all(courses);

            return {
              ...student,
              location: location ? location.state : "Estado não encontrado",
              courses:
                courseNames.length > 0
                  ? courseNames.join(", ")
                  : "Nenhum curso associado",
            };
          })
      );

      setSearchResults(filteredStudents);

      if (filteredStudents.length === 0) {
        toast.error("Nenhum aluno encontrado.");
        console.error("Nenhum aluno encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
      toast.error("Erro ao buscar alunos.");
    }
  };

  const handleAddStudent = () => {
    navigate("/form");
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Container>
        <div className="row align-items-center">
          <div className="col-md-10 d-flex">
            <div className="input-group">
              <CustomInput
                type="text"
                className="form-control"
                placeholder="Buscar por Aluno"
                aria-label="Pesquisar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <CustomSpan className="input-group-text" onClick={handleSearch}>
                <RiSearchLine style={{ fontSize: "20px", cursor: "pointer" }} />
              </CustomSpan>
            </div>
          </div>
          <div className="col-md-2 text-start text-md-end">
            <CustomButton
              type="button"
              className="btn"
              onClick={handleAddStudent}
            >
              <MdPersonAdd
                style={{
                  color: "#EA394E",
                  marginRight: "10px",
                  fontSize: "20px",
                }}
              />
              Adicionar
            </CustomButton>
          </div>
        </div>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Search;
