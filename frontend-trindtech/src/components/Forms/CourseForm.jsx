import { useState, useEffect } from "react";
import styled from "styled-components";
import { MdAddCircleOutline } from "react-icons/md";
import { getCourses } from "../../services/apiService";

const CustomForm = styled.form`
  margin-top: 62px;
`;

const Container = styled.div`
  max-width: 1098px;
  height: auto;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  margin-bottom: 50px;
`;

const Title = styled.h4`
  margin-bottom: 25px;
  font-size: 22px;
  font-weight: 500;
`;

const CourseRow = styled.div`
  display: flex;
  margin-top: ${(props) =>
    props.index > 0
      ? "26px"
      : "0px"}; /* Condicional para adicionar margin-top somente nas novas linhas */
`;

const CustomInput = styled.input`
  background-color: #FFF;

  &:focus {
    background-color: #FFF;
    outline: none;
    border-color: black;
    box-shadow: none;
  }
`;

const CustomSelect = styled.select`
  background-color: #FFF;

  &:focus {
    background-color: #F2F2F2;
    outline: none;
    border-color: black;
    box-shadow: none;
  }
`;

const CustomButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 24px;
  margin-left: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const CustomLabel = styled.label`
  @media (max-width: 767px) {
    margin-top: 26px;
  }
`;

function CourseForm({
  courseData,
  setCourseData,
  studentCourseData,
  setStudentCourseData,
  idCourse,
  conclusionDate
}) {
  const [courses, setCourses] = useState([
    { courseName: "", conclusionDate: "" },
  ]);
  const [availableCourses, setAvailableCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await getCourses();
        setAvailableCourses(courses);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    };
    fetchCourses();
  }, []);

  // Função para adicionar novos campos de input
  const handleAddCourse = () => {
    setCourses([...courses, { courseName: "", conclusionDate: "" }]);
  };

  const handleInputChange = (index, id_course, value) => {
    const newCourses = [...courses];
    newCourses[index][id_course] = value;
    setCourses(newCourses);
  };

  const handleCourseSelect = (index, selectedOption) => {
    console.log("Selected course ID: ", selectedOption);
    const selectedCourse = availableCourses.find((course) => {
      console.log(
        "Comparing: ",
        course.id_course,
        " (type: ",
        typeof course.id_course,
        ") with ",
        Number(selectedOption),
        " (type: ",
        typeof Number(selectedOption),
        ")"
      );
      return course.id_course == Number(selectedOption);
    });

    if (selectedCourse) {
      console.log("Selected course data: ", selectedCourse);
      setCourseData((prevCourses) => {
        const updatedCourses = [...prevCourses];
        updatedCourses[index] = {
          id_course: selectedCourse.id_course,
          course_name: selectedCourse.course_name,
        };

        console.log("Updated course data: ", updatedCourses); // Verifica o array atualizado
        return updatedCourses;
      });
    } else {
      console.error("No course found for selected ID");
    }
  };

  // Função para atualizar a data de conclusão para um curso específico
  const handleDateChange = (index, e) => {
    const { name, value } = e.target;
    // Verifica se o studentCourseData é um array
    setStudentCourseData((prevData) => {
      const newStudentCourseData = [...prevData]; // Faz uma cópia do array atual
      newStudentCourseData[index] = {
        ...newStudentCourseData[index],
        [name]: value,
      }; // Atualiza a data de conclusão do índice específico
      return newStudentCourseData; // Retorna o novo array
    });
  };

  return (
    <CustomForm>
      <Container className="container">
        <Title>Cursos</Title>
        {courses.map((courseData, index) => (
          <CourseRow className="row" key={index} index={index}>
            <div className="form-group col-md-8">
              <label htmlFor={`courseSelect${index}`}>Nome do Curso</label>
              <CustomSelect
                className="form-control"
                id={`courseSelect${index}`}
                name="course_name"
                value={courseData.id_course || idCourse}
                onChange={(e) => {
                  console.log(
                    "onChange disparado, valor selecionado: ",
                    e.target.value
                  ); // Verificação
                  handleInputChange(index, "id_course", e.target.value); 
                  handleCourseSelect(index, e.target.value); // Passa o ID para o handleCourseSelect
                }}
              >
                <option value="">Selecione um curso</option>
                {availableCourses.length > 0 ? (
                  availableCourses.map((course) => (
                    <option key={course.id_course} value={course.id_course}>
                      {course.course_name}
                    </option>
                  ))
                ) : (
                  <option value="">Nenhum curso disponível</option>
                )}
              </CustomSelect>
            </div>
            <div className="form-group col-md-4 d-flex align-items-center">
              <div className="w-100">
                <CustomLabel htmlFor={`conclusionInput${index}`}>
                  Data de Conclusão
                </CustomLabel>
                <div className="d-flex">
                  <CustomInput
                    type="date"
                    className="form-control"
                    id={`conclusionInput${index}`}
                    name="conclusion_date"
                    value={courses[index].conclusionDate || conclusionDate}
                    onChange={(e) => {
                      handleInputChange(
                        index,
                        "conclusionDate",
                        e.target.value
                      );
                      handleDateChange(index, e);
                    }}
                  />
                  <CustomButton type="button" onClick={handleAddCourse}>
                    <MdAddCircleOutline />
                  </CustomButton>
                </div>
              </div>
            </div>
          </CourseRow>
        ))}
      </Container>
    </CustomForm>
  );
}

export default CourseForm;