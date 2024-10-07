import { useState } from "react";
import styled from "styled-components";
import { MdAddCircleOutline } from "react-icons/md";

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

function CourseForm() {
    const [courses, setCourses] = useState([{ courseName: "", conclusionDate: "" }]);

    const handleAddCourse = () => {
        setCourses([...courses, { courseName: "", conclusionDate: "" }]);
    };

    const handleInputChange = (index, field, value) => {
        const newCourses = [...courses];
        newCourses[index][field] = value;
        setCourses(newCourses);
    }

    return (
        <CustomForm>
            <Container className="container">
                <Title>Cursos</Title>
                {courses.map((course, index) => (
                    <CourseRow className="row" key={index} index={index}>
                        <div className="form-group col-md-8">
                            <label htmlFor={`courseInput${index}`}>Nome do Curso</label>
                            <CustomInput
                                type="text"
                                className="form-control"
                                id={`courseInput${index}`}
                                value={course.courseName}
                                onChange={(e) => handleInputChange(index, "courseName", e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-4 d-flex align-items-center">
                            <div className="w-100">
                                <label htmlFor={`conclusionInput${index}`}>Data de Conclusão</label>
                                <div className="d-flex">
                                    <CustomInput
                                        type="date"
                                        className="form-control"
                                        id={`conclusionInput${index}`}
                                        value={course.conclusionDate}
                                        onChange={(e) => handleInputChange(index, "conclusionDate", e.target.value)}
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