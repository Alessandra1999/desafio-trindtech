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

    const handleCourseSelect = (index, selectedOption) => {
        const selectedCourse = availableCourses.find(course => course.id_course === Number(selectedOption));
        if (selectedCourse) {
            setCourseData({
                id_course: selectedCourse.id_course,
                course_name: selectedCourse.course_name
            });
        }
    };

    // Função para fazer a implementação juntamente com o Layout
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentCourseData((prev) => ({ ...prev, [name]: value }));
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