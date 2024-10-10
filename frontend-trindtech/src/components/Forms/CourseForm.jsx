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
  margin-top: ${(props) => (props.index > 0 ? "26px" : "0px")}; /* Condicional para adicionar margin-top somente nas novas linhas */
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
    background-color: #F2F2F2;

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

function CourseForm({ studentCourseData, courseData, setCourseData, setStudentCourseData }) {
    const [courses, setCourses] = useState([{ courseName: "", conclusionDate: "" }]);
    const [availableCourses, setAvailableCourses] = useState([]);


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const courses = await getCourses();
                setAvailableCourses(courses);
            } catch (error) {
                console.error('Erro ao buscar cursos:', error);
            }
        };

        fetchCourses();
    }, []);

    // Função para adicionar novos campos de input 
    const handleAddCourse = () => {
        setCourses([...courses, { courseName: "", conclusionDate: "" }]);
    };

    const handleInputChange = (index, field, value) => {
        const newCourses = [...courses];
        newCourses[index][field] = value;
        setCourses(newCourses);
    };

    const handleCourseSelect = (index, selectedCourseName) => {
        const selectedCourse = availableCourses.find(course => course.course_name === selectedCourseName);
        if (selectedCourse) {
            // Atualizar o courseData com o id_course e course_name
            setCourseData({
                course_name: selectedCourse.course_name, // Atualiza o nome do curso
                id_course: selectedCourse.id_course       // Atualiza o id do curso
            });

            // Atualizar o studentCourseData com o id_course do curso selecionado
            setStudentCourseData(prevStudentCourseData => {
                const updatedData = [...prevStudentCourseData];
                updatedData[index] = {
                    id_course: selectedCourse.id_course,
                    conclusion_date: updatedData[index]?.conclusion_date || ""
                };
                return updatedData;
            });
        }
    };

    // Função para fazer a implementação juntamente com o Layout
    const handleChange = (e) => {
        const { name, value } = e.target;
        const index = Number(e.target.id.replace(/\D/g, '')); // Extrair o índice do ID
        setStudentCourseData((prev) => {
            const updatedData = [...prev];
            updatedData[index].conclusion_date = value; // Atualizar a data de conclusão
            return updatedData;
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
                                value={courseData.courseName}
                                onChange={(e) => {
                                    handleInputChange(index, "courseName", e.target.value);
                                    handleCourseSelect(index, e.target.value);
                                }}
                            >
                                <option value="">Selecione um curso</option>
                                {availableCourses.length > 0 ? (
                                    availableCourses.map((course) => (
                                        <option key={course.id_course} value={course.course_name}>
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
                                <label htmlFor={`conclusionInput${index}`}>Data de Conclusão</label>
                                <div className="d-flex">
                                    <CustomInput
                                        type="date"
                                        className="form-control"
                                        id={`conclusionInput${index}`}
                                        name="conclusion_date"
                                        value={studentCourseData.conclusionDate}
                                        onChange={(e) => {
                                            handleInputChange(index, "conclusionDate", e.target.value);
                                            handleChange(e);
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